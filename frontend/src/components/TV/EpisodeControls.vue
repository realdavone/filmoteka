<template>
  <section v-font:medium class="episode-controls">
    <button
      :disabled="props.current.season === 0 && props.current.episode === 0"
      class="button-control"
      @click="handleButtonControls('PREVIOUS')"
    >
      <span class="material-icons-outlined">skip_previous</span>
    </button>
    <div class="seasons">
      <div
        class="active"
        role="button"
        @click="handleOpenSeasonMenu"
      >{{ props.seasons && props.seasons[props.current.season].name }}</div>
      <div
        ref="seasonsMenu"
        class="season-menu"
        v-show="seasonMenuOpened"
      >
        <div 
          :class="`season ${props.current.season === season.season_number - 1 && 'active'}`"
          v-for="season in props.seasons"
          :key="season.id"
          role="button"
          @click="() => {
            $emit('setSeason', season.season_number - 1)
            seasonMenuOpened = !seasonMenuOpened
          }"
        >{{ season.name }}</div>
      </div>
    </div>
    <div class="episodes">
      <div
        class="active"
        role="button"
        @click="handleOpenEpisodeMenu"
      >{{ `Epizóda ${props.current.episode + 1}` }}</div>
      <div
        ref="episodesMenu"
        class="episode-menu"
        v-show="episodeMenuOpened"
      >
        <div
        :class="`episode ${props.current.episode === index && 'active'}`"
          v-for="episode, index in numberOfEpisodeInCurrentSeason"
          :key="episode"
          role="button"
          @click="() => {
            $emit('setEpisode', index)
            episodeMenuOpened = !episodeMenuOpened
          }"
        >{{ `Epizóda ${index + 1}` }}</div>
      </div>
    </div>
    <button
      class="button-control"
      @click="handleButtonControls('PLAY')"
    >
      <span class="material-icons-outlined">play_arrow</span>
    </button>
    <button
      :disabled="(props.current.episode + 1) === numberOfEpisodeInCurrentSeason.length && (props.current.season + 1) === props.seasons?.length"
      class="button-control"
      @click="handleButtonControls('NEXT')"
    >
      <span class="material-icons-outlined">skip_next</span>
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits(['setSeason', 'setEpisode', 'setPlayer'])

const props = defineProps<{
  seasons: {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
  }[] | undefined
  current: {
    season: number
    episode: number
  }
}>()

const seasonMenuOpened = ref(false)
const episodeMenuOpened = ref(false)

const seasonsMenu = ref<HTMLDivElement | null>(null)
const episodesMenu = ref<HTMLDivElement | null>(null)

const numberOfEpisodeInCurrentSeason = computed(() => (new Array(props.seasons![props.current.season].episode_count)))

function handleOpenSeasonMenu() {
  seasonMenuOpened.value = !seasonMenuOpened.value
}

function handleOpenEpisodeMenu() {
  episodeMenuOpened.value = !episodeMenuOpened.value
}

function handleButtonControls(action: 'PREVIOUS' | 'PLAY' | 'NEXT') {
  switch(action) {
    case 'PREVIOUS': {
      if(props.current.episode !== 0)
        emit('setEpisode', props.current.episode - 1) 
      else if(props.current.season === 0 && props.current.episode === 0)
        return
      else {
        emit('setSeason', props.current.season - 1)
        emit('setEpisode', numberOfEpisodeInCurrentSeason.value.length - 1)
      }
      break
    }
    case 'PLAY': {
      emit('setPlayer')
      break
    }
    case 'NEXT': {
      if((props.current.episode + 1) === numberOfEpisodeInCurrentSeason.value.length && (props.current.season + 1) === props.seasons?.length)
        return
      if((props.current.episode + 1) !== numberOfEpisodeInCurrentSeason.value.length)
        emit('setEpisode', props.current.episode + 1)
      else {
        emit('setSeason', props.current.season + 1)
        emit('setEpisode', 0)
      }
      break
    }
  }
}

onClickOutside(seasonsMenu, () => seasonMenuOpened.value = false)
onClickOutside(episodesMenu, () => episodeMenuOpened.value = false)
</script>

<style scoped lang="scss">
section.episode-controls{
  display: flex;
  align-items: center;
  gap: 10px;

  button.button-control{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    min-width: 35px;
    aspect-ratio: 1;

    span{
      font-size: 25px;
    }

    &:not(:disabled):hover {
      background-color: var(--card-color-hover);
    }

    &:disabled {
      cursor: initial;
      opacity: 0.5;
    }
  }

  div.seasons, div.episodes {
    position: relative;
    width: 100%;

    &>div.active {
      width: 100%;
      cursor: pointer;
      font-weight: 700;
    }

    div.season-menu, div.episode-menu {
      background-color: var(--background-color);
      position: absolute;
      z-index: 10;
      width: 100%;
      box-shadow: var(--basic-box-shadow);
      border-radius: 4px;
      max-height: 20vh;
      overflow: auto;

      div.season, div.episode {
        padding: 5px;
        cursor: pointer;

        &:hover{
          background-color: var(--card-color);
        }

        &.active{
          background-color: var(--card-color-hover);
        }
      }
    }
  }
}
</style>