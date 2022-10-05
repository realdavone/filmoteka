<template>
  <main class="container wrapper">
    <Title>Odporúčané za posledný deň</Title>
    <div v-if="items.length === 0 && loading === false" class="no-items">Sekcia odporúčaných je prázdna</div>
    <GridPanel v-else>
      <template #items>
        <router-link v-if="!loading" :to="`/${item?.title.type}/${item?.title.id}`" v-for="item in items" :key="item?.id" class="item">
          <span v-if="store.state.notifications.recommended.some(title => title.type === item?.title.type && title.id === item?.title.id)" class="newly-added">Nové</span>
          <img :src="`https://www.themoviedb.org/t/p/w300${item.title.img}`" :alt="item.title.title" loading="lazy">
        </router-link>
      </template>
    </GridPanel>
  </main>
</template>

<script> 
export default { name: 'Recommended'} 
</script>

<script setup>
import { ref, onBeforeMount, onUnmounted, inject } from 'vue'
import Title from '../components/Content/Title.vue'
import GridPanel from '../components/Content/GridPanel.vue'

import getData from '../api/main'

const store = inject('store')
const items = ref([])
const loading = ref(true)

const fetchRecommended = async () => {
  items.value = await getData({ endpoint: '/title/recommended' })
  loading.value = false
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