<template>
  <main class="title">
    <PlayerDetails :type="'tv'" :bg="result?.backdrop_path">
      <template #poster>
        <Poster v-if="details?.poster" :src="details['poster']" :alt="details['title']" :fadeInOnLoad="true" />
      </template>
      <template #feedback>
        <Feedback v-if="!loading && store.state.credentials.loggedIn && (new Date()) > new Date(result['first_air_date'])" :state="{ likes: details?.likes, dislikes: details?.dislikes }" :title="{ id: $route.params.id, type: 'tv' }"/>
      </template>
      <template #actionMenu>
        <ActionMenu ref="actionMenu">
          <template v-if="!loading">
            <ActionButton
            title="Skopírovať URL adresu"
            @handleClick="$refs.actionMenu.copyUrl()">
              <template #icon><span class="material-icons icon">link</span></template>
              <template #label><span class="label">Skopírovať URL</span></template>
            </ActionButton>
            <template v-if="store.state.credentials.loggedIn">
              <ActionButton
              :loading="isPlayerWorking.isLoading"
              title="Nahlásiť prehrávač"
              :warning="!isPlayerWorking.value"
              @handleClick="toggleWorkingPlayer({ id: route.params.id, img: details['poster'], type: route.name, title: details['title'] })">
                <template #icon><span class="material-icons icon">report_problem</span></template>
                <template #label><span class="label">Nahlásiť prehrávač</span></template>
              </ActionButton>
              <ActionButton
              :loading="isRecommended.isLoading"
              title="Odporúčiť"
              :disabled="isRecommended.value"
              @handleClick="addAsRecommended({ id: route.params.id, img: details['poster'], type: route.name, title: details['title'] })">
                <template #icon><span class="material-icons icon">thumb_up</span></template>
                <template #label><span class="label">{{isRecommended.value ? 'Odporúčané' : 'Odporúčiť'}}</span></template>
              </ActionButton>
              <ActionButton
              title="Označit ako prezrené"
              :success="store.methods.watched.exists({ type: route.name, id: route.params.id })"
              @handleClick="store.methods.watched.toggle({ id: route.params.id, type: route.name, title: details['title']})">
                <template #icon><span class="material-icons icon">visibility</span></template>
                <template #label><span class="label">Označiť ako {{store.methods.watched.exists({ type: route.name, id: route.params.id }) ? 'neprezrené' : 'prezrené'}}</span></template>
              </ActionButton>
              <ActionButton
              title="Pripnutie prehrávača"
              :success="store.state.settings.pinnedPlayer"
              @handleClick="store.methods.settings.pinnedPlayerToggle()">
                <template #icon><span class="material-icons icon">push_pin</span></template>
                <template #label><span class="label">{{store.state.settings.pinnedPlayer ? 'Odopnúť' : 'Pripnúť'}} prehrávač</span></template>
              </ActionButton>
              <ActionButton
              title="Pridanie k záložkam"
              :success="store.methods.favourites.exists({ type: route.name, id: route.params.id })"
              @handleClick="store.methods.favourites.toggle({ id: route.params.id, img: details['poster'], type: route.name, title: details['title'] })">
                <template #icon><span class="material-icons icon">{{store.methods.favourites.exists({ type: route.name, id: route.params.id }) ? 'bookmark_remove' : 'bookmark_add'}}</span></template>
                <template #label><span class="label">{{store.methods.favourites.exists({ type: route.name, id: route.params.id }) ? 'Odobrať zo záložiek' : 'Pridať k záložkam'}}</span></template>
              </ActionButton>     
            </template>
          </template>
        </ActionMenu>
      </template>
      <template #title>
        <span v-if="!loading" class="title">{{details['title']}}</span>
      </template>
      <template #subtitle>
        <template v-if="!loading">
          <div class="under-title">
            <span class="rated">{{details['rated']}}</span>
            <span v-if="details['year']" class="bullet-after">{{details['year']}}</span>
            <span v-if="details['title'] !== details['original_title']" class="bullet-after">{{details['original_title']}}</span>
          </div>
        </template>
      </template>
      <template #tagline>
        <span v-if="!loading" class="tagline">{{details?.tagline}}</span>
      </template>
      <template #shortOverview>
        <span v-if="!loading" class="overview">{{details?.overview || 'Žiadny prehľad'}}</span>
      </template>
      <template #player>
        <TVPlayerPanel
        v-if="!loading"
        :isPlayerWorking="isPlayerWorking.value"
        :id="result.id.toString()"
        :seasons="seasons" 
        :title="details['title']"
        :lastEpisode="result['last_episode_to_air']"
        :nextEpisode="result['next_episode_to_air']"
        :hasFirstEpisodeAired="(new Date()) > new Date(result['first_air_date'])"
        />
      </template>
      <template #details>
        <Details v-if="!loading" :details="details" />
      </template>
    </PlayerDetails>
    <template v-if="!loading">
      <Discussion v-if="store.state.credentials.loggedIn && $route.params.id" :title="{ type: 'tv', id: $route.params.id }" />
      <CastPanel v-once v-if="cast.length !== 0">
        <template #title>Herci</template>
        <template #card>
          <PersonCard v-for="item in cast" :key="item.id" :person="item" />
        </template>
      </CastPanel>
      <CardPanel v-if="similarTV.length !== 0">
        <template #title>Podobné</template>
        <template #card><VerticalCard v-for="item in similarTV" :key="item.id" :item="item"/></template>
      </CardPanel>
    </template>
  </main>
