<template>
  <section class="outter-holder">
    <section class="player-holder-wrap">
      <Player
        :isPlayerWorking="props.isPlayerWorking"
        :isReady="{
          status: areThereAnyEpisodes && props['hasFirstEpisodeAired'],
          message: areThereAnyEpisodes && props['hasFirstEpisodeAired'] ? null :
            areThereAnyEpisodes && !props['hasFirstEpisodeAired'] ? 'Seriál zatiaľ nevyšiel' :
              !areThereAnyEpisodes && props['hasFirstEpisodeAired'] ? 'Seriál nemá žiadne epizódy' :
          'Nastala chyba'
        }"
        :source="playerSource"
        @setPlayer="setPlayer"
      />
    </section>
    <EpisodeControls
      v-if="props.hasFirstEpisodeAired && areThereAnyEpisodes && (store.state.globalSettings?.allowWatchWhileUnregistered || store.state.credentials.loggedIn)"
      :seasons="seasons"
      :current="currentSeasonAndEpisode"
      @setSeason="handleSetSeason"
      @setEpisode="handleSetEpisode"
      @setPlayer="setPlayer"
    />
    <EpisodeInfo
      v-if="props.hasFirstEpisodeAired && (store.state.globalSettings?.allowWatchWhileUnregistered || store.state.credentials.loggedIn)"
      :id="props.id"
      :season="currentSeasonAndEpisode.season + 1"
      :episode="currentSeasonAndEpisode.episode + 1"
    />
    <section v-if="(props['lastEpisode'] !== null || props['nextEpisode'] !== null) && (store.state.globalSettings.allowWatchWhileUnregistered || store.state.credentials.loggedIn)" class="episode-card-holder">
      <EpisodeCard 
        v-if="props['lastEpisode']"
        label="Posledná epizóda"
        :playable="true"
        :info="{
          season: props['lastEpisode']['season_number'],
          episode: props['lastEpisode']['episode_number'],
          date: props['lastEpisode']['air_date'],
        }"
        @playEpisode="playEpisode" />
        <EpisodeCard
        v-if="props['nextEpisode']"
        label="Nasledujúca epizóda"
        :playable="false"
        :info="{
          season: props['nextEpisode']['season_number'],
          episode: props['nextEpisode']['episode_number'],
          date: props['nextEpisode']['air_date']
        }"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import EpisodeInfo from './EpisodeInfo.vue'
import EpisodeCard from './EpisodeCard.vue'
import EpisodeControls from './EpisodeControls.vue'
import Player from '../Content/Player.vue'

import { ref, onBeforeMount, inject, reactive } from 'vue'
 
import { FullTvTitleType } from '../../types/title'

const props = defineProps<{
  id: number
  hasFirstEpisodeAired: boolean
  lastEpisode?: FullTvTitleType['last_episode_to_air']
  nextEpisode?: FullTvTitleType['next_episode_to_air']
  seasons?: FullTvTitleType['seasons'] | undefined
  isPlayerWorking: boolean
}>()
const store = inject<any>('store')

const currentSeasonAndEpisode = reactive({ season: 0, episode: 0 })

const playerSource = ref<null | string>(null)
const areThereAnyEpisodes = ref(true)

const seasons = ref(props.seasons && props.seasons.filter(season => season.season_number !== 0).filter(season => season.episode_count !== 0))

function handleSetSeason(season: number) {
  currentSeasonAndEpisode.episode = 0
  currentSeasonAndEpisode.season = season
}

function handleSetEpisode(episode: number) {
  currentSeasonAndEpisode.episode = episode
}

const playEpisode = ({
  season,
  episode
}:{
  season: number
  episode: number
}) => {
  currentSeasonAndEpisode.season = season
  currentSeasonAndEpisode.episode = episode
  setPlayer()
}

const setPlayer = () => {
  playerSource.value = `https://www.2embed.to/embed/tmdb/tv?id=${props.id}&s=${currentSeasonAndEpisode.season + 1}&e=${currentSeasonAndEpisode.episode + 1}`

  if(store.state.favourites.some((item: any) => item.id === props.id.toString())){
    store.methods.favourites.update(props.id.toString(), currentSeasonAndEpisode.season + 1, currentSeasonAndEpisode.episode + 1)
  }
}

onBeforeMount(() => {
  if(seasons.value?.length === 0) areThereAnyEpisodes.value = false
  else {
    if(store.state.favourites.findIndex((item: any) => item.id.toString() === props.id.toString()) !== -1){
      currentSeasonAndEpisode.season = parseInt(store.state.favourites[store.state.favourites.findIndex((item: any) => item.id === props.id.toString())].season) -1 || 0;
      currentSeasonAndEpisode.episode = parseInt(store.state.favourites[store.state.favourites.findIndex((item: any) => item.id === props.id.toString())].episode) -1 || 0;
    }
  }
})
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
    gap:8px;
    align-items:center;
    padding:0 8px;
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
    span{
      &.episode-count{
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
    border-radius:8px;
    top:calc(100% + 5px);
  }
}
section.outter-holder{
  display:flex;
  flex-direction:column;
  gap:15px;
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
    border-radius: 25px;
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
      &.next-previous-episode{
        padding-bottom:6px;
        font-size: 40px!important;
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