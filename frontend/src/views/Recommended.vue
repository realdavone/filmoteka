<template>
  <main class="wrapper">
    <div v-font:medium v-if="!items?.length && !loading" class="container no-results">
      <span class="material-icons-outlined">info</span>
      Sekcia odporúčaných je prázdna
    </div>
    <CardPanel
    v-else
    heading="Odporúčané za posledný deň"
    :allowGrid="false"
    :isGrid="true"
    :placeholderInfo="{ type: 'title', count: 8 }"
    :cards="(items as [])"/>
  </main>
</template>

<script lang="ts"> 
export default { name: "Recommended" } 
</script>

<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted, inject } from 'vue'
import { useRouter } from 'vue-router'

import CardPanel from '../components/Content/CardPanel.vue'

import getData from '../api/main'
import { RecommendedTitle } from '../types/title'

const router = useRouter()
const store = inject<any>('store')
const items = ref<Array<RecommendedTitle> | null>(null)
const loading = ref(false)

const fetchRecommended = async () => {
  const loading = ref(true)
  try {
    const data = await getData<Array<RecommendedTitle>>({ endpoint: '/title/recommended' })
    
    items.value = data.map(card => {
      return {
        media_type: card.title.type,
        id: card.title.id,
        poster_path: card.title.img,
        title: card.title.type
      }
    }) as []
  } catch (error) {
    router.push('/404')
  } finally {
    loading.value = false
  }
}

onBeforeMount(() => fetchRecommended())
onUnmounted(() => store.methods.notifications.recommended.reset())
</script>

<style lang="scss" scoped>
div.no-results{
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>