<template>
  <section class="settings">
    <div class="row">
      <span class="label">Povolené registrácie</span>
      <button :data-active="store.state.globalSettings?.allowRegistration" class="toggle-button" @click="updateProperty('allowRegistration', store.state.globalSettings?.allowRegistration)" />
    </div>
    <div class="row">
      <span class="label">Sledovanie bez registrácie</span>
      <button :data-active="store.state.globalSettings?.allowWatchWhileUnregistered" class="toggle-button" @click="updateProperty('allowWatchWhileUnregistered', store.state.globalSettings?.allowWatchWhileUnregistered)" />
    </div>
    <div class="row">
      <span class="label">Refresh tokeny</span>
      <button @click="clearTokens" class="remove-button">Zmazať</button>
    </div>
  </section>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification"
import getData from '../../api/main.js'
import { inject } from 'vue'

const store = inject('store')

const updateProperty = async (property, value) => {
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
    const data = await getData({
      endpoint: '/config/clear-tokens',
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
    font-size:0.85rem;
    button.remove-button{
      background:crimson;
      font-size:0.7rem;
      padding:3px 5px 1px;
      border-radius:6px;
      font-weight:700;
      color:var(--font-color-dark);
    }
  }
}
</style>