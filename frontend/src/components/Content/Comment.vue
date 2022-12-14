<template>
  <div class="comment">
    <header>
      <div class="left-col">
        <span :class="`${store.state.credentials.user?.email === comment.author?.email && 'me'}`">{{comment.author?.email}}</span>
        <span> @ {{new Date(comment.createdAt).toLocaleString('sk-SK')}}</span>
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

const { comment } = defineProps<{ comment: Comment }>()
const emit = defineEmits(['deleted'])

const loading = ref(false)

const deleteComment = (id: Comment['_id']): void => {
  loading.value = true
  getData({ endpoint: `/comments`, options: {
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
  background-color:var(--card-color);
  border-radius:0.75rem;
  header{
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    gap:0.5rem;
    div.left-col{
      font-size:0.75rem;
      span:first-of-type{
        color:var(--theme-color);
        display:inline-flex;
        align-items:center;
        gap:0.25rem;
        &.me::before{
          content:'JA';
          color:var(--font-color-dark);
          background-color:var(--theme-color);
          font-size:0.55rem;
          line-height:1;
          padding:0.15rem 0.25rem;
          border-radius:0.15rem;
        }
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