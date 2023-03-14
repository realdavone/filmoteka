<template>
  <Navbar v-if="!$route?.meta?.hideNav"/>
  <main class="content">
    <router-view v-slot="{ Component }">
      <KeepAlive max="5" :exclude="['Recommended', 'Admin']">
        <component :key="$route.fullPath" :is="Component" />
      </KeepAlive>
    </router-view>
  </main>
  <notifications position="bottom center"/>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { provide } from 'vue'
import store from './store/index'
import socket from './socket/main'

socket.on('globalSettingsUpdate', (data: any) => store.state.globalSettings = { ...store.state.globalSettings, ...data } )

provide('store', store)
provide('socket', socket)
</script>

<style lang="scss">

</style>
