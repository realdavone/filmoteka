<template>
  <div class="user">
    <div class="details">
      <span v-if="store.state.credentials.user?.email === user.email" class="material-icons label">person_filled</span>
      <span>{{ user.email }}</span>
      <span v-if="user.isOwner" class="material-icons owner">verified_user</span>
    </div>
    <div class="control">
      <span>Admin</span>
      <button :data-active="isAdmin" class="toggle-button" @click="toggleAdmin(user._id)"></button>
    </div>
    <button @click="removeUser(user._id)" class="remove-user">Zmazať</button>
  </div>
</template>

<script setup lang="ts">
import getData from '../../../api/main'
import { inject, ref } from 'vue'

const store = inject<any>('store') 
const { user } = defineProps<{
  user: {
    _id: string,
    email: string,
    isAdmin: boolean,
    isOwner: boolean
  }
}>()
const isAdmin = ref<boolean>(user.isAdmin)

const emit = defineEmits(['removeUser'])

const toggleAdmin = async (id: string) => {
  try {
    const data = await getData<{ success: boolean, message: string }>({
      endpoint: '/user/toggleadmin',
      options: {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken },
        body: JSON.stringify({ id })
      }
    })
    if(data.success) isAdmin.value = !isAdmin.value
  } catch (error) { console.log(error) }
}
const removeUser = async (id: string) => {
  try {
    const data = await getData<{ success: boolean, message: string }>({
      endpoint: '/user/delete',
      options: {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken },
        body: JSON.stringify({ id })
      }
    })
    if(data.success) emit('removeUser', id)
  } catch (error) { console.log(error) }
}
</script>

<style scoped lang="scss">
div.user{
  background-color:var(--card-color-hover);
  padding:5px 10px 10px;
  border-radius:6px;
  display:flex;
  flex-direction:column;
  gap:10px;
  div.details{
    display:flex;
    align-items:center;
    gap:0.5rem;
    span.label{
      font-size:0.65rem;
      border-radius:10px;
      max-width:10px;
    }
    span.owner{
      color:var(--theme-color);
      font-size:1rem;
      font-weight:700;
    }
  }
  div.control{
    display:flex;
    gap:10px;
    align-items:center;
    justify-content:space-between;
    span{ font-size:0.75rem }
  }
  button.remove-user{
    align-self:flex-end;
    background-color:crimson;
    color:var(--font-color-dark);
    font-weight:700;
    padding:3px 7px;
    border-radius:4px;
  }
}

</style>