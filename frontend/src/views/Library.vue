<template>
  <main class="container wrapper">
    <Title style="margin-bottom:0">Knižnica</Title>
    <div class="filter" v-auto-animate>
      <button
        @click="filterVisible = !filterVisible"
        :class="`${filterVisible && 'active'} toggle-filter-button`"
      >
        <span>Filter</span>
        <span class="material-icons-outlined">tune</span>
      </button>
      <fieldset v-if="filterVisible" class="filter">
        <SelectOption
          v-model="filterParams.type"
          @update:modelValue="typeChange"
          :options="titleTypes"
        />
        <SelectOption
          v-model="filterParams.genre"
          :options="store.state.genres[filterParams.type]"
        />
        <SelectOption
          v-model="filterParams.sort"
          :options="sortTypes" />
        <button
          @click="filter(filterParams.type, filterParams.sort, 1, filterParams.genre)"
          class="filter-button"
        ><span class="label">Filter</span></button>
      </fieldset>
    </div>
    <ItemPanel type="title" :placeholderData="{count: 8 }" :items="titles" />
    <NoResults v-if="loaded && !titles?.length" />
    <PageControl v-if="titles?.length" @navigate="navigate" :pages="{ current: filterParams.page, total: totalPages }"/>
  </main>
</template>

<script setup lang="ts">
import { ref, inject, onBeforeMount, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import SelectOption from '../components/SelectOption.vue'
import Title from '../components/Content/Title.vue'
import ItemPanel from '../components/Content/ItemPanel.vue'
import PageControl from '../components/PageControl.vue'
import NoResults from '../components/NoResults.vue'

import getData from '../api/main'

import { Title as TitleType } from '../types/title'
import { ApiListResponse } from '../types/response'

const route = useRoute()
const router = useRouter()
const store = inject<any>('store')

const titleTypes = new Map()
.set('movie', 'Filmy')
.set('tv', 'Seriály')

const sortTypes = new Map()
.set('popularity.desc', 'Popularita ↓')
.set('popularity.asc', 'Popularita ↑')
.set('release_date.desc', 'Vydanie ↓')
.set('release_date.asc', 'Vydanie ↑')
.set('revenue.desc', 'Tržby ↓')
.set('revenue.asc', 'Tržby ↑')

interface Filter {
  type: 'movie' | 'tv'
  genre: number
  sort: string
  page: number
}

const filterParams = reactive<Filter>({
  type: route.query.type as Filter['type'] || 'movie',
  genre: route.query.genre ? parseInt(route.query.genre as string) : 28,
  sort: route.query.sort as string || 'popularity.desc',
  page: 1
})

const totalPages = ref<number>(1)
const titles = ref<TitleType[] | null>(null)
const filterVisible = ref(false)

const loaded = ref(false)

const typeChange = (newType: string): void => {
  !store.state.genres[newType].has(filterParams.genre) && (filterParams.genre = store.state.genres[filterParams.type].entries().next().value[0])
}

const fetchTitles = (url: string): void => {
  getData<ApiListResponse<TitleType[]>>({ endpoint: url })
  .then(data => {
    const mapped = data.results.filter(title => title.poster_path).map(title => {
      return { ...title, media_type: filterParams.type }
    })

    titles.value = mapped as []

    totalPages.value = data.total_pages
    filterParams.page = data.page
  })
  .catch(() => router.push({ name: 'NotFound' }))
  .finally(() => loaded.value = true)
}

const filter = (type: Filter['type'], sort: Filter['sort'], page: Filter['page'], genre: Filter['genre']): void => { router.push({ name: 'Library', query: { type, sort, genre, page } }) }

const navigate = (page: number): void => { router.push({ name: 'Library', query: { ...route.query, page } }) }

onBeforeMount(() => { fetchTitles(`/discover/${route.query.type || 'movie'}?sort=${route.query.sort || 'popularity.desc'}&page=${route.query.page || 1}&genre=${route.query.genre || 28}`) })
</script>

<style lang="scss" scoped>
main{
  display:flex;
  flex-direction:column;
  gap: 15px;
}
button.toggle-filter-button{
  display:flex;
  align-items:center;
  gap: 8px;
  align-self:flex-start;
  padding: 4px 8px;
  border-radius: 4px;
  background-color:var(--card-color);
  transition:0.2s ease background-color;
  &.active{
    background-color:var(--theme-color);
    color:white;
  }
  &:hover:not(.active){
    background-color:var(--card-color-hover);
  }
}
div.filter{
  display:flex;
  flex-direction:column;
  gap: 15px;
}
fieldset.filter{
  all: unset;
  background-color:var(--background-color);
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  gap: 15px;
  button.filter-button{
    background:var(--theme-color);
    color:white;
    text-transform:uppercase;
    padding: 8px;
    border-radius: 4px;
  }
  &>*{
    flex:1;
    height:32px;
  }
}
</style>
