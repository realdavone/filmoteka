<template>
  <main class="home">
    <Featured :title="featured" />
    <CallToLogin v-if="!store.state.credentials.loggedIn" :enableClose="false" />
    <CardPanel :allowGrid="true" :isGrid="true" :placeholderInfo="{ type: 'title', count: 8 }">
      <template #title>Trendy</template>
      <template #card>
        <VerticalCard v-for="item in trendingTitles" :item="item" :key="item.id" />
      </template>
    </CardPanel>
  </main>
  
</template>

<script setup lang="ts">
import { ref, onBeforeMount, inject } from 'vue'
import { useRouter } from 'vue-router'
import getData from '../api/main'

import Featured from '../components/Home/Featured.vue'
import CardPanel from '../components/Content/CardPanel.vue'
import VerticalCard from '../components/Content/VerticalCard.vue'
import CallToLogin from '../components/Content/CallToLogin.vue'

import { Title } from '../types/title'
import { ApiListResponse } from '../types/response'

const store = inject<any>('store')
const router = useRouter()

const trendingTitles = ref<Title[]>([])
const featured = ref<Title>({} as Title)

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