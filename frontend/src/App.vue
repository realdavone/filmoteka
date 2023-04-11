<template>
  <Navbar v-if="!$route?.meta?.hideNav"/>
  <main class="content">
    <router-view v-slot="{ Component }">
      <KeepAlive max="5" :exclude="['Recommended', 'Admin']">
        <component :key="$route.fullPath" :is="Component" />
      </KeepAlive>
    </router-view>
  </main>
  <notifications position="bottom right"/>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { provide } from 'vue'
import socket from './socket/main'
import { useGlobalConfigStore } from './store/global-config'

const globalSettingsStore = useGlobalConfigStore()
socket.on('globalSettingsUpdate', (newConfig: any) => globalSettingsStore.setConfig({ ...globalSettingsStore.globalConfig, ...newConfig }))

provide('socket', socket)
</script>
