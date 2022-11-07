<template>
  <section class="container">
    <button class="add-comment" @click="openModal">Pridať komentár...</button>
    <div class="subtitle">Komentáre</div>
    <div class="comments">
      <template v-if="!loading">
        <div v-if="data.length > 0" class="comment" v-for="comment in data" :key="comment.id">
          <header>
            <span :style="`${store.state.credentials.user?.email === comment.author?.email && 'color:var(--theme-color)'}`">{{comment.author?.email}}</span>
            <span>{{new Date(comment.createdAt).toLocaleString('sk-SK')}}</span>
          </header>
          <div class="content">{{comment.content}}</div>
        </div>
        <span v-else class="no-comments">Žiadne komentáre</span>
      </template>
      <Loader v-else :height="'1.5rem'" :border="'0.25rem'" />
    </div>
  </section>
  <Teleport to="body">
    <Transition name="fade">
      <SubmitCommentModal v-if="isModalOpen" :title="title" @close="isModalOpen = false" @submitted="fetchComments" />
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onBeforeMount, inject } from 'vue'

import SubmitCommentModal from '../SubmitCommentModal.vue';
import Loader from '../Loader.vue'
import getData from '../../api/main'

const store = inject('store')

const { title } = defineProps({ title: Object })

const isModalOpen = ref(false)

const data = ref([])

const loading = ref(null)
const error = ref(null)

const fetchComments = () => {
  getData({ endpoint: `/comments/${title.type}/${title.id}` })
  .then(response => {
    loading.value = true
    error.value = null
    data.value = response
  })
  .catch(error => error.value = error)
  .finally(() => {
    isModalOpen.value = false
    loading.value = false
  })
}

onBeforeMount(() => fetchComments())

const openModal = () => isModalOpen.value = !isModalOpen.value
</script>

<style lang="scss" scoped>
span.no-comments{
  font-size:0.9rem;
  align-self:flex-start;
  color:var(--alternative-color)
}
button.add-comment{
  background-color:var(--card-color-hover);
  padding:1rem 1.25rem;
  width:100%;
  border-radius:3rem;
  text-align:left;
  font-size:1.1rem;
  margin-bottom:1rem;
}
div.subtitle{
  font-size:1.05rem;
  padding:0.5rem 0;
  font-weight:700;
}
div.comments{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:1rem;
  max-height:300px;
  min-height:2.5rem;
  overflow:auto;
  &::-webkit-scrollbar{width:15px;height:15px;}
  &::-webkit-scrollbar-thumb{background:var(--card-color-hover);border:4px solid transparent;border-radius:10px;background-clip:content-box;}
  div.comment{
    background-color:var(--card-color);
    padding:1rem;
    border-radius:1rem;
    display:flex;
    flex-direction:column;
    gap:0.5rem;
    align-self:stretch;
    header{
      font-size:0.75rem;
      display:flex;
      align-items:flex-end;
      gap:0.5rem;
      span:last-of-type{ color:var(--alternative-color); }
    }
  }
}
</style>