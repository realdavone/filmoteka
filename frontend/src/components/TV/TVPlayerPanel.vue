<template>
  <section class="outter-holder">
    <section class="player-holder-wrap">
      <Player
      :isPlayerWorking="props.isPlayerWorking"
      :title="props.title"
      :isReady="{
        status: areThereAnyEpisodes && props['hasFirstEpisodeAired'],
        message: areThereAnyEpisodes && props['hasFirstEpisodeAired'] ? null:
          areThereAnyEpisodes && !props['hasFirstEpisodeAired'] ? 'Seriál zatiaľ nevyšiel' :
            !areThereAnyEpisodes && props['hasFirstEpisodeAired'] ? 'Seriál nemá žiadne epizódy' :
        'Nastala chyba'
      }"
      :source="playerSource"
      :type="'tv'"
      @setPlayer="setPlayer"
      />
    </section>
    <div v-if="areThereAnyEpisodes && (store.state.globalSettings?.allowWatchWhileUnregistered || store.state.credentials.loggedIn)" class="season-episode">
      <button :class="{ 'disabled' : currentSeasonAndEpisode.season === 0 && currentSeasonAndEpisode.episode === 0 }" class="next-previous-episode" :disabled="currentSeasonAndEpisode.season === 0 && currentSeasonAndEpisode.episode === 0" @click="handleControls('backwards')" title="Predchádzajúca epizóda">&laquo;</button>
      <div class="season-select-holder user-select-none">
        <div class="selected-season" @click="isSeasonListOpened =! isSeasonListOpened">
          <div class="poster-holder">
            <img v-if="seasons[currentSeasonAndEpisode.season]['poster_path']" :src="`https://image.tmdb.org/t/p/w45_and_h45_face${seasons[currentSeasonAndEpisode.season]['poster_path']}`" :alt="`Obrázok ${seasons[currentSeasonAndEpisode.season]['season_number']}. série`">          
          </div>
          <span>Séria {{seasons[currentSeasonAndEpisode.season]['season_number']}}</span>
        </div>
        <Transition name="fade">
          <div v-if="isSeasonListOpened" class="options" ref="seasonList">
            <div @click="currentSeasonAndEpisode.season = i; isSeasonListOpened = false; currentSeasonAndEpisode.episode = 0" v-for="(season, i) in seasons" :key="season.season_number" class="option" :data-active="currentSeasonAndEpisode.season === i">
              <div class="poster-holder">
                <img v-if="season['poster_path']" :src="`https://image.tmdb.org/t/p/w45_and_h45_face${season['poster_path']}`" :alt="`Obrázok ${season['season_number']}. série`">
              </div>
              <div class="content-holder">
                <span>Séria {{season['season_number']}}</span>
                <span class="episode-count">{{season['episode_count']}} {{season['episode_count'] == 1 ? 'epizóda':season['episode_count'] > 1 && season['episode_count'] < 5 ? 'epizódy' : 'epizód'}}</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      <div class="episode-select-holder user-select-none">
        <div class="selected-episode" @click="isEpisodeListOpened =! isEpisodeListOpened">
          <span>Epizóda {{currentSeasonAndEpisode.episode + 1}}</span>
        </div>
        <Transition name="fade">        
          <div v-if="isEpisodeListOpened" class="options" ref="episodeList">
            <div v-for="i in numberOfEpisodes" :key="i" @click="currentSeasonAndEpisode.episode = i - 1; isEpisodeListOpened = false" class="option" :data-active="currentSeasonAndEpisode.episode === i - 1">
              <span>Epizóda {{i}}</span>
            </div>
          </div>
        </Transition>
      </div>
      <button @click="setPlayer" class="play-button" title="Prehrať">&#9654;</button>
      <button :class="{'disabled':currentSeasonAndEpisode.season + 1 === seasons.length && currentSeasonAndEpisode.episode + 1 === numberOfEpisodes}" class="next-previous-episode" :disabled="currentSeasonAndEpisode.season + 1 === seasons.length && currentSeasonAndEpisode.episode + 1 === numberOfEpisodes" @click="handleControls('forwards')" title="Ďalšia epizóda">&raquo;</button>
    </div>
    <EpisodeInfo :id="props.id" :season="currentSeasonAndEpisode.season + 1" :episode="currentSeasonAndEpisode.episode + 1" v-if="store.state.globalSettings?.allowWatchWhileUnregistered || store.state.credentials.loggedIn"/>
    <section v-if="(props['lastEpisode'] !== null || props['nextEpisode'] !== null) && (store.state.globalSettings.allowWatchWhileUnregistered || store.state.credentials.loggedIn)" class="episode-card-holder">
      <EpisodeCard 
      v-if="props['lastEpisode']"
      :playable="true"
      :info="{ season: props['lastEpisode']['season_number'], episode: props['lastEpisode']['episode_number'], date: props['lastEpisode']['air_date'], poster: props['lastEpisode']['still_path']}"
      @playEpisode="playEpisode">
        <template #label>Posledná epizóda</template>
      </EpisodeCard>
      <EpisodeCard
      v-if="props['nextEpisode']"
      :playable="false"
      :info="{ season: props['nextEpisode']['season_number'], episode: props['nextEpisode']['episode_number'], date: props['nextEpisode']['air_date']}"
      >
        <template #label>Nasledujúca epizóda</template>
      </EpisodeCard>
    </section>
  </section>
</template>

<script setup>
import EpisodeInfo from './EpisodeInfo.vue'
import EpisodeCard from './EpisodeCard.vue'
import Player from '../Content/Player.vue'

