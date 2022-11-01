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
            <button @click="selector.primary = 'Filmy'" :data-active="selector.primary === 'Filmy'">Filmy</button>
            <button @click="selector.primary = 'TV'" :data-active="selector.primary === 'TV'">TV</button>
          </div>
          <div class="secondary">
            <button @click="selector.secondary = 'Herectvo'" :data-active="selector.secondary === 'Herectvo'">Herectvo</button>
            <button @click="selector.secondary = 'Tvorba'" :data-active="selector.secondary === 'Tvorba'">Tvorba</button>
          </div>
        </section>
        <Filmography v-if="selector.primary === 'Filmy' && selector.secondary === 'Herectvo'" :items="result.movie_credits.cast" :type="'movie'" />
        <Filmography v-if="selector.primary === 'TV' && selector.secondary === 'Herectvo'" :items="result.tv_credits.cast" :type="'tv'" />
        <Filmography v-if="selector.primary === 'Filmy' && selector.secondary === 'Tvorba'" :items="result.movie_credits.crew" :type="'movie'" />
        <Filmography v-if="selector.primary === 'TV' && selector.secondary === 'Tvorba'" :items="result.tv_credits.crew" :type="'tv'" />
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

const selector = ref({ primary: 'Filmy', secondary: 'Herectvo' })

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
    gap:10px;
    div.primary{
      button {
        font-size:1.25rem;
        font-weight:900;
        padding:2px 8px;
        border-radius:6px;
        &[data-active=true]{
          background:var(--theme-color);
          color:white
        }
      }
    }
    div.secondary{
      button {
        font-size:0.95rem;
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
    min-width:450px;
    max-width:450px;
  }
  @media screen and (max-width: 1200px){
    div.flex-column{
      min-width:initial;
      max-width:initial;
    }
  }
</style>