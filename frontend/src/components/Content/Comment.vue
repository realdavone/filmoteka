<template>
  <div class="comment">
    <header>
      <div class="left-col">
        <div class="date">{{new Date(comment.createdAt).toLocaleString('sk-SK')}}</div>
        <div class="user">
          <Avatar :id="comment.author?._id"/>
          <span>{{comment.author?.email}}</span>          
        </div>
      </div>
      <button v-if="store.state.credentials.user?.email === comment.author?.email" :disabled="loading" @click="deleteComment(comment._id)">Zmazať</button>
    </header>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script setup lang="ts">
import getData from '../../api/main'

import { inject, ref } from 'vue'

import { Comment } from '../../types/comment'
import Avatar from '../Avatar.vue';

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
  flex-direction:column;
  gap:0.5rem;
  align-self:stretch;
  padding:1rem;
  background-color:var(--card-color-hover);
  border-radius:0.75rem;
  user-select:none;
  header{
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    gap:0.5rem;
    div.left-col{
      div.date{
        font-size:0.65rem;
        opacity:0.5;
        margin-bottom:0.5rem;
      }
      div.user{
        display:flex;
        align-items:center;
        gap:0.5rem;
      }
      span:first-of-type{
        color:var(--theme-color);
        display:inline-flex;
        align-items:center;
        gap:0.25rem;
        font-size:0.75rem;
      }
    }
    button{
      color:crimson;
      font-size:0.65rem;
      text-transform:uppercase;
      font-weight:700;
    }
  }
}
</style>