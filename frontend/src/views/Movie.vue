<template>
  <main class="title">
    <PlayerDetails :bg="result?.backdrop_path">
      <template #poster>
        <Poster v-if="result?.poster_path" :src="result.poster_path" :alt="result?.title" :fadeInOnLoad="true" />
      </template>
      <template #feedback>
        <Feedback v-if="!loading && authStore.isLoggedIn && (new Date()) > new Date(result!.release_date)" :likes="result?.likes" :dislikes="result?.dislikes" :title="{ id: $route.params.id as string, type: 'movie' }"/>
        <div v-else style="display:none"></div>
      </template>
      <template #actionMenu>
        <ActionMenu>
          <template v-if="!loading">
            <ActionButton title="Skopírovať URL adresu" icon="copy" @handleClick="handleEvent('COPY_URL')" />
            <template v-if="authStore.isLoggedIn">
              <ActionButton title="Nahlásiť prehrávač" :loading="isPlayerWorking.isLoading" icon="report" :warning="!isPlayerWorking.value" @handleClick="handleEvent('TOGGLE_WORKING_PLAYER')" />
              <ActionButton title="Odporúčiť" :loading="isRecommended.isLoading"  icon="thumb_up" :disabled="isRecommended.value" @handleClick="handleEvent('ADD_RECOMMENDED')" />
              <ActionButton title="Označit ako prezrené" :success="watchedStore.exists({ type: 'Movie', id: route.params.id as string })" icon="visibility" @handleClick="handleEvent('TOGGLE_WATCHED')" />
              <ActionButton title="Pripnutie prehrávača" :success="localSettingsStore.localSettings.pinnedPlayer" icon="push_pin" @handleClick="handleEvent('TOGGLE_PINNED_PLAYER')" />
              <ActionButton title="Pridanie k záložkam" :success="favouritesStore.exists({ type: 'Movie', id: route.params.id as string })" icon="bookmark" @handleClick="handleEvent('TOGGLE_BOOKMARK')" />  
            </template>
          </template>
        </ActionMenu>
      </template>
      <template #title>
        <h1
          v-if="!loading"
          class="title"
          v-font:large
        >{{ result?.title }} <span v-if="result?.omdb.Year">({{result.omdb.Year}})</span>
        </h1>
      </template>
      <template #subtitle>
        <template v-if="!loading">
          <div class="under-title" v-font:small>
            <span class="rated">{{ !result?.omdb['Rated']||result?.omdb['Rated']==='N/A'?'Not Rated':result?.omdb['Rated'] }}</span>
            <span v-if="result?.title !== result?.original_title">{{ result?.original_title }}</span>
          </div>
        </template>
      </template>
      <template #tagline>
        <span v-font:small v-if="!loading" class="tagline">{{result?.tagline}}</span>
      </template>
      <template #genres>
        <div v-if="!loading" class="genres">
          <router-link
            v-font:small
            :to="`/library?type=${$route.name?.toString().toLowerCase()}&genre=${genre.id}`"
            :key="genre.id"
            v-for="genre in result?.genres"
          >{{ genre.name }}</router-link>    
        </div>
      </template>
      <template #overview>
        <span v-if="!loading" v-font:medium class="overview">{{result?.overview || 'Žiadny prehľad'}}</span>
      </template>
      <template #player>
        <MoviePlayerPanel
        v-if="!loading"
        :isPlayerWorking="isPlayerWorking.value"
        :id="(result?.imdb_id as string)"
        :isReleased="(new Date()) > new Date(result!.release_date)"
        />
      </template>
      <template #details>
        <Details v-if="!loading" :details="{
          status: result?.status,
          release_date: result?.release_date,
          revenue: result?.revenue,
          runtime: result?.runtime || undefined,
          languages: result?.spoken_languages,
          creators: _.sortCreators(result!.credits.crew.sort((a, b) => b['popularity'] - a['popularity']).slice(0, 5)),
          networks: result?.production_companies,
          ratings: [
            {
              name: 'TMDB',
              rating: result?.vote_average,
              url: `https://www.themoviedb.org/movie/${route.params.id}`
            },
            ...(result?.omdb['imdbRating'] ? [{
              name: 'IMDB',
              rating: result?.omdb['imdbRating'],
              url: `https://www.imdb.com/title/${result?.external_ids.imdb_id}`
            }] : []),
            ...(result?.omdb?.['Ratings'] && result?.omdb?.['Ratings'].find(rating => rating['Source'] === 'Rotten Tomatoes')?.['Value'] ? [{
              name: 'Rotten Tomatoes',
              rating: result?.omdb?.['Ratings'].find(rating => rating['Source'] === 'Rotten Tomatoes')?.['Value'],
              url: null
            }] : []),
            ...(result?.omdb?.['Ratings'] && result?.omdb?.['Ratings'].find(rating => rating['Source'] === 'Metacritic')?.['Value'] ? [{
              name: 'Metascore',
              rating: result?.omdb?.['Ratings'].find(rating => rating['Source'] === 'Metacritic')?.['Value'],
              url: null
            }]: [])
          ]
        }" />
      </template>
      <template #countries>
        <img
          v-for="country in result?.production_countries"
          :key="country.iso_3166_1"
          :src="`https://flagcdn.com/${country.iso_3166_1.toLowerCase()}.svg`"
          width="30"
          :alt="country.name"
          draggable="false"
          :title="country.name"
        />
      </template>
    </PlayerDetails>
    <template v-if="!loading">
      <Discussion
        v-if="authStore.isLoggedIn && $route.params.id"
        :title="{ type: 'movie', id: $route.params.id as string }"
      />
      <Collection
        v-once
        v-if="result?.belongs_to_collection"
        :collection="result.belongs_to_collection"
      />
      <CastPanel
        heading="Herci"
        :cast="result?.credits.cast.filter(castMember => castMember.profile_path !== null).splice(0, 16).map(member => ({
          character: member.character,
          id: member.id,
          name: member.name,
          profile_path: member.profile_path
        }))"
      />
      <CardPanel
        heading="Podobné"
        :cards="result!.recommendations.results.filter(movie => movie.poster_path !== null).splice(0, 16).map(card => ({
          media_type: 'movie',
          id: card.id,
          poster_path: card.poster_path,
          title: card.title
        }))"
        :placeholderInfo="{ type: 'title', count: 8 }"
      />
    </template>
  </main>
