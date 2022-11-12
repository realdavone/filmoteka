<template>
  <section class="container">
    <Title>Diskusia</Title>
    <button class="add-comment" @click="openModal">Napísať komentár...</button>
    <div class="comments">
      <template v-if="!loading">
        <div v-if="error" class="error">{{error}}</div>
        <Comment v-if="data.length > 0" v-for="comment in data" :key="comment.id" :comment="comment" @deleted="fetchComments"/>
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
import { ref, onBeforeMount } from 'vue'

import SubmitCommentModal from '../SubmitCommentModal.vue'
import Loader from '../Loader.vue'
import Comment from './Comment.vue'
import Title from './Title.vue'

import getData from '../../api/main'

const { title } = defineProps({ title: Object })

const isModalOpen = ref(false)

const data = ref([])

const loading = ref(false)
const error = ref(null)

const fetchComments = () => {
  loading.value = true
  error.value = null
  getData({ endpoint: `/comments/${title.type}/${title.id}` })
  .then(response => data.value = response)
  .catch(err => error.value = err)
  .finally(() => {
    isModalOpen.value = false
    loading.value = false
  })
}

onBeforeMount(() => !loading.value && fetchComments())

const openModal = () => isModalOpen.value = !isModalOpen.value
</script>

<style lang="scss" scoped>
span.no-comments{
  font-size:0.9rem;
  align-self:flex-start;
  color:var(--alternative-color)
}
div.error{
  align-self:flex-start;
  color:crimson
}
button.add-comment{
  background-color:var(--card-color-hover);
  padding:0.75rem 1.25rem;
  width:100%;
  border-radius:3rem;
  text-align:left;
  font-size:1rem;
  margin-bottom:1rem;
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
}
</style>