</template>

<script setup>
import getData from '../api/main.js'
import _ from '../utils/main.js'

import { ref, reactive, onBeforeMount, inject, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { notify } from "@kyvg/vue3-notification"

import Details from '../components/Content/Details.vue'
import CardPanel from '../components/Content/CardPanel.vue'
import CastPanel from '../components/Content/CastPanel.vue'
import VerticalCard from '../components/Content/VerticalCard.vue'
import PersonCard from '../components/Content/PersonCard.vue'
import TVPlayerPanel from '../components/TV/TVPlayerPanel.vue'
import ActionMenu from '../components/ActionMenu.vue'
import PlayerDetails from '../components/Content/PlayerDetails.vue'
import ActionButton from '../components/Buttons/ActionButton.vue'
import Feedback from '../components/Content/Feedback.vue'
import Discussion from '../components/Content/Discussion.vue'
import Poster from '../components/Content/Poster.vue'

const route = useRoute()
const router = useRouter()
const store = inject('store')

const result = ref({})
const loading = ref(true)
const cast = ref([])
const seasons = ref([])
const similarTV = ref([])
const networks = ref([])
const details = ref(null)

const isRecommended = reactive({
  isLoading: false,
  value: false
})

const isPlayerWorking = reactive({
  isLoading: false,
  value: true
})

const fetchData = async (id) => {
  try {
    result.value = await getData({ endpoint: `/title/find/tv/${id}` })

    const omdb = result.value.omdb

    cast.value = result.value.credits.cast.filter(castMember => castMember.profile_path!==null).splice(0, 16)
    similarTV.value = result.value.recommendations.results.filter(movie => movie.poster_path!==null).splice(0, 16)
    seasons.value = result.value.seasons.filter(season => season.season_number!==0)
    networks.value = result.value.networks.filter(network => network.logo_path!=='')

    const translations = _.getTranslations(result.value['translations']['translations'])

    details.value = {
      title: translations?.['data']?.['title'] || translations?.['data']?.['name'] || result.value['title'] || result.value['name'],
      original_title: result.value['original_name'],
      poster: result.value['poster_path'],
      genres: result.value['genres'] || [],
      runtime: result.value['episode_run_time'][0]?Math.floor(result.value['episode_run_time'][0]/60)+'h '+result.value['episode_run_time'][0]%60+'m':null,
      overview: translations?.['data']?.['overview'] || result.value['overview'],
      countries: result.value['origin_country'],
      tagline: translations?.['data']?.['tagline'] || result.value['tagline'],
      imdb: result.value['external_ids']['imdb_id'],
      networks: result.value.networks.filter(network => network.logo_path!==''),
      creators: _.sortCreators(result.value['created_by'].slice(0,5)),
      ratings: [
        {
          name: 'TMDB',
          rating: (Math.floor(parseFloat(result.value['vote_average']) * 10) / 10),
          url: `https://www.themoviedb.org/tv/${route.params.id}`
        },
        ...(omdb['imdbRating'] ? [{
          name: 'IMDB',
          rating: omdb['imdbRating'],
          url: `https://www.imdb.com/title/${result.value['imdb_id']}`
        }] : []),
        ...(omdb?.['Ratings'] && omdb?.['Ratings'].find(rating => rating['Source'] === 'Rotten Tomatoes')?.['Value'] ? [{
          name: 'Rotten Tomatoes',
          rating: omdb?.['Ratings'].find(rating => rating['Source'] === 'Rotten Tomatoes')?.['Value'],
          url: null
        }] : []),
        ...(omdb?.['Ratings'] && omdb?.['Ratings'].find(rating => rating['Source'] === 'Metacritic')?.['Value'] ? [{
          name: 'Metascore',
          rating: omdb?.['Ratings'].find(rating => rating['Source'] === 'Metacritic')?.['Value'],
          url: null
        }]: [])
      ],
      year: omdb['Year'],
      rated: !omdb['Rated']||omdb['Rated']==='N/A'?'Not Rated':omdb['Rated'],
      number_of_episodes: result.value['number_of_episodes'],
      status: status.get(result.value['status']),
      languages: result.value['spoken_languages'],
      likes: result.value?.['likes'] || [],
      dislikes: result.value?.['dislikes'] || []
    }

    loading.value = false
    
    result.value['isPlayerWorking'] === undefined ? isPlayerWorking.value = true : isPlayerWorking.value = result.value['isPlayerWorking']
    result.value['isRecommended'] === undefined ? isRecommended.value = false : isRecommended.value = result.value['isRecommended']

    document.title = `${details.value['title']}${details.value['year']?' ('+details.value['year']+')':''} / Filmotéka`
  } catch (error) { router.push({ name: 'NotFound' }) }
}

const toggleWorkingPlayer = async obj => {
  try {
    isPlayerWorking.isLoading = true
    const data = await getData({ 
      endpoint: `/title/non-working/`,
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken },
        body: JSON.stringify(obj)
      }
    })
    isPlayerWorking.value = data.isPlayerWorking
    if(data.isPlayerWorking === false) { notify({ type: 'error', text: 'Prehrávač označený ako nefunkčný' }) }
    else { notify({ type: 'success', text: 'Prehrávač označený ako funkčný' }) }       
  } catch (error) { console.log(error) }
  finally{ isPlayerWorking.isLoading = false }
}

const addAsRecommended = async obj => {
  const { title, ...rest } = obj
  try {
    isRecommended.isLoading = true
    const res = await getData({
      endpoint: '/title/recommend',
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken },
        body: JSON.stringify({ savedTitle: title, ...rest })
      }
    })
    if(res.success) {
      notify({ type: 'success', text: 'Úspešne pridané do odporúčaných' })
      isRecommended.value = true
    }
  } catch (error) { console.log(error) }
  finally{ isRecommended.isLoading = false }
}

const status = new Map()
status.set('Returning Series', 'Pokračuje')
  .set('Planned', 'Naplánovany')
  .set('In Production', 'V produkcií')
  .set('Ended', 'Skončil')
  .set('Canceled', 'Zrušený')
  .set('Pilot', 'Pilot')

onBeforeMount(() => { fetchData(route.params.id) })
onActivated(() => {
  if(details.value !== null) document.title = `${details.value['title']}${details.value['year']?' ('+details.value['year']+')':''} / Filmotéka`
})
</script>