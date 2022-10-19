<template>
  <main class="container wrapper">
    <TitleB style="margin-bottom:0">Knižnica</TitleB>
    <section class="filter">
      <select id="type" v-model="filterParams.type" @change="changeType()">
        <option value="movie">Filmy</option>
        <option value="tv">TV</option>
      </select>
      <select id="genres" v-model="filterParams.genre">
        <option v-for="[key, value] in store.state.genres[filterParams.type]" :key="key" :value="key">{{value}}</option>
      </select>
      <select id="sortby" v-model="filterParams.sort">
        <option value="popularity.desc">Popularita ↓</option>
        <option value="popularity.asc">Popularita ↑</option>
        <option value="release_date.desc">Dátum vydania ↓</option>
        <option value="release_date.asc">Dátum vydania ↑</option>
        <option value="revenue.desc">Tržby ↓</option>
        <option value="revenue.asc">Tržby ↑</option>
      </select>
      <button @click="filter(filterParams.type, filterParams.sort, 1, filterParams.genre)" class="filter-button">
        <span class="label">Filter</span>
        <span class="material-symbols-outlined" style="font-size:1.25rem">filter_alt</span>
      </button>
    </section>
    <ItemPanel :placeholderData="{count:4, type:'title'}">
      <template #item>
        <Title v-for="title in titles" :key="title.id" :title="title.title || title.name" :img="title.poster_path" :release="title.release_date || title.first_air_date" :overview="title.overview" :id="title.id" :type="filterParams.type" :rating="title.vote_average" />
        <NoResults v-if="titles.length === 0 && loaded === true" />
      </template>
    </ItemPanel>
    <section v-if="titles.length !==0 " class="page-control">
      <button :class="{ 'disabled': parseInt(filterParams.page) === 1 }" :disabled="parseInt(filterParams.page) === 1" @click="navigatePages(parseInt(filterParams.page) - 1)" class="arrow-button">
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
      <span class="current-page">{{filterParams.page}}</span>
      <button :class="{ 'disabled': parseInt(filterParams.page) === parseInt(totalPages) }" :disabled="parseInt(filterParams.page) === parseInt(totalPages)" class="arrow-button" @click="navigatePages(parseInt(filterParams.page) + 1)">
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
    </section>
  </main>
</template>

<script setup>
import { ref, inject, computed, onBeforeMount, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Title from '../components/Search/Title.vue'
import TitleB from '../components/Content/Title.vue'
import NoResults from '../components/NoResults.vue'
import ItemPanel from '../components/Content/ItemPanel.vue'
import getData from '../api/main.js'

const route = useRoute()
const router = useRouter()
const store = inject('store')

const filterParams = reactive({
  type: route.query.type || 'movie',
  genre : route.query.genre || 28,
  sort: route.query.sort || 'popularity.desc',
  page: 1
})

const totalPages = ref()
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

    console.log(titles.value)

    loaded.value = true
  }
  catch (error) { router.push({ name: 'NotFound' }) }
}

const filter = (type, sort, page, genre) => { router.push({ name: 'Library', query: { type, sort, genre, page } }) }

const navigatePages = (pageNum) => {
  const currentQuery = route.query;
  const newQuery = { ...currentQuery, page: pageNum };
  
  router.push({ name: 'Library', query: newQuery })
}

onBeforeMount(() => { fetchTitles(url.value) })

const changeType = () => { filterParams.genre = store.state.genres[type.value].entries().next().value[0] }
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
  gap:10px;
  position:sticky;
  top:var(--nav-height);
  padding-top:var(--container-padding);
  padding-bottom:var(--container-padding);
  select{
    padding:8px;
    border:none;
    font-weight:bold;
    font-size:0.8rem;
    outline:none;
    border-radius:5px;
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
    padding:8px;
    border-radius:6px;
    font-size:0.9rem;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:6px;
    font-family: 'Oswald', sans-serif;
  }
  &>*{
    flex:1;
    height:32px;
  }
}
section.page-control{
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:var(--container-padding);
  span.current-page{
    display:inline-block;
    text-align:center;
    font-size:1.25rem;
    width:40px;
    font-weight:900;
  }
  button.arrow-button{
    background:var(--card-color);
    width:40px;
    height:30px;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    border-radius:8px;
  }
  button.arrow-button.disabled{
    cursor:default;
    background:transparent;
    opacity:0.5;
  }
}
</style>