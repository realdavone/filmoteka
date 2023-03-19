<template>
  <section class="discussion user-select-none">
    <div class="header">
      <Title style="margin-bottom: 0;">Diskusia</Title> 
      <Loader v-if="loading" type="inline" />
      <span v-else class="number-of-comments" v-font:medium>{{ numberOfComments }}</span>
    </div>
    <button class="add-comment" @click="openModal" v-font:medium>Napísať komentár...</button>
    <div class="comments">
      <template v-if="!loading">
        <div v-if="error" class="error">{{ error }}</div>
        <Comment v-for="comment in data" :key="comment.id" :comment="comment" @deleted="fetchComments(1)"/>
      </template>
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
import SubmitCommentModal from '../Modal/SubmitCommentModal.vue'
import PageControl from '../PageControl.vue'
import Loader from '../Loader.vue'
import Comment from './Comment.vue'
import Title from './Title.vue'
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
  
  div.header{
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }
}

span.number-of-comments{
  color: gray;
}

div.error{
  align-self:flex-start;
  color:crimson
}
button.add-comment{
  background-color:var(--card-color);
  padding:12px 18px;
  width:100%;
  border-radius:30px;
  text-align:left;
  margin-bottom:20px;
}
div.comments{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:15px;
  max-height:100vh;
  overflow:auto;
  &::-webkit-scrollbar{ width:15px; height:15px; }
  &::-webkit-scrollbar-thumb{background:var(--card-color-hover);border:4px solid transparent;border-radius:10px;background-clip:content-box;}
}
</style>