import { ref, onBeforeMount, inject, computed, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'
 
const props = defineProps({ id: String, seasons: Object, title: String, nextEpisode: Object, lastEpisode: Object, hasFirstEpisodeAired: Boolean, isPlayerWorking: Boolean })
const store = inject('store')

const currentSeasonAndEpisode = reactive({ season: 0, episode: 0 })

const playerSource = ref(null)
const areThereAnyEpisodes = ref(true)

const seasons = ref(props.seasons.filter(season => season.episode_count !== 0))

const seasonList = ref(null)
const episodeList = ref(null)
const isSeasonListOpened = ref(false)
const isEpisodeListOpened = ref(false)

const playEpisode = ({ season, episode }) => {
  currentSeasonAndEpisode.season = season
  currentSeasonAndEpisode.episode = episode
  setPlayer()
}

const setPlayer = () => {
  playerSource.value = `https://www.2embed.to/embed/tmdb/tv?id=${props.id}&s=${currentSeasonAndEpisode.season + 1}&e=${currentSeasonAndEpisode.episode + 1}`

  if(store.state.favourites.some(item => item.id === props.id.toString())){
    store.methods.favourites.update(
      props.id,
      currentSeasonAndEpisode.season + 1,
      currentSeasonAndEpisode.episode + 1
    )
  }
}

const handleControls = action => {
  if(action === 'backwards') {
    if(currentSeasonAndEpisode.episode !== 0) currentSeasonAndEpisode.episode-- 
    else { currentSeasonAndEpisode.season--; currentSeasonAndEpisode.episode = numberOfEpisodes.value - 1 }
  }
  else {
    if((currentSeasonAndEpisode.episode + 1) !== numberOfEpisodes.value) currentSeasonAndEpisode.episode++
    else { currentSeasonAndEpisode.season++; currentSeasonAndEpisode.episode = 0 }
  }
}

onBeforeMount(() => {
  if(seasons.value.length === 0) areThereAnyEpisodes.value = false
  else {
    if(store.state.favourites.findIndex(item => item.id === props.id.toString()) !== -1){
      currentSeasonAndEpisode.season = parseInt(store.state.favourites[store.state.favourites.findIndex(item => item.id === props.id.toString())].season) -1 || 0;
      currentSeasonAndEpisode.episode = parseInt(store.state.favourites[store.state.favourites.findIndex(item => item.id === props.id.toString())].episode) -1 || 0;
    }
  }
})

const numberOfEpisodes = computed(() => {
  if(currentSeasonAndEpisode.season !== null) return seasons.value[currentSeasonAndEpisode.season]['episode_count']
  else return null
})

onClickOutside(seasonList, () => isSeasonListOpened.value = false)
onClickOutside(episodeList, () => isEpisodeListOpened.value = false)

</script>

<style lang="scss" scoped>
div.season-select-holder, div.episode-select-holder{
  width:100%;
  --option-height:40px;
  align-self:flex-start;
  position:relative;
  div.selected-season, div.selected-episode, div.option{
    min-height:var(--option-height);
    display:flex;
    gap:0.5rem;
    align-items:center;
    padding:0 0.5rem;
    cursor:pointer;
    div.poster-holder{
      height:26px;
      width:26px;
      border-radius:4px;
      overflow:hidden;
      background:var(--primary-color);
      img{
        width:100%;
        height:auto; 
      }
    }
    span{font-size:0.75rem;
      &.episode-count{
        font-size:0.6rem;
        font-weight:700;
      }
    }
    div.content-holder{
      display:flex;
      align-items:center;
      flex-direction:column;
    }
    &[data-active=true]{
      background:var(--theme-color);
      color:var(--font-color-dark);
    }
  }
  div.selected-season, div.selected-episode{ font-weight:700 }
  div.option:not([data-active=true]):hover{ background:var(--card-color-hover) }
  div.options{
    display:flex;
    flex-direction:column;
    position:absolute;
    width:100%;
    z-index:3;
    left:0;
    background:var(--card-color);
    max-height:200px;
    overflow:auto;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    border-radius:0.5rem;
    top:calc(100% + 5px);
  }
}
section.outter-holder{
  display:flex;
  flex-direction:column;
  gap:1rem;
  width:var(--player-width);
  max-width:var(--player-width);
  section.episode-card-holder{
    display:flex;
    flex-wrap:nowrap;
    gap:var(--container-padding);
  }
  section.player-holder-wrap{ background-color:var(--player-background-color); }
  div.season-episode{
    width:100%;
    display:flex;
    align-items:center;
    background:var(--card-color);
    height:40px;
    gap:5px;
    padding:0 5px;
    border-radius:1.5rem;
    button{
      color:var(--theme-color);
      display:flex;
      justify-content:center;
      align-items:center;
      transition:0.2s ease background;
      border-radius:50%;
      min-width:28px!important;
      max-width:28px!important;
      width:28px;
      height:28px;
      &.play-button{
        font-size:1.5rem;
      }
      &.next-previous-episode{
        font-size:2rem;
        padding-bottom:6px;
      }
      &.next-previous-episode.disabled{
        cursor:default;
        color:gray;
      }
    }
  }
}
@media screen and (max-width: 1300px) {
  section.outter-holder{
    width:initial;
    max-width:initial;
  }
  section.player-holder-wrap{ margin:0 calc(0px - var(--container-padding)) }
}
@media screen and (max-width: 600px) {
  section.episode-card-holder{
    gap:var(--container-padding)!important;
    margin-bottom:var(--container-padding)!important;
  }
}
</style>