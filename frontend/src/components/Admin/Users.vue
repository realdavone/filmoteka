<template>
  <section v-if="users" class="users">
    <User v-for="user in users.users" :key="user._id" :user="user" @removeUser="removeUser"/>
  </section>
</template>

<script setup lang="ts">
import User from './Users/User.vue'
import makeRequest from '../../api/main'

import { ref, inject } from 'vue'

type UsersResponse = {
  success: boolean
  users: Array<User>
}

type User = {
  _id: string
  email: string
  isAdmin: boolean
  isOwner: boolean
  isVerified: boolean
}

const store = inject<any>('store')
const users = ref<null | UsersResponse>(null)

users.value = await makeRequest<UsersResponse>({
  endpoint: '/user/all',
  options: {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken }
  }
})

const removeUser = (id: string) => { users.value!.users = users.value!.users.filter(user => user._id !== id) }
</script>

<style scoped lang="scss">
section.users{
  display:flex;
  flex-direction:column;
  gap:10px;
  align-self:flex-start!important;
}
</style>
