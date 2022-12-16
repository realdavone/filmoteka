<template>
  <section v-auto-animate class="episode-info user-select-none">
    <div class="title-holder">
      <div class="title">
        <template v-if="!loading">
          <b>{{`${episodeInfo?.season_number}.${episodeInfo?.episode_number}`}}</b>
          <span>{{episodeInfo?.name}}</span>            
        </template>
        <div v-else class="skeleton-text" style="width:50%;height:1rem;"></div>
      </div>
      <span v-if="!loading && episodeInfo?.air_date" class="airdate">{{new Date(episodeInfo['air_date']).toLocaleDateString('sk-SK', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' })}}</span>
      <div v-else class="skeleton-text" style="width:50px;align-self:center;"></div>
    </div>
    <div v-if="showEpisodeSpoiler" class="thumb-overview">
      <div class="overview">
        <span v-if="!loading">{{episodeInfo!.overview.length > 0 ? episodeInfo?.overview : 'Popis nedostupný'}}</span>
        <template v-else>
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
        </template>
      </div>
      <div class="thumbnail">
        <Transition name="fade">
          <img v-if="episodeInfo?.still_path && !loading" :src="`https://www.themoviedb.org/t/p/w454_and_h254_bestv2${episodeInfo?.still_path}`" :alt="episodeInfo['name']">        
        </Transition>
      </div>
    </div>
    <button @click="showEpisodeSpoiler =! showEpisodeSpoiler" class="button-spoiler">
      <span :style="`transform: rotate(${showEpisodeSpoiler ? '90' : '270'}deg)`">&#10094;</span>
    </button>
  </section>
</template>

<script setup lang="ts">
import _ from '../../utils/main'
import { ref, watchEffect } from 'vue'
import getData from '../../api/main'

import { EpisodeType, EpisodeTranslation } from '../../types/episode'

const props = defineProps<{
  id: number
  season: number
  episode: number
}>()

const episodeInfo = ref<EpisodeType | null>(null)

const showEpisodeSpoiler = ref(false)
const loading = ref(true)

const getEpisodeInfo = async ({
  id,
  season,
  episode
}: {
  id: number
  season: number,
  episode: number
}) => {
  try {
    loading.value = true
    episodeInfo.value = await getData<EpisodeType>({ endpoint: `/title/episode/${id}/${season}/${episode}` })
    
    const translations = _.getTranslations<EpisodeTranslation>(episodeInfo.value.translations.translations, 'iso_639_1', ['sk', 'cz', 'en'])

    episodeInfo.value = {
      ...episodeInfo.value,
      name: translations?.data.name || `Epizóda ${episodeInfo.value.episode_number}`,
      overview: translations?.data.overview || episodeInfo.value.overview
    }
  } catch (error) { console.log(error) }
  finally{ loading.value = false }
}

watchEffect(() => { getEpisodeInfo({ id: props.id, season: props.season, episode: props.episode }) }, { flush: 'post' })
</script>

<style lang="scss" scoped>
section.episode-info{
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:1rem;
  padding:1rem;
  border-radius:1rem;
  background:var(--card-color);
  transition:0.2s ease height;
  overflow:hidden;
  div.title-holder{
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    align-self:stretch;
    gap:10px;
    div.title{
      display:flex;
      align-items:center;
      gap:10px;
      width:90%;
      min-height:23px;
      b{ 
        font-family:monospace,'Roboto Mono';
        color:var(--theme-color);
      }
      span{
        font-weight:700;
        font-size:inherit;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    span.airdate{
      margin-top:3px;
      font-size:0.8rem;
      color:var(--secondary-text-color);
      white-space:nowrap;
    }
  }
  div.thumb-overview{
    display:flex;
    align-items:flex-start;
    gap:20px;
    justify-content:space-between;
    width:100%;
    div.thumbnail{
      width:227px;
      min-width:227px;
      height:127px;
      min-height:127px;
      overflow:hidden;
      border-radius:1rem;
      display:flex;
      justify-content:center;
      align-items:center;
      background:var(--card-color-hover);
      img{
        height:100%;
        width:100%;
        object-fit:cover;
      }
    }
    div.overview{
      width:100%;
      height:127px;
      min-height:127px;
      overflow:auto;
      padding-right:5px;
      line-height:1.1;
      span{
        padding-right:10px;
        font-size:var(--overview-font-size);
      }
      div{ margin-bottom:0.25rem }
    }
  }
  button.button-spoiler{
    color:var(--theme-color);
    align-self:center;
    display:flex;
    align-items:center;
    gap:0.75rem;
    line-height:0.5;
    white-space:nowrap;
    font-size:1.5rem;
    span{ transition:0.2s ease transform }
  }
}

@media screen and (max-width: 600px) {
  div.thumbnail{display:none!important;}
  section.episode-info{padding:10px;}
}
</style>