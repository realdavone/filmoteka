<template>
  <main class="flex-column">
    <PlayerDetails :type="'movie'" :bg="result?.backdrop_path">
      <template #poster>
        <img v-if="details?.poster" class="poster" :src="`https://www.themoviedb.org/t/p/w300${details['poster']}`" :alt="details['title']">
      </template>
      <template #subnav>
        <SubNav ref="subnav">
          <template v-if="!loading">
            <SubNavButton v-if="store.state.credentials.loggedIn" title="Fungujúci prehrávač" @handleClick="toggleWorkingPlayer">
              <template #icon><span :style="[isPlayerWorking === false ? 'opacity:1' : 'opacity:0.6']">&#9888;</span></template>
            </SubNavButton>        
            <SubNavButton v-if="store.state.credentials.loggedIn" title="Odporúčiť" :disabled="isRecommended" @handleClick="addAsRecommended({ id: route.params.id, img: details['poster'], type: route.name, title: details['title'] })">
              <template #icon><span class="material-symbols-outlined">thumb_up</span></template>
            </SubNavButton>        
            <SubNavButton title="Skopírovať URL adresu" @handleClick="$refs.subnav.copyUrl()">
              <template #icon><span class="material-symbols-outlined">link</span></template>
            </SubNavButton>
            <SubNavButton v-if="store.state.credentials.loggedIn" title="Prezrené" @handleClick="store.methods.watched.toggle({ id: route.params.id, type: route.name, title: details['title']})">
              <template #icon><span :style="[store.methods.watched.exists({ type: route.name, id: route.params.id }) ? 'opacity:1;' : 'opacity:0.5']">&#128065;</span></template>
            </SubNavButton>
            <SubNavButton v-if="store.state.credentials.loggedIn" title="Pripnutie prehrávača" @handleClick="store.methods.settings.pinnedPlayerToggle()">
              <template #icon><span :style="[store.state.settings.pinnedPlayer ? 'opacity:1' : 'opacity:0.5']" class="material-symbols-outlined">push_pin</span></template>
            </SubNavButton>
            <SubNavButton v-if="store.state.credentials.loggedIn" title="Pridanie k záložkam" @handleClick="store.methods.favourites.toggle({ id: route.params.id, img: details['poster'], type: route.name, title: details['title'] })">
              <template #icon><span class="material-symbols-outlined">{{store.methods.favourites.exists({ type: route.name, id: route.params.id }) ? 'bookmark_remove' : 'bookmark_add'}}</span></template>
            </SubNavButton>
          </template>
        </SubNav>
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
        <MoviePlayerPanel
        v-if="!loading"
        :isPlayerWorking="isPlayerWorking"
        :id="result.imdb_id"
        :isReleased="(new Date()) > new Date(result.release_date)"
        :title="details['title']"
        />
      </template>
      <template #details>
        <Details v-if="!loading" :details="details" />
      </template>
    </PlayerDetails>
    <main class="flex-column" v-if="!loading">
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
      <Collection v-if="result['belongs_to_collection']" :collection="result['belongs_to_collection']"/>
      <MediaPanel :items="videos" :type="'youtubeVideo'" />
      <CardPanel v-if="similarMovies.length!==0" :hoverEffect="true" :scroll="true">
        <template #title>Podobné</template>
        <template #card><VerticalCard v-for="item in similarMovies" :key="item.id" :item="item"/></template>
      </CardPanel>
    </main>
  </main>
</template>

<script setup>
import getData from '../api/main.js'
import _ from '../utils/main.js'

