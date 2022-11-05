<template>
  <section v-auto-animate v-if="episodeInfo['name']" class="episode-info user-select-none">
    <div class="title-holder">
      <div class="title">
        <b>{{`${episodeInfo['seasonNumber']}.${episodeInfo['episodeNumber']}`}}</b>
        <span v-if="!loading">{{episodeInfo['name']}}</span>
        <div v-else class="skeleton-text" style="width:50%;"></div>
      </div>
      <span v-if="!loading && episodeInfo['airDate']" class="airdate">{{episodeInfo['airDate']}}</span>
      <div v-else class="skeleton-text" style="width:50px;"></div>
    </div>
    <div v-if="showEpisodeSpoiler" class="thumb-overview">
      <div class="overview">
        <span v-if="!loading">{{episodeInfo['overview']}}</span>
        <template v-else>
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
        </template>
      </div>
      <div class="thumbnail">
        <Transition name="fade">
          <img v-if="episodeInfo['thumbnail'] && !loading" :src="`https://www.themoviedb.org/t/p/w454_and_h254_bestv2${episodeInfo['thumbnail']}`" :alt="episodeInfo['name']">        
        </Transition>
      </div>
    </div>
    <button @click="showEpisodeSpoiler =! showEpisodeSpoiler" class="button-spoiler">
      <span :style="`transform: rotate(${showEpisodeSpoiler ? '90' : '270'}deg)`">&#10094;</span>
    </button>
  </section>
</template>

<script setup>
import _ from '../../utils/main.js'
import { ref, watchEffect } from 'vue'
import getData from '../../api/main.js'

const props = defineProps({ id: String, season: Number, episode: Number })

const episodeInfo = ref({})
const showEpisodeSpoiler = ref(false)
const loading = ref(true)

const getEpisodeInfo = async (id, season, episode) => {
  try {
    loading.value = true
    const data = await getData({ endpoint: `/title/episode/${id}/${season}/${episode}` })
    const translations = _.getTranslations(data['translations']['translations'])

    episodeInfo.value = {
      seasonNumber: data['season_number'],
      episodeNumber: data['episode_number'],
      name: translations?.['data']?.['name'] || data['name'],
      airDate: data['air_date'] !== '' ? new Date(data['air_date']).toLocaleDateString('sk-SK', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' }) : null,
      overview: translations?.['data']?.['overview'] || data?.overview || 'Popis nie je dostupný',
      thumbnail: data?.['still_path'] || null
    }
  } catch (error) { console.log(error) }
  finally{ loading.value = false }
}

watchEffect(() => { getEpisodeInfo(props.id, props.season, props.episode) }, { flush: 'post' })
</script>

<style lang="scss" scoped>
section.episode-info{
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:10px;
  padding:12px 16px;
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
      border-radius:8px;
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