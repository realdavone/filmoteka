<template>
  <main class="wrapper">
    <div v-if="items.length === 0 && loading === false" class="no-items container">Sekcia odporúčaných je prázdna</div>
    <CardPanel v-else :allowGrid="false" :isGrid="true" :placeholderInfo="{ type: 'title', count: 8 }">
      <template #title>Odporúčané za posledný deň</template>
      <template #card>
        <VerticalCard v-for="item in items" :item="(item.title as any)" :key="item._id" />
      </template>
    </CardPanel>
  </main>
</template>

<script lang="ts"> 
export default { name: "Recommended" } 
</script>

<script setup lang="ts">
import { ref, onBeforeMount, onUnmounted, inject } from 'vue'
import { useRouter } from 'vue-router'

import VerticalCard from '../components/Content/VerticalCard.vue'
import CardPanel from '../components/Content/CardPanel.vue'

import getData from '../api/main'
import { TitleFromDB } from '../types/title'

type RecommendedList = {
  createdAt: string
  title: TitleFromDB
  __v: number
  _id: string
}

const router = useRouter()
const store = inject<any>('store')
const items = ref<RecommendedList[]>([])
const loading = ref(true)

const fetchRecommended = async () => {
  try {
    items.value = await getData({ endpoint: '/title/recommended' })
    loading.value = false    
  } catch (error) { router.push('/404') }
}

onBeforeMount(() => { fetchRecommended() })
onUnmounted(() => { store.methods.notifications.recommended.reset() })
</script>

<style lang="scss" scoped>
a.item{
  aspect-ratio:2/3;
  border-radius:14px;
  overflow:hidden;
  transition:0.2s ease transform;
  position:relative;
  span.newly-added{
    position:absolute;
    top:10px;
    left:10px;
    background-color:var(--theme-color);
    border-radius:4px;
    font-size:0.5rem;
    padding:2px 3px 1px;
    text-transform:uppercase;
    font-weight:700;
    color:var(--font-color-dark);
  }
  img{
    width:100%;
    aspect-ratio:2/3;
    object-fit:cover;
  }
  &:hover{ transform:scale(1.05) }
}
</style>