<template>
  <section class="title-holder user-select-none">
    <section class="left-col">
      <header>
        <span class="material-icons">movie</span>
        <span class="label">Filmy</span>
      </header>
      <ItemPanel type="title" :placeholderData="{ count: 3 }" :items="result.movies" />
      <router-link v-if="loaded" :to="`/search/movie?q=${route.query.q}&page=1`" class="show-more">Zobraziť filmy</router-link>
      <header>
        <span class="material-icons">tv</span>
        <span class="label">Seriály</span>
      </header>
      <ItemPanel type="title" :placeholderData="{ count: 3 }" :items="result.tvs" />
      <router-link v-if="loaded" :to="`/search/tv?q=${route.query.q}&page=1`" class="show-more">Zobraziť seriály</router-link>
    </section>
    <section class="right-col">
      <header>
        <span class="material-icons">person</span>
        <span class="label">Osoby</span>
      </header>
      <ItemPanel type="person" :placeholderData="{ count: 4 }" :items="result.people" />
      <router-link v-if="loaded" :to="`/search/person?q=${route.query.q}&page=1`" class="show-more">Zobraziť osoby</router-link>
    </section>
  </section>
</template>

<script setup lang="ts">
import ItemPanel from '../../components/Content/ItemPanel.vue'

import getData from '../../api/main'

import { onBeforeMount, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { TvTitle, MovieTitle } from '../../types/title'
import { PersonSearchType } from '../../types/person'
import { ApiListResponse } from '../../types/response'

const route = useRoute()
const router = useRouter()

const result = reactive<{
  movies: MovieTitle[] | null
  tvs: TvTitle[] | null
  people: PersonSearchType[] | null
}>({
  movies: null,
  tvs: null,
  people: null
})

const loaded = ref(false)

const getResults = async (query: string): Promise<void> => {
  try {
    const data: ApiListResponse<Array<MovieTitle | TvTitle | PersonSearchType>> = await getData({ endpoint: `/search/multi?query=${query}&page=1` })

    result.movies = data.results.filter(movie => movie['media_type'] === 'movie' && movie['poster_path'] !== null).slice(0,3) as MovieTitle[]
    result.tvs = data.results.filter(tv => tv['media_type'] === 'tv' && tv['poster_path'] !== null).slice(0,3) as TvTitle[]
    result.people = data.results.filter(person => person['media_type'] === 'person' && person['profile_path'] !== null).slice(0,4) as PersonSearchType[]

    loaded.value = true
  } catch (error) { router.push({ name: 'NotFound' }) }
}

onBeforeMount(() => getResults(route.query.q as string))
</script>

<style lang="scss" scoped>
section.title-holder{
  display:flex;
  flex-direction:row;
  gap:1rem;

  header{
    font-weight:900;
    font-size:1rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  a.show-more{
    color:var(--theme-color);
    font-size:0.8rem;
    align-self:flex-end;
    display:flex;
    align-items:center;
    gap:5px;
    font-weight:700;

    &:hover{
      text-decoration: underline;
    }
  }
  section.right-col, section.left-col{
    display:flex;
    flex-direction:column;
    gap:1rem;
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