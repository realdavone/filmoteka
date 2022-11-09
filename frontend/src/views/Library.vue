<template>
  <main class="container wrapper">
    <TitleB style="margin-bottom:0">Knižnica</TitleB>
    <section class="filter">
      <!-- <select id="type" v-model="filterParams.type" @change="changeType()"> -->
        <!-- <option value="movie">Filmy</option> -->
        <!-- <option value="tv">TV</option> -->
      <!-- </select> -->
      <!-- <select id="genres" v-model="filterParams.genre"> -->
        <!-- <option v-for="[key, value] in store.state.genres[filterParams.type]" :key="key" :value="key">{{value}}</option> -->
      <!-- </select> -->
      <!-- <select id="sortby" v-model="filterParams.sort"> -->
        <!-- <option value="popularity.desc">Popularita ↓</option> -->
        <!-- <option value="popularity.asc">Popularita ↑</option> -->
        <!-- <option value="release_date.desc">Dátum vydania ↓</option> -->
        <!-- <option value="release_date.asc">Dátum vydania ↑</option> -->
        <!-- <option value="revenue.desc">Tržby ↓</option> -->
        <!-- <option value="revenue.asc">Tržby ↑</option> -->
      <!-- </select> -->
      <SelectOption :options="titleTypes" v-model="filterParams.type" />
      <SelectOption :options="store.state.genres[filterParams.type]" v-model="filterParams.genre" />
      <SelectOption :options="sortTypes" v-model="filterParams.sort" />
      <button @click="filter(filterParams.type, filterParams.sort, 1, filterParams.genre)" class="filter-button">
        <span class="label">Filter</span>
      </button>
    </section>
    <ItemPanel :placeholderData="{count: 8, type: 'title'}">
      <template #item>
        <Title v-for="title in titles" :key="title.id" :title="{ ...title, type: route.query.type || 'movie' }" />
        <NoResults v-if="titles.length === 0 && loaded === true" />
      </template>
    </ItemPanel>
    <PageControl v-if="titles.length !== 0" @navigate="navigate" :pages="{ current: filterParams.page, total: totalPages }"/>
  </main>
</template>

<script setup>
import { ref, inject, computed, onBeforeMount, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import SelectOption from '../components/SelectOption.vue'
import Title from '../components/Search/Title.vue'
import TitleB from '../components/Content/Title.vue'
import NoResults from '../components/NoResults.vue'
import ItemPanel from '../components/Content/ItemPanel.vue'
import PageControl from '../components/PageControl.vue'
import getData from '../api/main.js'

const route = useRoute()
const router = useRouter()
const store = inject('store')

const titleTypes = new Map()
.set('movie', 'Filmy')
.set('tv', 'Seriály')

const sortTypes = new Map()
.set('popularity.desc', 'Popularita ↓')
.set('popularity.asc', 'Popularita ↑')
.set('release_date.desc', 'Dátum vydania ↓')
.set('release_date.asc', 'Dátum vydania ↑')
.set('revenue.desc', 'Tržby ↓')
.set('revenue.asc', 'Tržby ↑')

const filterParams = reactive({
  type: route.query.type || 'movie',
  genre: parseInt(route.query.genre) || 28,
  sort: route.query.sort || 'popularity.desc',
  page: 1
})

const totalPages = ref(null)
const titles = ref([])

const loaded = ref(false)

const url = computed(() => {
  return `/discover/${route.query.type || 'movie'}?sort=${route.query.sort || 'popularity.desc'}&page=${route.query.page || 1}&genre=${route.query.genre || 28}`
})

const fetchTitles = async(url) => {
  try {
    const data = await getData({ endpoint: url })

    titles.value = titles.value.concat(data.results.filter(title => title.poster_path))
    totalPages.value = data.total_pages
    filterParams.page = data.page

    loaded.value = true
  }
  catch (error) { router.push({ name: 'NotFound' }) }
}

const filter = (type, sort, page, genre) => { router.push({ name: 'Library', query: { type, sort, genre, page } }) }

const navigate = pageNumber => { router.push({ name: 'Library', query: { ...route.query, page: pageNumber } }) }

onBeforeMount(() => { fetchTitles(url.value) })

const changeType = () => filterParams.genre = store.state.genres[type.value].entries().next().value[0]
</script>

<style lang="scss" scoped>
main{
  display:flex;
  flex-direction:column;
}
section.filter{
  background-color:var(--background-color);
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  gap:1rem;
  position:sticky;
  top:calc(var(--nav-height) - 1px);
  padding-top:1rem;
  padding-bottom:1rem;
  z-index:5;
  select{
    padding:0.5rem;
    border:none;
    font-weight:bold;
    font-size:0.8rem;
    outline:none;
    border-radius:0.5rem;
    cursor:pointer;
    transition:0.2s ease background;
    background-color:var(--card-color);
    color:inherit;
    option{color:inherit;}
    &:hover{ background:var(--card-color-hover) }
  }
  button.filter-button{
    background:var(--theme-color);
    color:white;
    font-weight:700;
    text-transform:uppercase;
    padding:0.5rem;
    border-radius:0.5rem;
    font-size:0.75rem;
    font-family:monospace,'Roboto Mono';
  }
  &>*{
    flex:1;
    height:32px;
  }
}
</style>
