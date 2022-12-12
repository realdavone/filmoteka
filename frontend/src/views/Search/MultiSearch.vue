<template>
  <section class="title-holder user-select-none">
    <section class="left-col">
      <header>Filmy</header>
      <ItemPanel :placeholderData="{ count: 3, type: 'title' }">
        <template #item>
          <Title v-for="movie in results.movies" :key="movie.id" :title="{...movie, media_type: 'movie'}" />
          <router-link v-if="loaded" :to="{ path:'/search/movie', query:{ q: route.query.q, page: 1 } }" class="show-more">
            <span>Zobraziť filmy</span>
            &#10095;
          </router-link>
        </template>
      </ItemPanel>
      <header>Seriály</header>
      <ItemPanel :placeholderData="{ count: 3, type: 'title' }">
        <template #item>
          <Title v-for="tv in results.tvs" :key="tv.id" :title="{...tv, media_type: 'tv'}" />
          <router-link v-if="loaded" :to="{ path:'/search/tv', query:{ q: route.query.q, page: 1 } }" class="show-more">
            <span>Zobraziť seriály</span>
            &#10095;
          </router-link>
        </template>
      </ItemPanel>      
    </section>
    <section class="right-col">
      <header>Osoby</header>
      <ItemPanel :placeholderData="{ count: 4,type: 'person' }">
        <template #item>
          <Person v-for="person in results.people" :key="person.id" :person="person" />
          <router-link v-if="loaded" :to="{ path:'/search/person', query:{ q: route.query.q, page: 1 } }" class="show-more">
            <span>Zobraziť osoby</span>
            &#10095;
          </router-link>
        </template>
      </ItemPanel>
    </section>
  </section>
</template>

<script setup lang="ts">
import Title from '../../components/Search/Title.vue'
import Person from '../../components/Search/Person.vue'
import ItemPanel from '../../components/Content/ItemPanel.vue'

import getData from '../../api/main.js'

import { onBeforeMount, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { TvTitle, MovieTitle } from '../../types/title'
import { PersonSearchType } from '../../types/person'
import { ApiListResponse } from '../../types/response'

const route = useRoute()
const router = useRouter()

const results = reactive<{
  movies: MovieTitle[]
  tvs: TvTitle[]
  people: PersonSearchType[]
}>({
  movies: [],
  tvs: [],
  people: []
})

const loaded = ref(false)

const getResults = async (query: string): Promise<void> => {
  try {
    const data: ApiListResponse<Array<MovieTitle | TvTitle | PersonSearchType>> = await getData({ endpoint: `/search/multi?query=${query}`, options: undefined })

    results.movies = data.results.filter(movie => movie['media_type'] === 'movie' && movie['poster_path'] !== null).slice(0,3) as MovieTitle[]
    results.tvs = data.results.filter(tv => tv['media_type'] === 'tv' && tv['poster_path'] !== null).slice(0,3) as TvTitle[]
    results.people = data.results.filter(person => person['media_type'] === 'person' && person['profile_path'] !== null).slice(0,4) as PersonSearchType[]

    loaded.value = true
  } catch (error) { router.push({ name: 'NotFound' }) }
}

onBeforeMount(() => { getResults(route.query.q as string) })
</script>

<style lang="scss" scoped>
section.title-holder{
  display:flex;
  flex-direction:row;
  gap:1rem;
  header{
    font-weight:900;
    font-size:1rem;
  }
  a.show-more{
    color:var(--theme-color);
    font-size:0.8rem;
    align-self:flex-end;
    display:flex;
    align-items:center;
    gap:5px;
    span:nth-child(1){ font-weight:700; }
    span:nth-child(2){ font-size:1rem; }
  }
  section.right-col, section.left-col{
    display:flex;
    flex-direction:column;
    gap:20px;
  }
  section.right-col{width:500px;}
  section.left-col{width:100%;}
}
@media screen and (max-width: 800px){
  section.title-holder{ flex-direction:column!important; }
  section.right-col{width:100%!important;}
}
@media screen and (max-width: 600px){
  section.title-holder{gap:var(--container-padding)!important}
  section.right-col, section.left-col{gap:var(--container-padding)!important}
}
</style>