<template>
  <main class="title">
    <PlayerDetails :type="'tv'" :bg="result?.backdrop_path">
      <template #poster>
        <img v-if="details?.poster" class="poster" :src="`https://www.themoviedb.org/t/p/w300${details['poster']}`" :alt="details['title']">
      </template>
      <template #actionMenu>
        <ActionMenu ref="actionMenu">
          <template v-if="!loading">
            <ActionButton
            title="Skopírovať URL adresu"
            @handleClick="$refs.actionMenu.copyUrl()">
              <template #icon><span class="material-symbols-outlined icon">link</span></template>
              <template #label><span class="label">Skopírovať URL</span></template>
            </ActionButton>
            <template v-if="store.state.credentials.loggedIn">
              <ActionButton
              :loading="isPlayerWorking.isLoading"
              title="Fungujúci prehrávač"
              :warning="!isPlayerWorking.value"
              @handleClick="toggleWorkingPlayer({ id: route.params.id, img: details['poster'], type: route.name, title: details['title'] })">
                <template #icon><span class="icon" :style="[isPlayerWorking.value === false ? 'opacity:1' : 'opacity:0.6']">&#9888;</span></template>
                <template #label><span class="label">Nahlásiť prehrávač</span></template>
              </ActionButton>
              <ActionButton
              :loading="isRecommended.isLoading"
              title="Odporúčiť"
              :disabled="isRecommended.value"
              @handleClick="addAsRecommended({ id: route.params.id, img: details['poster'], type: route.name, title: details['title'] })">
                <template #icon><span class="material-symbols-outlined icon">thumb_up</span></template>
                <template #label><span class="label">{{isRecommended.value ? 'Odporúčané' : 'Odporúčiť'}}</span></template>
              </ActionButton>
              <ActionButton
              title="Prezrené"
              :success="store.methods.watched.exists({ type: route.name, id: route.params.id })"
              @handleClick="store.methods.watched.toggle({ id: route.params.id, type: route.name, title: details['title']})">
                <template #icon><span class="icon" :style="[store.methods.watched.exists({ type: route.name, id: route.params.id }) ? 'opacity:1' : 'opacity:0.5']">&#128065;&#xFE0E;</span></template>
                <template #label><span class="label">Označiť ako {{store.methods.watched.exists({ type: route.name, id: route.params.id }) ? 'neprezrené' : 'prezrené'}}</span></template>
              </ActionButton>
              <ActionButton
              title="Pripnutie prehrávača"
              :success="store.state.settings.pinnedPlayer"
              @handleClick="store.methods.settings.pinnedPlayerToggle()">
                <template #icon><span :style="[store.state.settings.pinnedPlayer ? 'opacity:1' : 'opacity:0.6']" class="material-symbols-outlined icon">push_pin</span></template>
                <template #label><span class="label">{{store.state.settings.pinnedPlayer ? 'Odopnúť' : 'Pripnúť'}}</span></template>
              </ActionButton>
              <ActionButton
              title="Pridanie k záložkam"
              :success="store.methods.favourites.exists({ type: route.name, id: route.params.id })"
              @handleClick="store.methods.favourites.toggle({ id: route.params.id, img: details['poster'], type: route.name, title: details['title'] })">
                <template #icon><span class="material-symbols-outlined icon">{{store.methods.favourites.exists({ type: route.name, id: route.params.id }) ? 'bookmark_remove' : 'bookmark_add'}}</span></template>
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
        <span v-if="!loading" class="label">Krátky prehľad</span>
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
    <main class="title" v-if="!loading">
      <CastPanel v-if="cast.length !== 0">
        <template #title>Herci</template>
        <template #card>
          <PersonCard v-for="item in cast" :key="item.id" :type="'person'" :id="item.id">
            <template #image><img :src="`https://www.themoviedb.org/t/p/w300_and_h300_face${item.profile_path}`" :alt="item.name"></template>
            <template #name>{{item.name}}</template>
            <template #character>{{item.character}}</template>
          </PersonCard>
        </template>
      </CastPanel>
      <CardPanel v-if="similarTV.length !== 0" :type="'tv'" :hoverEffect="true" :scroll="true">
          <template #title>Podobné</template>
          <template #card><VerticalCard v-for="item in similarTV" :key="item.id" :item="item"/></template>
      </CardPanel>
    </main>
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
  value: false
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
      title: translations.length > 0 && translations[0]['data']['title']!==''&&translations[0]['data']['name']!==''?translations[0]['data']['title']||translations[0]['data']['name']:result.value['name'],
      original_title: result.value['original_name'],
      poster: result.value['poster_path'],
      genres: result.value['genres'] || [],
      runtime: result.value['episode_run_time'][0]?Math.floor(result.value['episode_run_time'][0]/60)+'h '+result.value['episode_run_time'][0]%60+'m':null,
      overview: translations.length>0?translations[0]['data']['overview']:result.value['overview'],
      countries: result.value['origin_country'],
      tagline: translations.length>0?translations[0]['data']['tagline']:result.value['tagline'],
      imdb: result.value['external_ids']['imdb_id'],
      networks: result.value.networks.filter(network => network.logo_path!==''),
      creators: _.sortCreators(result.value['created_by'].slice(0,5)),
      ratings: [
        {
          name: 'TMDB',
          rating: (Math.floor(parseFloat(result.value['vote_average'])*10)/10).toString(),
          url: `https://www.themoviedb.org/tv/${route.params.id}`
        },
        {
          name: 'IMDB',
          rating: omdb['imdbRating'],
          url: `https://www.imdb.com/title/${result.value['external_ids']['imdb_id']}`
        },
        {
          name: 'Rotten Tomatoes',
          rating: omdb['Ratings']!==undefined?
            omdb['Ratings'].find(rating=>rating['Source']==='Rotten Tomatoes')!==undefined?
              omdb['Ratings'].find(rating=>rating['Source']==='Rotten Tomatoes')['Value']
            :null
          :null,
          url: null
        },
        {
          name: 'Metascore',
          rating:  omdb['Ratings']!==undefined?
            omdb['Ratings'].find(rating=>rating['Source']==='Metacritic')!==undefined?
              parseInt(omdb['Ratings'].find(rating=>rating['Source']==='Metacritic')['Value'])
            :null
          :null,
          url: null
        }
      ],
      year: omdb['Year'],
      rated: !omdb['Rated']||omdb['Rated']==='N/A'?'Not Rated':omdb['Rated'],
      number_of_episodes: result.value['number_of_episodes'],
      status: status.get(result.value['status']),
      languages: result.value['spoken_languages']
    }

    loading.value = false
    
    isPlayerWorking.value = result.value['isPlayerWorking']
    isRecommended.value = result.value['isRecommended']

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