import { ref, onBeforeMount, inject, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { notify } from "@kyvg/vue3-notification"

import Details from '../components/Content/Details.vue'
import CardPanel from '../components/Content/CardPanel.vue'
import CastPanel from '../components/Content/CastPanel.vue'
import VerticalCard from '../components/Content/VerticalCard.vue'
import PersonCard from '../components/Content/PersonCard.vue'
import MediaPanel from '../components/Content/MediaPanel.vue'
import MoviePlayerPanel from '../components/Movie/MoviePlayerPanel.vue'
import Collection from '../components/Movie/Collection.vue'
import SubNav from '../components/SubNav.vue'
import PlayerDetails from '../components/Content/PlayerDetails.vue'
import SubNavButton from '../components/Buttons/SubNavButton.vue'

const route = useRoute()
const router = useRouter()
const store = inject('store')

const result = ref({})
const loading = ref(true)
const cast = ref([])
const similarMovies = ref([])
const videos = ref([])
const details = ref(null)
const isRecommended = ref(false)
const isPlayerWorking = ref(true)

const fetchData = async (id) => {
  try {
    result.value = await getData({ endpoint: `/title/find/movie/${id}` })
    const videosData = await getData({ endpoint: `/video/movie/${id}` })

    const omdb = result.value.omdb
    
    videos.value = videosData.results.filter(video => video.type==='Trailer');
    cast.value = result.value.credits.cast.filter(castMember => castMember.profile_path!==null).splice(0, 16)
    similarMovies.value = result.value.recommendations.results.filter(movie => movie.poster_path!==null).splice(0, 16)
    
    const translations = _.getTranslations(result.value['translations']['translations'])
    
    details.value = {
      title: translations.length>0&&translations[0]['data']['title']!==''&&translations[0]['data']['name']!==''?translations[0]['data']['title']||translations[0]['data']['name']:result.value['title'],
      original_title: result.value['original_title'],
      poster: result.value['poster_path'],
      genres: result.value['genres'] || [],
      runtime: result.value['runtime'] ? Math.floor(result.value['runtime'] / 60) + 'h ' + result.value['runtime'] % 60 + 'm' : null,
      overview: translations.length > 0 ? translations[0]['data']['overview'] : result.value['overview'],
      countries: result.value['production_countries'],
      tagline: translations.length > 0 ? translations[0]['data']['tagline'] : result.value['tagline'],
      imdb: result.value['imdb_id'],
      networks: result.value.production_companies.filter(prod => prod.logo_path!==null),
      creators: _.sortCreators(result.value['credits']['crew'].sort((a, b) => b['popularity'] - a['popularity']).slice(0, 5)),
      ratings: [
        {
          name: 'TMDB',
          rating: (Math.floor(parseFloat(result.value['vote_average'])*10)/10).toString(),
          url: `https://www.themoviedb.org/movie/${route.params.id}`
        },
        {
          name: 'IMDB',
          rating: omdb['imdbRating'],
          url: `https://www.imdb.com/title/${result.value['imdb_id']}`
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
      number_of_episodes: null,
      status: null,
      release_date: result.value['release_date']!=='' ? new Date(result.value['release_date']).toLocaleDateString('sk-SK') : null,
      languages: result.value['spoken_languages'],
      revenue: new Intl.NumberFormat('sk-SK', { notation: "compact", compactDisplay: "short", style: "currency", currency: "USD" }).format(result.value['revenue'])
    }

    loading.value = false

    isPlayerWorking.value = result.value['isPlayerWorking']
    isRecommended.value = result.value['isRecommended']

    document.title = `${details.value['title']}${details.value['year']?' ('+details.value['year']+')':''} / Filmotéka`
  } catch (error) { router.push({ name: 'NotFound' }) }
}

const toggleWorkingPlayer = async () => {
  try {
    const data = await getData({ 
      endpoint: `/title/non-working/`,
      options: {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken },
        body: JSON.stringify({ type: route.name, id: route.params.id, img: details.value['poster'], savedTitle: details.value['title'] })
      }
    })
    isPlayerWorking.value = data.isPlayerWorking
    if(data.isPlayerWorking === false) { notify({ type: 'error', text: 'Prehrávač označený ako nefunkčný' }) }
    else { notify({ type: 'success', text: 'Prehrávač označený ako funkčný' }) }
  } catch (error) { console.log(error) }
}

const addAsRecommended = async obj => {
  const { title, ...rest } = obj
  try {
    const res = await getData({
      endpoint: '/title/recommend',
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken },
        body: JSON.stringify({ savedTitle: title, ...rest })
      }
    })
    if(res.success) {
      isRecommended.value = true
      notify({ type: 'success', text: 'Úspešne pridané do odporúčaných' })
    }
  } catch (error) { console.log(error) }
}

onBeforeMount(() => { fetchData(route.params.id) })
onActivated(() => {
  if(details.value !== null) document.title = `${details.value['title']}${details.value['year']?' ('+details.value['year']+')':''} / Filmotéka`
})
</script>
