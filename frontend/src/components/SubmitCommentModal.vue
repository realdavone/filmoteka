<template>
  <Modal @close="$emit('close')">
    <template #modal>
      <div ref="modal" class="modal"> 
        <header>
          <div class="user">
            <Avatar :id="store.state.credentials.user?._id"/>
            <span>{{store.state.credentials.user?.email}}</span>
          </div>
          <CloseButton @click="emit('close')"/>
        </header>
        <div v-if="error" class="error">{{error}}</div>
        <form @submit.prevent="submitComment">
          <textarea ref="textarea" v-model="content" type="text" placeholder="Napíš komentár..."></textarea>
          <button :disabled="content.length === 0 || loading === true">
            Komentovať
            <Loader v-if="loading" border="3px" />
          </button>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import getData from '../api/main.js'

import CloseButton from './Buttons/CloseButton.vue'
import Modal from './Modal.vue'
import Loader from './Loader.vue'
import Avatar from './Avatar.vue'

const { title } = defineProps<{
  title: {
    type: 'tv' | 'movie',
    id: string
  }
}>()
const emit = defineEmits(['close', 'submitted'])

const store = inject<any>('store')

const loading = ref<boolean>(false)
const error = ref<string | null>(null)

const modal = ref<HTMLElement | null>(null)
const textarea = ref<HTMLTextAreaElement | null>(null)

onClickOutside(modal, () => emit('close'))

const content = ref('')

const submitComment = () => {
  error.value = null
  loading.value = true
  getData<{
    success: true
  } | {
    success: false
    message: string
  }>({
    endpoint: '/comments/add',
    options: {
      method: 'POST',
      body: JSON.stringify({
        type: title.type,
        id: title.id,
        content: content.value
      })
    }
  })
  .then(response => {
    if(response.success) emit('submitted')
    else throw(response.message || 'Niečo sa pokazilo')
  })
  .catch(err => error.value = err)
  .finally(() => loading.value = false)
}

onMounted(() => textarea.value!.focus())
</script>

<style lang="scss" scoped>
div.modal{
  padding:0.75rem 1rem 1rem;
  background-color:var(--background-color);
  border-radius:0.75rem;
  display:flex;
  flex-direction:column;
  gap:1rem;
  width:100%;
  max-width:400px;
  div.error{color:crimson}
  header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    div.user{
      user-select:none;
      display:flex;
      align-items:center;
      gap:0.5rem;
      span:first-of-type{ font-size:1.25rem; }
      span:last-of-type{ font-size:0.75rem; }
    }
  }
  form{
    display:flex;
    flex-direction:column;
    gap:1rem;
    textarea{
      background-color:var(--card-color);
      border-radius:1rem;
      padding:0.75rem;
      color:var(--font-color);
      resize:none;
      width:100%;
      min-width:100%;
      height:100px;
      &:focus{
        outline:1px solid var(--theme-color)
      }
    }
    button{
      background-color:var(--theme-color);
      padding:0.5rem 1rem;
      border-radius:1rem;
      display:flex;
      gap:0.75rem;
      align-items:center;
      justify-content:center;
      color:var(--font-color-dark);
      align-self:flex-end;
      font-size:0.75rem;
      font-weight:700;
      &:disabled{
        opacity:0.5;
        cursor:default;
      }
    }
  }
}
</style>