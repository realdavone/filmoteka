<template>
  <div class="user">
    <div class="details">
      <span v-if="authStore.user?.email === user.email" class="material-icons label">person_filled</span>
      <span v-font:small>{{ user.email }}</span>
      <span v-if="user.isOwner" class="material-icons owner">verified_user</span>
    </div>
    <div class="control">
      <span v-font:small>Admin</span>
      <button :data-active="isAdmin" class="toggle-button" @click="toggleAdmin(user._id)"></button>
    </div>
    <div class="control">
      <span v-font:small>Schválené</span>
      <button :data-active="isVerified" class="toggle-button" @click="toggleApproved(user._id)"></button>
    </div>
    <BasicButton type="close" @handleClick="removeUser(user._id)" style="align-self: flex-end;">Zmazať</BasicButton>
  </div>
</template>

<script setup lang="ts">
import getData from '../../../api/main'
import { ref } from 'vue'
import BasicButton from '../../Buttons/BasicButton.vue';
import { useAuthStore } from '../../../store/auth';

const authStore = useAuthStore()

const { user } = defineProps<{
  user: {
    _id: string
    email: string
    isAdmin: boolean
    isOwner: boolean
    isVerified: boolean
  }
}>()

const isAdmin = ref<boolean>(user.isAdmin)
const isVerified = ref<boolean>(user.isVerified)

const emit = defineEmits(['removeUser'])

const toggleAdmin = async (id: string) => {
  try {
    const data = await getData<{ success: boolean, message: string }>({
      endpoint: '/user/roles/admin/toggle',
      options: {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'access-token': authStore.accessToken },
        body: JSON.stringify({ id })
      }
    })
    if(data.success) isAdmin.value = !isAdmin.value
  } catch (error) { console.log(error) }
}

const toggleApproved = async (id: string) => {
  try {
    const data = await getData<{ success: boolean, message: string }>({
      endpoint: '/user/verified/toggle',
      options: {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'access-token': authStore.accessToken },
        body: JSON.stringify({ id })
      }
    })
    if(data.success) isVerified.value = !isVerified.value
  } catch (error) { console.log(error) }
}

const removeUser = async (id: string) => {
  try {
    const data = await getData<{ success: boolean, message: string }>({
      endpoint: '/user/delete',
      options: {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'access-token': authStore.accessToken },
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
    gap:8px;
    span.label{
      max-width:16px;
    }
    span.owner{
      color:var(--theme-color);
      font-size: 20px;
    }
  }
  div.control{
    display:flex;
    gap:10px;
    align-items:center;
    justify-content:space-between;
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