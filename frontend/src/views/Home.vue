<template>
  <main class="home">
    <Featured :titles="featuredTitles" />
    <CallToLogin v-if="!store.state.credentials.loggedIn" :enableClose="false" />
    <CardPanel
    heading="Trendy"
    allowGrid
    isGrid
    :cards="trendingTitles && trendingTitles!.map(card => ({
      media_type: card.media_type,
      id: card.id,
      poster_path: card.poster_path || '',
      title: card.media_type === 'movie' ? card.title : card.name
    }))"
    :placeholderInfo="{ type: 'title', count: 8 }" />
    <CardPanel
    style="margin-top: 1rem;"
    v-if="store.state.recentItems.length"
    heading="Posledné navštívené"
    :cards="store.state.recentItems.map((item: any)=> ({
      media_type: item.type.toLowerCase(),
      title: item.title,
      poster_path: item.poster,
      id: item.id
    }))"
    :placeholderInfo="{ type: 'title', count: 8 }" >
    </CardPanel>
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
const featuredTitles = ref<Title[] | null>(null)

const fetchData = async () => {
  try {
    const trends = await getData<ApiListResponse<Title[]>>({ endpoint: '/panel/trending/day' })
    trendingTitles.value = trends['results'].filter(title => title['poster_path'] !== null)

    featuredTitles.value = new Array()
    featuredTitles.value = [trendingTitles.value[0], trendingTitles.value[5], trendingTitles.value[10], trendingTitles.value[15]]

  } catch (error) { router.push({ name: 'NotFound' }) }
}

onBeforeMount(() => fetchData())
</script>

<style lang="scss" scoped>
main.home{
  display:flex;
  flex-direction:column;
  gap:15px;
}
</style>