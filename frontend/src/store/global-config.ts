import { ref } from 'vue'
import { defineStore } from 'pinia'
import socket from '../socket/main'

interface GlobalConfig {
  allowRegistration: boolean
  allowWatchWhileUnregistered: boolean
  adblockModalWarning: boolean
}

type ApiResponse = {
  success: true
  settings: GlobalConfig
}

export const useGlobalConfigStore = defineStore('globalConfig', () => {
  const globalConfig = ref<GlobalConfig>()

  async function getConfig(): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      fetch(`${import.meta.env.VITE_BASE_URL}/config`).then(res => res.json())
      .then((data: ApiResponse) => resolve(data))
      .catch(() => reject('Služba nie je dostupná. Skúste neskôr.'))      
    })
  }

  function setConfig(config: GlobalConfig) {
    globalConfig.value = config
  }

  socket.on('globalSettingsUpdate', (newConfig: any) => setConfig({ ...globalConfig.value, ...newConfig }))

  return {
    globalConfig,
    getConfig,
    setConfig
  }
})