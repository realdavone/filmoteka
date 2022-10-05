<template>
  <section class="title-holder user-select-none">
    <section class="left-col">
      <header>Filmy</header>
      <ItemPanel :placeholderData="{count:3,type:'title'}">
        <template #item>
          <Title v-for="movie in movies" :key="movie.id" :title="movie.title" :img="movie.poster_path" :release="movie.release_date" :overview="movie.overview" :id="movie.id" :type="'movie'" :rating="movie.vote_average"/>
          <router-link v-if="loaded" :to="{ path:'/search/movie', query:{ q: route.query.q, page: 1 } }" class="show-more user-select-none">
            <span>Zobraziť filmy</span>
            <span class="material-symbols-outlined">chevron_right</span>
          </router-link>
        </template>
      </ItemPanel>
      <header>Seriály</header>
      <ItemPanel :placeholderData="{count:3,type:'title'}">
        <template #item>
          <Title v-for="tv in tvs" :key="tv.id" :title="tv.name" :originalTitle="tv.original_name" :img="tv.poster_path" :release="tv.first_air_date" :overview="tv.overview" :id="tv.id" :type="'tv'" :rating="tv.vote_average"/>
          <router-link v-if="loaded" :to="{ path:'/search/tv', query:{ q: route.query.q, page: 1 } }" class="show-more user-select-none">
            <span>Zobraziť seriály</span>
            <span class="material-symbols-outlined">chevron_right</span>
          </router-link>
        </template>
      </ItemPanel>      
    </section>
    <section class="right-col">
      <header>Osoby</header>
      <ItemPanel :placeholderData="{count:4,type:'person'}">
        <template #item>
          <Person v-for="person in people" :key="person.id" :name="person.name" :img="person.profile_path" :id="person.id" :knownFor="person['known_for']" />
          <router-link v-if="loaded" :to="{ path:'/search/person', query:{ q: route.query.q, page: 1 } }" class="show-more user-select-none">
            <span>Zobraziť osoby</span>
            <span class="material-symbols-outlined">chevron_right</span>
          </router-link>
        </template>
      </ItemPanel>
    </section>
  </section>
</template>

<script setup>
import Title from '../../components/Search/Title.vue'
import Person from '../../components/Search/Person.vue'
import ItemPanel from '../../components/Content/ItemPanel.vue'

import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import getData from '../../api/main.js'

const route = useRoute()
const router = useRouter()

const movies = ref(null)
const tvs = ref(null)
const people = ref(null)
const loaded = ref(false)

const getResults = async (query) => {
  try {
    const data = await getData({ endpoint: `/search/multi?query=${query}` })

    movies.value = data.results.filter(title => title['media_type'] === 'movie' && title['poster_path'] !== null).slice(0,3)
    tvs.value = data.results.filter(title => title['media_type'] === 'tv' && title['poster_path'] !== null).slice(0,3)
    people.value = data.results.filter(title => title['media_type'] === 'person' && title['profile_path'] !== null).slice(0,4)

    loaded.value = true
  } catch (error) { router.push({ name: 'NotFound' }) }
}

onBeforeMount(() => { getResults(route.query.q) })
</script>

<style lang="scss" scoped>
section.title-holder{
  display:flex;
  flex-direction:row;
  gap:20px;
  header{
    background:var(--card-color-hover);
    padding:8px 12px;
    border-radius:8px;
    font-weight:900;
    font-size:1rem;
    color:var(--theme-color);
    font-family: 'Oswald', sans-serif;
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