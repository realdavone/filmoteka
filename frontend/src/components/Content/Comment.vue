<template>
  <div class="comment">
    <Avatar :id="comment.author?._id" width="30px"/>
    <div class="right-col">
      <div class="user">
        <span class="name">{{ comment.author?.email }}</span>
        <span v-if="comment.author?.isVerified" class="material-icons" style="font-size:1rem;color:var(--theme-color)">verified</span>
        <span class="date">{{ useRelativeTimeDifference(comment.createdAt) }}</span>    
      </div>
      <div class="content">{{ comment.content }}</div>
      <button v-if="store.state.credentials.user?.email === comment.author?.email" class="remove-comment" :disabled="loading" @click="deleteComment(comment._id)">Zmazať</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import getData from '../../api/main'
import useRelativeTimeDifference from '../../composables/relative-time-difference'

import { inject, ref } from 'vue'

import { Comment } from '../../types/comment'
import Avatar from '../Avatar.vue'

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

const store = inject<any>('store')
</script>

<style lang="scss" scoped>
div.comment{
  display:flex;
  gap:1rem;
  align-self:stretch;
  user-select:none;
  align-items:flex-start;
  div.right-col{
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    gap:0.5rem;
    div.user{
      display:flex;
      align-items:flex-end;
      gap:0.5rem;
      font-size:0.75rem;
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