<template>
  <main class="home">
    <Featured :title="featured" />
    <CallToLogin v-if="!store.state.credentials.loggedIn" ref="callToLogin" :enableClose="false" v-memo="[store.state.credentials.loggedIn, $refs.callToLogin?.shown]" />
    <CardPanel :allowGrid="true" :isGrid="true" :placeholderInfo="{ count: 8 }">
      <template #title>Trendy</template>
      <template #card>
        <VerticalCard v-for="item in trendingTitles" :item="item" :key="item.id" />
      </template>
    </CardPanel>
    <!-- <CardPanel :placeholderInfo="{ count: 8 }">
      <template #title>Populárne seriály dnes</template>
      <template #card>
        <VerticalCard v-for="item in popularTv" :item="item" :key="item.id"/>
      </template>
    </CardPanel> -->
  </main>
  
</template>

<script setup>
import { ref, onBeforeMount, inject } from 'vue'
import getData from '../api/main.js'

import Featured from '../components/Home/Featured.vue'
import CardPanel from '../components/Content/CardPanel.vue'
import VerticalCard from '../components/Content/VerticalCard.vue'
import CallToLogin from '../components/Content/CallToLogin.vue'

const store = inject('store')

const trendingTitles = ref([])
const popularTv = ref([])
const featured = ref({})

const fetchData = async () => {
  try {
    const trends = await getData({ endpoint: '/panel/trending/day' })
    trendingTitles.value = trends['results'].filter(title => title['poster_path'] !== null)

    // const popular = await getData({ endpoint: '/panel/popular/tv' })
    // popularTv.value = popular['results'].filter(title => title.poster_path).map(title => ({ ...title, media_type: 'tv' }))

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