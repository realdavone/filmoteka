import { defineStore } from 'pinia'
import { reactive } from 'vue'
import socket from '../socket/main'

type Notifications = {
  recommended: Array<any>
}

export const useNotificationStore = defineStore('notificationsStore', () => {
  const notifications = reactive<Notifications>({
    recommended: []
  })

  function addNotification(key: keyof Notifications, value: any) {
    notifications[key] = [value, ...notifications[key]]
  }

  function removeNotification(key: keyof Notifications) {
    notifications[key] = []
  }

  socket!.on('newRecommended', (data: any) => {
    const { type, id } = data.title.title
    addNotification('recommended', { type, id })
  })

  return {
    notifications,
    addNotification,
    removeNotification
  }
})