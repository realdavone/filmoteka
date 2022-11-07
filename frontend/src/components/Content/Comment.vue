<template>
  <div class="comment">
    <header>
      <div class="left-col">
        <span :style="`${store.state.credentials.user?.email === comment.author?.email && 'color:var(--theme-color)'}`">{{comment.author?.email}}</span>
        <span> @ {{new Date(comment.createdAt).toLocaleString('sk-SK')}}</span>
      </div>
      <button v-if="store.state.credentials.user?.email === comment.author?.email" :disabled="loading" @click="deleteComment(comment._id)">
        <span class="material-icons">delete_outline</span>
      </button>
    </header>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script setup>
import getData from '../../api/main.js'

import { inject, ref } from 'vue'
const { comment } = defineProps({ comment: Object })
const emit = defineEmits(['deleted'])

const loading = ref(false)

const deleteComment = id => {
  loading.value = true
  getData({ endpoint: `/comments`, options: {
    method: 'DELETE',
    body: JSON.stringify({id})
  }})
  .then(res => {
    if(res.success) emit('deleted')
    else throw(res.message || 'Nastala chyba')
  })
  .catch(error => console.log(error))
  .finally(() => loading.value = false)
}

const store = inject('store')
</script>

<style lang="scss" scoped>
div.comment{
  background-color:var(--card-color);
  padding:1rem;
  border-radius:1rem;
  display:flex;
  flex-direction:column;
  gap:0.5rem;
  align-self:stretch;
  header{
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    gap:0.5rem;
    div.left-col{
      font-size:0.75rem;
    }
    button{
      color:crimson;
      span{ font-size:1rem }
    }
  }
}
</style>