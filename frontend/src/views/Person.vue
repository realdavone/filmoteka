<template>
  <PersonProfile>
    <template #details>
      <PersonDetails
      v-if="!loading"
      :person="{
        name: result!.name,
        biography: result!.biography,
        profile_path: result!.profile_path,
        birthday: result!.birthday,
        place_of_birth: result!.place_of_birth,
        deathday: result!.deathday,
        external_ids: result!.external_ids,
        id: result!.id,
        imdb_id: result!.imdb_id
      }"
      />
    </template>

    <template #filmography>
      <div v-if="!loading" class="flex-column">
        <section class="selectors">
          <div class="primary">
            <button v-font:medium @click="selector.type = 'movie'" :data-active="selector.type === 'movie'">Filmy</button>
            <button v-font:medium @click="selector.type = 'tv'" :data-active="selector.type === 'tv'">TV</button>
          </div>
          <div class="secondary">
            <button v-font:medium @click="selector.role = 'cast'" :data-active="selector.role === 'cast'">Herectvo</button>
            <button v-font:medium @click="selector.role = 'crew'" :data-active="selector.role === 'crew'">Tvorba</button>
          </div>
        </section>
        <Filmography
        :items="([
          ...result!.movie_credits.cast.map(title => Object.assign(title, { media_type: 'movie', job_type: 'cast' })),
          ...result!.movie_credits.crew.map(title => Object.assign(title, { media_type: 'movie', job_type: 'crew' })),
          ...result!.tv_credits.cast.map(title => Object.assign(title, { media_type: 'tv', job_type: 'cast' })),
          ...result!.tv_credits.crew.map(title => Object.assign(title, { media_type: 'tv', job_type: 'crew' }))
          ] as [])"
          :filter="selector"
        />
      </div>
    </template>
  </PersonProfile>
</template>

<script setup lang="ts">
import PersonDetails from '../components/Person/PersonDetails.vue'
import PersonProfile from '../components/Person/PersonProfile.vue'
import Filmography from '../components/Person/Filmography.vue'

import { ref, reactive, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import getData from '../api/main'

import { Person } from '../types/person'

const route = useRoute()
const router = useRouter()
const result = ref<null | Person>(null)
const loading = ref(true)

const selector = reactive<{
  type: 'movie' | 'tv'
  role: 'cast' | 'crew'
}>({ type: 'movie', role: 'cast' })

const fetchData = async (id: string) => {
  try {
    result.value = await getData({ endpoint: `/person/${id}` })

    loading.value = false    
    document.title = `${result.value!.name} / Filmotéka`
  } catch (error) { router.push({ name: 'NotFound' }) }
}

onBeforeMount(() => { fetchData(route.params.id as string) })
</script>

<style lang="scss" scoped>
section.selectors{
  display:flex;
  flex-direction:column;
  gap:0.5rem;
  div.primary{
    button {
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