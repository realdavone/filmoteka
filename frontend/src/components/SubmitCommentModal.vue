<template>
  <Modal>
    <template #modal>
      <div ref="modal" class="modal"> 
        <header>
          <span>{{store.state.credentials.user?.email}}</span>
          <CloseButton @click="emit('close')"/>
        </header>
        <div v-if="error" class="error">{{error}}</div>
        <form @submit.prevent="submitComment">
          <textarea ref="textarea" v-model="content" type="text" placeholder="Napíš komentár..."></textarea>
          <button :disabled="content.length === 0 || loading === true">
            Komentovať
            <Loader v-if="loading" />
          </button>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import getData from '../api/main.js'

import CloseButton from './Buttons/CloseButton.vue'
import Modal from './Modal.vue'
import Loader from './Loader.vue'

const { title } = defineProps({ title: Object })
const emit = defineEmits(['close', 'submitted'])

const store = inject('store')

const loading = ref(false)
const error = ref(null)

const modal = ref(null)
const textarea = ref(null)

onClickOutside(modal, () => emit('close'))

const content = ref('')

const submitComment = () => {
  error.value = null
  loading.value = true
  getData({
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

onMounted(() => textarea.value.focus())
</script>

<style lang="scss" scoped>
div.modal{
  padding:0.75rem 1rem 1rem;
  background-color:var(--background-color);
  border-radius:1rem;
  display:flex;
  flex-direction:column;
  gap:0.5rem;
  width:100%;
  max-width:400px;
  div.error{color:crimson}
  header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    span{ font-size:0.85rem; }
  }
  form{
    display:flex;
    flex-direction:column;
    gap:1rem;
    textarea{
      outline:2px solid var(--card-color);
      border-radius:1rem;
      padding:0.75rem;
      color:var(--font-color);
      resize:none;
      width:100%;
      min-width:100%;
      height:100px;
    }
    button{
      background-color:var(--theme-color);
      padding:0.5rem;
      border-radius:0.5rem;
      display:flex;
      gap:0.75rem;
      align-items:center;
      justify-content:center;
      &:disabled{
        opacity:0.5;
        cursor:default;
      }
    }
  }
}
</style>