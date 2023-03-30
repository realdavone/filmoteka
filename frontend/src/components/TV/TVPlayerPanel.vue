<template>
  <section class="outter-holder">
    <section class="player-holder-wrap">
      <Player
        ref="player"
        :isPlayerWorking="props.isPlayerWorking"
        :isReady="{
          status: areThereAnyEpisodes && props.hasFirstEpisodeAired,
          message: areThereAnyEpisodes && props.hasFirstEpisodeAired ? null :
            areThereAnyEpisodes && !props.hasFirstEpisodeAired ? 'Seriál zatiaľ nevyšiel' :
              !areThereAnyEpisodes && props.hasFirstEpisodeAired ? 'Seriál nemá žiadne epizódy' :
          'Nastala chyba'
        }"
        @setPlayer="setPlayer"
      />
    </section>
    <template v-if="props.hasFirstEpisodeAired && areThereAnyEpisodes && (store.state.globalSettings?.allowWatchWhileUnregistered || store.state.credentials.loggedIn)">
      <EpisodeControls
        :seasons="seasons"
        :current="currentSeasonAndEpisode"
        @setSeason="handleSetSeason"
        @setEpisode="handleSetEpisode"
        @setPlayer="setPlayer"
      />
      <EpisodeInfo
        :id="props.id"
        :season="currentSeasonAndEpisode.season + 1"
        :episode="currentSeasonAndEpisode.episode + 1"
      />
    </template>
    <section
      v-if="(props['lastEpisode'] || props['nextEpisode']) && (store.state.globalSettings.allowWatchWhileUnregistered || store.state.credentials.loggedIn)"
      class="episode-card-holder"
    >
      <EpisodeCard 
        v-if="props['lastEpisode']"
        label="Posledná epizóda"
        :playable="true"
        :info="{
          season: props['lastEpisode']['season_number'],
          episode: props['lastEpisode']['episode_number'],
          date: props['lastEpisode']['air_date'],
        }"
        @playEpisode="playEpisode"
      />
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
  seasons?: FullTvTitleType['seasons']
  isPlayerWorking: boolean
}>()
const store = inject<any>('store')

const currentSeasonAndEpisode = reactive({ season: 0, episode: 0 })

const areThereAnyEpisodes = ref(true)
const player = ref<InstanceType<typeof Player> | null>(null)

const seasons = ref(props.seasons && props.seasons.filter(season => season.season_number !== 0).filter(season => season.episode_count !== 0))

function handleSetSeason(season: number) {
  currentSeasonAndEpisode.episode = 0
  currentSeasonAndEpisode.season = season
}

function handleSetEpisode(episode: number) {
  currentSeasonAndEpisode.episode = episode
}

function playEpisode({ season, episode }: { season: number; episode: number }) {
  currentSeasonAndEpisode.season = season
  currentSeasonAndEpisode.episode = episode
  setPlayer()
}

function setPlayer() {
  player.value?.handlePlayButton(
    `https://www.2embed.to/embed/tmdb/tv?id=${props.id}&s=${currentSeasonAndEpisode.season + 1}&e=${currentSeasonAndEpisode.episode + 1}`,
    () => {
      if(store.state.favourites.some((item: any) => item.id === props.id.toString())){
        store.methods.favourites.update(props.id.toString(), currentSeasonAndEpisode.season + 1, currentSeasonAndEpisode.episode + 1)
      }
    }
  )
}

onBeforeMount(() => {
  const episode = store.state.favourites.find((item: any) => item.id.toString() === props.id.toString())

  if(!seasons.value?.length) {
    areThereAnyEpisodes.value = false
  } else {
    currentSeasonAndEpisode.season = ((+episode?.season || 1) - 1)
    currentSeasonAndEpisode.episode = ((+episode?.episode || 1) - 1)
  }
})
</script>

<style lang="scss" scoped>
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