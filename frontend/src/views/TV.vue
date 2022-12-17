<template>
  <main class="title">
    <PlayerDetails :bg="result?.backdrop_path">
      <template #poster>
        <Poster v-if="result?.poster_path" :src="result.poster_path" :alt="result?.name" :fadeInOnLoad="true" />
      </template>
      <template #feedback>
        <Feedback v-if="!loading && store.state.credentials.loggedIn && (new Date()) > new Date(result!.first_air_date)" :likes="result?.likes" :dislikes="result?.dislikes" :title="{ id: $route.params.id as string, type: 'tv' }"/>
      </template>
      <template #actionMenu>
        <ActionMenu>
          <template v-if="!loading">
            <ActionButton title="Skopírovať URL adresu" @handleClick="handleEvent('COPY_URL')" icon="link" />
            <template v-if="store.state.credentials.loggedIn">
              <ActionButton title="Nahlásiť prehrávač" :loading="isPlayerWorking.isLoading" icon="report_problem" :warning="!isPlayerWorking.value" @handleClick="handleEvent('TOGGLE_WORKING_PLAYER')" />
              <ActionButton title="Odporúčiť" :loading="isRecommended.isLoading"  icon="thumb_up" :disabled="isRecommended.value" @handleClick="handleEvent('ADD_RECOMMENDED')" />
              <ActionButton title="Označit ako prezrené" :success="store.methods.watched.exists({ type: route.name, id: route.params.id })" icon="visibility" @handleClick="handleEvent('TOGGLE_WATCHED')" />
              <ActionButton title="Pripnutie prehrávača" :success="store.state.settings.pinnedPlayer" icon="push_pin" @handleClick="handleEvent('TOGGLE_PINNED_PLAYER')" />
              <ActionButton title="Pridanie k záložkam" :success="store.methods.favourites.exists({ type: route.name, id: route.params.id })" icon="bookmark" @handleClick="handleEvent('TOGGLE_BOOKMARK')" />  
            </template>
          </template>
        </ActionMenu>
      </template>
      <template #title>
        <span v-if="!loading" class="title">{{result?.name}}</span>
      </template>
      <template #subtitle>
        <template v-if="!loading">
          <div class="under-title">
            <span class="rated">{{!result?.omdb['Rated']||result?.omdb['Rated']==='N/A'?'Not Rated':result?.omdb['Rated']}}</span>
            <span v-if="result?.omdb.Year" class="bullet-after">{{result.omdb.Year}}</span>
            <span v-if="result?.name !== result?.original_name" class="bullet-after">{{result?.original_name}}</span>
          </div>
        </template>
      </template>
      <template #tagline>
        <span v-if="!loading" class="tagline">{{result?.tagline}}</span>
      </template>
      <template #shortOverview>
        <span v-if="!loading" class="overview">{{result?.overview || 'Žiadny prehľad'}}</span>
      </template>
      <template #player>
        <TVPlayerPanel
        v-if="!loading"
        :isPlayerWorking="isPlayerWorking.value"
        :id="parseInt(result!.id)"
        :seasons="result?.seasons"
        :lastEpisode="result?.['last_episode_to_air']"
        :nextEpisode="result?.['next_episode_to_air']"
        :hasFirstEpisodeAired="result?.first_air_date ? (new Date()) > new Date(result?.first_air_date) : false"
        />
      </template>
      <template #details>
        <Details v-if="!loading" :details="{
          status: result?.status,
          release_date: result?.first_air_date,
          number_of_episodes: result?.number_of_episodes,
          runtime: result?.episode_run_time[0] && `${Math.floor(result?.episode_run_time[0] / 60)}h ${result?.episode_run_time[0] % 60}m`,
          languages: result?.spoken_languages,
          countries: result?.production_countries,
          genres: result?.genres,
          networks: result?.networks.filter(network => network.logo_path !== ''),
          creators: result?.created_by.map(creator => { return {
              id: creator.id,
              name: creator.name,
              profile_path: creator.profile_path,
              jobs: ['Tvorca']
            }
          }),
          ratings: [
            {
              name: 'TMDB',
              rating: result?.vote_average,
              url: `https://www.themoviedb.org/tv/${route.params.id}`
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
    </PlayerDetails>
    <template v-if="!loading">
      <Discussion v-if="store.state.credentials.loggedIn && $route.params.id" :title="{ type: 'tv', id: $route.params.id as string }" />
      <CastPanel
      v-once
      heading="Herci"
      :cast="result?.credits.cast.filter(castMember => castMember.profile_path !== null).splice(0, 16).map(member => {
        return {
          character: member.character,
          id: member.id,
          name: member.name,
          profile_path: member.profile_path
        }
      })" />
      <CardPanel
      heading="Podobné"
      :cards="result!.recommendations.results.filter(tv => tv.poster_path !== null).splice(0, 16).map(card => {
        return {
          media_type: 'tv',
          id: card.id,
          poster_path: card.poster_path,
          title: card.name
        }
      })"
      :placeholderInfo="{ type: 'title', count: 8 }" />
    </template>
  </main>
