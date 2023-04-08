<template>
  <div class="comment">
    <Avatar :id="comment.author?._id" width="30px"/>
    <div class="right-col">
      <div class="user">
        <span v-font:small class="name">{{ comment.author?.email }}</span>
        <Verified v-if="comment.author?.isVerified" />
        <span v-font:small class="date">{{ useRelativeTimeDifference(comment.createdAt) }}</span>    
      </div>
      <div v-font:medium>{{ comment.content }}</div>
      <button
        v-font:small
        v-if="authStore.user?.email === comment.author?.email"
        class="remove-comment"
        :disabled="loading"
        @click="deleteComment(comment._id)"
      >Zmazať</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import getData from '../../api/main'
import useRelativeTimeDifference from '../../composables/relative-time-difference'

import { ref } from 'vue'

import { Comment } from '../../types/comment'
import Avatar from '../Avatar.vue'
import Verified from './Verified.vue'
import { useAuthStore } from '../../store/auth'

const { comment } = defineProps<{ comment: Comment }>()
const emit = defineEmits(['deleted'])

const loading = ref(false)

const deleteComment = (id: string): void => {
  loading.value = true
  getData<{
    success: true
  } | {
    success: false
    message: string
  }>({ endpoint: `/comments`, options: {
    method: 'DELETE',
    body: JSON.stringify({ id })
  }})
  .then(res => {
    if(res.success) emit('deleted')
    else throw(res.message || 'Nastala chyba')
  })
  .catch(error => console.log(error))
  .finally(() => loading.value = false)
}

const authStore = useAuthStore()
</script>

<style lang="scss" scoped>
div.comment{
  display:flex;
  gap:15px;
  align-self:stretch;
  user-select:none;
  align-items:flex-start;
  div.right-col{
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    gap:8px;
    div.user{
      display:flex;
      align-items:flex-end;
      gap:8px;
      span.name{
        font-weight:bold;
      }
      span.date{
        opacity:0.5;
      }
    }
    button.remove-comment{
      color:crimson;

      &:hover{
        text-decoration: underline;
      }

      &:disabled{
        opacity: 0.25;
      }
    }
  }
}
</style>