<template>
  <section class="discussion user-select-none">
    <h3>Diskusia</h3>
    <div v-if="numberOfComments" class="number-of-comments">Počet komentárov: {{ numberOfComments }}</div>
    <button class="add-comment" @click="openModal">Napísať komentár...</button>
    <div class="comments">
      <template v-if="!loading">
        <div v-if="error" class="error">{{ error }}</div>
        <Comment v-for="comment in data" :key="comment.id" :comment="comment" @deleted="fetchComments(1)"/>
      </template>
      <Loader v-else type="default" />
    </div>
    <PageControl
    v-if="numberOfPages! > 1"
    :pages="{
      current: currentPage as number,
      total: numberOfPages as number
    }"
    @navigate="navigate"/>
  </section>
  <Teleport to="body">
    <Transition name="fade">
      <SubmitCommentModal v-if="isModalOpen" :title="title" @close="isModalOpen = false" @submitted="fetchComments(1)" />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

import SubmitCommentModal from '../SubmitCommentModal.vue'
import PageControl from '../PageControl.vue'
import Loader from '../Loader.vue'
import Comment from './Comment.vue'

import getData from '../../api/main'

import { Comment as CommentType } from '../../types/comment'

type CommentResponse = {
  comments: Array<CommentType>
  all_comments: number
  page: number
  number_of_pages: number
}

const { title } = defineProps<{
  title: {
    type: 'movie' | 'tv'
    id: string
  }
}>()

const isModalOpen = ref(false)

const data = ref<Array<CommentType>>([])
const currentPage = ref<null | number>(null)
const numberOfPages = ref<null | number>(null)
const numberOfComments = ref<null | number>(null)

const loading = ref(false)
const error = ref<string | null>(null)

function navigate(page: number) {
  fetchComments(page)
}

const fetchComments = (page: number) => {
  loading.value = true
  error.value = null
  getData<CommentResponse>({ endpoint: `/comments/${title.type}/${title.id}?page=${page}` })
  .then(response => {
    data.value = response.comments
    currentPage.value = response.page
    numberOfPages.value = response.number_of_pages
    numberOfComments.value = response.all_comments
  })
  .catch(err => error.value = err)
  .finally(() => {
    isModalOpen.value = false
    loading.value = false
  })
}

onBeforeMount(() => !loading.value && fetchComments(1))

const openModal = () => isModalOpen.value = !isModalOpen.value
</script>

<style lang="scss" scoped>
section.discussion{
  margin:0 var(--container-padding);
  h3{
    margin-bottom:1rem
  }
  div.number-of-comments{
    font-size:0.85rem;
    margin-bottom:1rem;
  }
}
span.no-comments{
  font-size:0.9rem;
  align-self:flex-start;
}
div.error{
  align-self:flex-start;
  color:crimson
}
button.add-comment{
  background-color:var(--card-color);
  box-shadow:var(--basic-box-shadow);
  padding:0.75rem 1.25rem;
  width:100%;
  border-radius:3rem;
  text-align:left;
  font-size:1rem;
  margin-bottom:1.5rem;
}
div.comments{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:1rem;
  max-height:100vh;
  overflow:auto;
  min-height: 40px;
  &::-webkit-scrollbar{ width:15px; height:15px; }
  &::-webkit-scrollbar-thumb{background:var(--card-color-hover);border:4px solid transparent;border-radius:10px;background-clip:content-box;}
}
</style>