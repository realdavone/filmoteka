<template>
  <section class="settings">
    <div class="row">
      <span v-font:medium>Povolené registrácie</span>
      <button :data-active="store.state.globalSettings?.allowRegistration" class="toggle-button" @click="updateProperty('allowRegistration', store.state.globalSettings?.allowRegistration)" />
    </div>
    <div class="row">
      <span v-font:medium>Sledovanie bez registrácie</span>
      <button :data-active="store.state.globalSettings?.allowWatchWhileUnregistered" class="toggle-button" @click="updateProperty('allowWatchWhileUnregistered', store.state.globalSettings?.allowWatchWhileUnregistered)" />
    </div>
    <div class="row">
      <span v-font:medium>Adblock varovanie</span>
      <button :data-active="store.state.globalSettings?.adblockModalWarning" class="toggle-button" @click="updateProperty('adblockModalWarning', store.state.globalSettings?.adblockModalWarning)" />
    </div>
    <div class="row">
      <span v-font:medium>Refresh tokeny</span>
      <button v-font:small @click="clearTokens" class="remove-button">Zmazať</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { notify } from "@kyvg/vue3-notification"
import getData from '../../api/main'
import { inject } from 'vue'

const store = inject<any>('store')

const updateProperty = async (property: string, value: unknown) => {
  try {
    await getData({
      endpoint: '/config/update',
      options: {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken },
        body: JSON.stringify({ [property]: !value })
      }
    })
  } catch (error) { console.log(error) }
}

const clearTokens = async () => {
  try {
    const data = await getData<any>({
      endpoint: '/config/tokens/clear',
      options: {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken }
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