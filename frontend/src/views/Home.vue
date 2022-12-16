<template>
  <main class="home">
    <Featured :title="{
      backdrop_path: featured?.backdrop_path,
      poster_path: featured?.poster_path,
      media_type: featured?.media_type,
      title: featured?.media_type === 'movie' ? featured?.title : featured?.name,
      overview: featured?.overview,
      vote_average: featured?.vote_average,
      id: featured?.id
    }" />
    <CallToLogin v-if="!store.state.credentials.loggedIn" :enableClose="false" />
    <CardPanel
    heading="Trending"
    allowGrid
    isGrid
    :cards="trendingTitles && trendingTitles!.map(card => {
      return {
        media_type: card.media_type,
        id: card.id,
        poster_path: card.poster_path || '',
        title: card.media_type === 'movie' ? card.title : card.name
      }
    })"
    :placeholderInfo="{ type: 'title', count: 8 }" />
  </main>
  
</template>

<script setup lang="ts">
import { ref, onBeforeMount, inject } from 'vue'
import { useRouter } from 'vue-router'
import getData from '../api/main'

import Featured from '../components/Home/Featured.vue'
import CardPanel from '../components/Content/CardPanel.vue'
import CallToLogin from '../components/Content/CallToLogin.vue'

import { Title } from '../types/title'
import { ApiListResponse } from '../types/response'

const store = inject<any>('store')
const router = useRouter()

const trendingTitles = ref<Title[] | null>(null)
const featured = ref<Title | null>(null)

const fetchData = async () => {
  try {
    const trends = await getData<ApiListResponse<Title[]>>({ endpoint: '/panel/trending/day' })
    trendingTitles.value = trends['results'].filter(title => title['poster_path'] !== null)

    featured.value = trendingTitles.value[Math.floor(Math.random() * trendingTitles.value.length)]
  } catch (error) { router.push({ name: 'NotFound' }) }
}

onBeforeMount(() => { fetchData() })
</script>

<style lang="scss" scoped>
main.home{
  display:flex;
  flex-direction:column;
  gap:1rem;
}
</style>