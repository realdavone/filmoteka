<template>
  <Modal @close="$emit('close')">
    <template #modal>
      <div ref="modal" class="modal"> 
        <header>
          <div class="user">
            <Avatar :id="store.state.credentials.user?._id"/>
            <span v-font:small>{{store.state.credentials.user?.email}}</span>
            <Verified v-if="store.state.credentials.user?.isVerified" />
          </div>
        </header>
        <div v-if="error" class="error">{{error}}</div>
        <form @submit.prevent="submitComment">
          <textarea v-focus ref="textarea" v-model="content" type="text" placeholder="Napíš komentár..."></textarea>
          <div class="buttons">
            <BasicButton type="close" @handleClick="emit('close')">Zavrieť</BasicButton>
            <BasicButton :disabled="content.length === 0 || loading === true" style="align-self:flex-end;">
              Komentovať
              <Loader v-if="loading" type="inline" />
            </BasicButton>
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { onClickOutside } from '@vueuse/core'
import getData from '../../api/main.js'

import Modal from './Modal.vue'
import Loader from '../Loader.vue'
import Avatar from '../Avatar.vue'
import BasicButton from '../Buttons/BasicButton.vue'
import Verified from '../Content/Verified.vue'

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
</script>

<style lang="scss" scoped>
div.modal{
  padding:10px 15px 15px;
  background-color:var(--background-color);
  border-radius:10px;
  display:flex;
  flex-direction:column;
  gap:15px;
  width:100%;
  max-width:400px;
  box-shadow: var(--modal-box-shadow);
  div.error{color:crimson}
  header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    div.user{
      user-select:none;
      display:flex;
      align-items:center;
      gap:10px;
    }
  }
  form{
    display:flex;
    flex-direction:column;
    gap:15px;

    textarea{
      background-color:var(--card-color);
      border-radius:8px;
      padding:10px;
      color:var(--font-color);
      resize:none;
      width:100%;
      min-width:100%;
      height:100px;

      &:focus{
        outline:1px solid var(--theme-color)
      }
    }
  }
  div.buttons{
    display: flex;
    justify-content: end;
    gap:8px;
  }
}
</style>