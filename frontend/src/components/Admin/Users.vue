<template>
  <section class="users">
    <User v-for="user in users.users" :key="user._id" :user="user" @removeUser="removeUser"/>
  </section>
</template>

<script setup>
import User from './Users/User' 
import { ref, inject } from 'vue'
import getData from '../../api/main.js'

const store = inject('store')
const users = ref([])

users.value = await getData({ endpoint: '/user/all', options: { method: 'GET', headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken } } })

const removeUser = id => { users.value.users = users.value.users.filter(user => user._id !== id) }
</script>

<style scoped lang="scss">
section.users{
  display:flex;
  flex-direction:column;
  gap:10px;
  align-self:flex-start!important;
}
</style>