</template>

<script setup lang="ts">
import getData from '../api/main'
import _ from '../utils/main'

import { ref, reactive, onBeforeMount, inject, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { notify } from "@kyvg/vue3-notification"

import Details from '../components/Content/Details.vue'
import CardPanel from '../components/Content/CardPanel.vue'
import CastPanel from '../components/Content/CastPanel.vue'
import TVPlayerPanel from '../components/TV/TVPlayerPanel.vue'
import ActionMenu from '../components/ActionMenu.vue'
import PlayerDetails from '../components/Content/PlayerDetails.vue'
import ActionButton from '../components/Buttons/ActionButton.vue'
import Feedback from '../components/Content/Feedback.vue'
import Discussion from '../components/Content/Discussion.vue'
import Poster from '../components/Content/Poster.vue'

import { FullTvTitleType, TvTitleTranslation } from '../types/title'
import { RecommendedResponse, WorkingPlayerResponse } from '../types/response'

const route = useRoute()
const router = useRouter()
const store = inject<any>('store')

const result = ref<null | FullTvTitleType>(null)
const loading = ref(true)

const isRecommended = reactive({ isLoading: false, value: false })
const isPlayerWorking = reactive({ isLoading: false, value: true })

const fetchData = async (id: string) => {
  try {
    result.value = await getData<FullTvTitleType>({ endpoint: `/title/find/tv/${id}` })

    const translations = _.getTranslations<TvTitleTranslation>(result.value['translations']['translations'], 'iso_639_1', ['sk', 'cs', 'en'])

    result.value = {
      ...result.value,
      name: translations?.data.name || result.value.name,
      overview: translations?.data.overview || result.value.overview,
      tagline: translations?.data.tagline || result.value.tagline
    }

    store.methods.recentItems.pushItem({
      type: route.name,
      title: result.value.name,
      id: route.params.id,
      poster: result.value.poster_path
    })
    
    result.value['isPlayerWorking'] === undefined ? isPlayerWorking.value = true : isPlayerWorking.value = result.value['isPlayerWorking']
    result.value['isRecommended'] === undefined ? isRecommended.value = false : isRecommended.value = result.value['isRecommended']

    document.title = `${result.value?.name} / Filmotéka`

    loading.value = false
  } catch (error) { router.push({ name: 'NotFound' }) }
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
            headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken },
            body: JSON.stringify({ id: result.value?.id, img: result.value?.poster_path, type: route.name, savedTitle: result.value?.name })
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
            headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken },
            body: JSON.stringify({ id: route.params.id, img: result.value?.poster_path, type: route.name, title: result.value?.name })
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
      store.methods.watched.toggle({ id: route.params.id, type: route.name, title: result.value?.name})
      break
    }
    case 'TOGGLE_PINNED_PLAYER': {
      store.methods.settings.pinnedPlayerToggle()
      break
    }
    case 'TOGGLE_BOOKMARK': {
      store.methods.favourites.toggle({ id: route.params.id, img: result.value?.poster_path, type: route.name, title: result.value?.name })
      break
    }
  }
  notifyPayload && notify(notifyPayload)
}

onBeforeMount(() => { fetchData(route.params.id as string) })
onActivated(() => {
  if(result.value !== null) document.title = `${result.value?.name} / Filmotéka`
})
</script>