import { defineStore } from 'pinia'
import { reactive } from 'vue'

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

  return {
    notifications,
    addNotification,
    removeNotification
  }
})