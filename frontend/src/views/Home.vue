<template>
  <main class="home">
    <Featured :titles="featuredTitles" />
    <CallToLogin
      v-if="!authStore.isLoggedIn"
      :enableClose="false"
    />
    <CardPanel
      heading="Trendy"
      allowGrid
      isGrid
      :cards="trendingTitles && trendingTitles!.map(card => ({
        media_type: card.media_type,
        id: card.id,
        poster_path: card.poster_path ?? '',
        title: card.media_type === 'movie' ? card.title : card.name
      }))"
      :placeholderInfo="{ type: 'title', count: 8 }"
    />
    <CardPanel
      style="margin-top: 1rem;"
      v-if="recentTitlesStore.recentItems.length"
      heading="Posledné navštívené"
      :cards="recentTitlesStore.recentItems.map(item => ({
        media_type: item.type.toLowerCase() as 'movie' | 'tv',
        title: item.title,
        poster_path: item.poster,
        id: item.id
      }))"
      :placeholderInfo="{ type: 'title', count: 8 }"
    />
  </main>
  
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import getData from '../api/main'
import { useRecentTitlesStore } from '../store/recent-items'

import Featured from '../components/Home/Featured.vue'
import CardPanel from '../components/Content/CardPanel.vue'
import CallToLogin from '../components/Content/CallToLogin.vue'

import { Title } from '../types/title'
import { ApiListResponse } from '../types/response'
import { useAuthStore } from '../store/auth'

const recentTitlesStore = useRecentTitlesStore()
const authStore = useAuthStore()
const router = useRouter()

const trendingTitles = ref<Title[] | null>(null)
const featuredTitles = ref<Title[] | null>(null)

const fetchData = async () => {
  try {
    const trends = await getData<ApiListResponse<Title[]>>({ endpoint: '/panel/trending/day' })
    trendingTitles.value = trends['results'].filter(title => title['poster_path'] !== null)

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