<template>
  <section class="settings">
    <div class="row">
      <span v-font:medium>Povolené registrácie</span>
      <button
        :data-active="globalConfigStore.globalConfig?.allowRegistration"
        class="toggle-button"
        @click="updateProperty('allowRegistration', globalConfigStore.globalConfig?.allowRegistration)"
      />
    </div>
    <div class="row">
      <span v-font:medium>Sledovanie bez registrácie</span>
      <button
        :data-active="globalConfigStore.globalConfig?.allowWatchWhileUnregistered"
        class="toggle-button"
        @click="updateProperty('allowWatchWhileUnregistered', globalConfigStore.globalConfig?.allowWatchWhileUnregistered)"
      />
    </div>
    <div class="row">
      <span v-font:medium>Adblock varovanie</span>
      <button
        :data-active="globalConfigStore.globalConfig?.adblockModalWarning"
        class="toggle-button"
        @click="updateProperty('adblockModalWarning', globalConfigStore.globalConfig?.adblockModalWarning)"
      />
    </div>
    <div class="row">
      <span v-font:medium>Refresh tokeny</span>
      <button
        v-font:small
        @click="clearTokens"
        class="remove-button"
      >Zmazať</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { notify } from "@kyvg/vue3-notification"
import getData from '../../api/main'
import { useGlobalConfigStore } from "../../store/global-config";
import { useAuthStore } from "../../store/auth";

const globalConfigStore = useGlobalConfigStore()
const authStore = useAuthStore()

const updateProperty = async (property: string, value: unknown) => {
  try {
    await getData({
      endpoint: '/config/update',
      options: {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'access-token': authStore.accessToken },
        body: JSON.stringify({ [property]: !value })
      }
    })
  } catch (error) { console.log(error) }
}

const clearTokens = async () => {
  try {
    const data = await getData<{
      success: true
      message: string
    }>({
      endpoint: '/config/tokens/clear',
      options: {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'access-token': authStore.accessToken }
      }
    })
    if(data.success) notify({ type: 'success', text: data.message }) 
  } catch (error) { console.log(error) }
}
</script>

<style lang="scss" scoped>
section.settings{
  display:flex;
  flex-direction:column;
  gap:10px;
  div.row{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:10px;
    background-color:var(--card-color-hover);
    padding:5px 10px;
    border-radius:4px;
    font-weight:700;
    button.remove-button{
      background:crimson;
      padding:4px 10px 2px;
      border-radius:4px;
      font-weight:700;
      text-transform: uppercase;
      font-family: 'Roboto', sans-serif;
      color:var(--font-color-dark);
    }
  }
}
</style>