</template>

<script setup lang="ts">
import getData from '../api/main'
import _ from '../utils/main'
import useTitle from '../composables/title'

import { ref, reactive, onBeforeMount, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { notify } from "@kyvg/vue3-notification"

import Details from '../components/Content/Details.vue'
import CardPanel from '../components/Content/CardPanel.vue'
import CastPanel from '../components/Content/CastPanel.vue'
import MoviePlayerPanel from '../components/Movie/MoviePlayerPanel.vue'
import Collection from '../components/Movie/Collection.vue'
import ActionMenu from '../components/ActionMenu.vue'
import PlayerDetails from '../components/Content/PlayerDetails.vue'
import ActionButton from '../components/Buttons/ActionButton.vue'
import Feedback from '../components/Content/Feedback.vue'
import Discussion from '../components/Content/Discussion.vue'
import Poster from '../components/Content/Poster.vue'

import { FullMovieType, MovieTitleTranslation } from '../types/title'
import { RecommendedResponse, WorkingPlayerResponse } from '../types/response'

import { useFavouritesStore } from '../store/favourites'
import { useWatchedStore } from '../store/watched'
import { useLocalSettingsStore } from '../store/local-settings'
import { useRecentTitlesStore } from '../store/recent-items'
import { useAuthStore } from '../store/auth'

const favouritesStore = useFavouritesStore()
const watchedStore = useWatchedStore()
const localSettingsStore = useLocalSettingsStore()
const recentTitlesStore = useRecentTitlesStore()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const result = ref<null | FullMovieType>(null)
const loading = ref(true)

const isRecommended = reactive({
  isLoading: false,
  value: false
})

const isPlayerWorking = reactive({
  isLoading: false,
  value: true
})

const fetchData = async (id: string) => {
  try {
    result.value = await getData<FullMovieType>({ endpoint: `/title/find/movie/${id}` })
        
    const translations = _.getTranslations<MovieTitleTranslation>(result.value.translations.translations, 'iso_639_1', ['sk', 'cs', 'en'])

    result.value = {
      ...result.value,
      title: translations?.data.title || result.value.title,
      overview: translations?.data.overview || result.value.overview,
      tagline: translations?.data.tagline || result.value.tagline
    }

    isPlayerWorking.value = result.value.isPlayerWorking ?? true
    isRecommended.value = result.value.isRecommended ?? false

    recentTitlesStore.addItem({
      type: 'Movie',
      title: result.value.title,
      id: +route.params.id,
      poster: result.value.poster_path as string
    })

    useTitle({ title: `${result.value?.title}${result.value?.omdb.Year ? (' (' + result.value?.omdb.Year + ')') : ''}` })
    loading.value = false 
  } catch (error) {
    router.push({ name: 'NotFound' })
  }
}

const handleEvent = async (event: 'ADD_RECOMMENDED' | 'TOGGLE_WORKING_PLAYER' | 'COPY_URL' | 'TOGGLE_WATCHED' | 'TOGGLE_PINNED_PLAYER' | 'TOGGLE_BOOKMARK'): Promise<void> => {
  let notifyPayload: null | {
    type: 'success' | 'warn' | 'error',
    text: string
  } = null

  switch(event) {
    case 'ADD_RECOMMENDED': {
      try {
        isRecommended.isLoading = true
        const res = await getData<RecommendedResponse>({
          endpoint: '/title/recommend',
          options: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'access-token': authStore.accessToken },
            body: JSON.stringify({ id: result.value?.id, img: result.value?.poster_path, type: route.name, savedTitle: result.value?.title })
          }
        })
        if(res.success) {
          notifyPayload = { type: 'success', text: 'Úspešne pridané do odporúčaných' }
          isRecommended.value = true
        }
      } catch (error) { console.log(error) }
      finally{
        isRecommended.isLoading = false
        break
      }
    }
    case 'TOGGLE_WORKING_PLAYER': {
      try {
        isPlayerWorking.isLoading = true
        const data = await getData<WorkingPlayerResponse>({ 
          endpoint: `/title/non-working/`,
          options: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'access-token': authStore.accessToken },
            body: JSON.stringify({ id: route.params.id, img: result.value?.poster_path, type: route.name, title: result.value?.title })
          }
        })

        isPlayerWorking.value = data.isPlayerWorking

        if(!data.isPlayerWorking) {
          notifyPayload = { type: 'error', text: 'Prehrávač označený ako nefunkčný' }
        }
        else { 
          notifyPayload = { type: 'success', text: 'Prehrávač označený ako funkčný' }
        }       
      } catch (error) { console.log(error) }
      finally{
        isPlayerWorking.isLoading = false
        break
      }
    }
    case 'COPY_URL': {
      const nav = navigator
      const win = window
      nav.clipboard.writeText(win.location.href)
      notifyPayload = { type: 'warn', text: 'URL adresa bola skopírovaná' }
      break
    }
    case 'TOGGLE_WATCHED': {
      watchedStore.toggle({
        id: route.params.id.toString(),
        type: 'Movie',
        title: result.value?.title as string
      })
      break
    }
    case 'TOGGLE_PINNED_PLAYER': {
      localSettingsStore.togglePinnedPlayer()
      break
    }
    case 'TOGGLE_BOOKMARK': {
      favouritesStore.toggle({
        id: route.params.id as string,
        img: result.value?.poster_path as string,
        type: 'Movie',
        title: result.value?.title as string
      })
      break
    }
  }
  notifyPayload && notify(notifyPayload)
}

onBeforeMount(() => fetchData(route.params.id as string))
onActivated(() => {
  if(result.value) 
    useTitle({ title: `${result.value?.title}${result.value?.omdb.Year !== undefined ? (' (' + result.value?.omdb.Year + ')') : ''}` })
})
</script>
