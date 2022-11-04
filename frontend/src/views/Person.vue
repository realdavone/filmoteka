<template>
  <PersonProfile>
    <template #details>
      <PersonDetails
      v-if="!loading"
      :name="result.name"
      :biography="result.biography"
      :img="result.profile_path"
      :birthday="result.birthday"
      :deathday="result.deathday"
      :placeOfBirth="result.place_of_birth"
      :imdb="result.imdb_id"
      :id="route.params.id"
      :extId="result.external_ids"
      :imgs="result.images.profiles"
      />
    </template>

    <template #filmography>
      <div v-if="!loading" class="flex-column">
        <section class="selectors">
          <div class="primary">
            <button @click="selector.primary = 'movie'" :data-active="selector.primary === 'movie'">Filmy</button>
            <button @click="selector.primary = 'tv'" :data-active="selector.primary === 'tv'">TV</button>
          </div>
          <div class="secondary">
            <button @click="selector.secondary = 'cast'" :data-active="selector.secondary === 'cast'">Herectvo</button>
            <button @click="selector.secondary = 'crew'" :data-active="selector.secondary === 'crew'">Tvorba</button>
          </div>
        </section>
        <Filmography v-if="selector.primary === 'movie' && selector.secondary === 'cast'" :items="result.movie_credits.cast" :type="selector.primary" />
        <Filmography v-if="selector.primary === 'tv' && selector.secondary === 'cast'" :items="result.tv_credits.cast" :type="selector.primary" />
        <Filmography v-if="selector.primary === 'movie' && selector.secondary === 'crew'" :items="result.movie_credits.crew" :type="selector.primary" />
        <Filmography v-if="selector.primary === 'tv' && selector.secondary === 'crew'" :items="result.tv_credits.crew" :type="selector.primary" />
      </div>
    </template>
  </PersonProfile>

</template>

<script setup>
import PersonDetails from '../components/Person/PersonDetails.vue'
import PersonProfile from '../components/Person/PersonProfile.vue'
import Filmography from '../components/Person/Filmography.vue'

import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import getData from '../api/main.js'

const route = useRoute()
const router = useRouter()
const result = ref({})
const loading = ref(true)

const selector = ref({ primary: 'movie', secondary: 'cast' })

const fetchData = async id => {
  try {
    const data = await getData({ endpoint: `/person/${id}` })
    
    result.value = data
    document.title = `${result.value.name} / Filmotéka`
    loading.value = false
  } catch (error) { router.push({ name: 'NotFound' }) }
}

onBeforeMount(() => { fetchData(route.params.id) })
</script>

<style lang="scss" scoped>
section.selectors{
  display:flex;
  flex-direction:column;
  gap:0.5rem;
  div.primary{
    button {
      font-size:1.25rem;
      font-weight:900;
      padding:2px 0.5rem;
      border-radius:0.5rem;
      &[data-active=true]{
        background:var(--theme-color);
        color:white;
      }
    }
  }
  div.secondary{
    button {
      font-size:0.9rem;
      font-weight:700;
      padding:2px 8px;
      border-radius:6px;
      &[data-active=true]{
        background:var(--theme-color);
        color:white
      }
    }
  }
}
div.flex-column{
  display:flex;
  flex-direction:column;
  min-width:500px;
  max-width:500px;
  outline:2px solid var(--card-color);
  padding:var(--container-padding);
  border-radius:var(--container-padding);
}
@media screen and (max-width: 1200px){
  div.flex-column{
    min-width:initial;
    max-width:initial;
  }
}
</style>