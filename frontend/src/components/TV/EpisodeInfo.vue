<template>
  <section v-auto-animate v-if="episodeInfo['name']" class="episode-info user-select-none">
    <div class="title-holder">
      <div class="title">
        <b>{{`${episodeInfo['seasonNumber']}.${episodeInfo['episodeNumber']}`}}</b>
        <span>{{episodeInfo['name']}}</span>
      </div>
      <span v-if="episodeInfo['airDate']" class="airdate">{{episodeInfo['airDate']}}</span>
    </div>
    <div v-if="showEpisodeSpoiler" class="thumb-overview">
      <div class="overview">
        <span>{{episodeInfo['overview']}}</span>
      </div>
      <div class="thumbnail">
        <img v-if="episodeInfo['thumbnail']" :src="`https://www.themoviedb.org/t/p/w454_and_h254_bestv2${episodeInfo['thumbnail']}`" :alt="episodeInfo['name']">
        <div v-else></div>
      </div>
    </div>
    <button @click="showEpisodeSpoiler =! showEpisodeSpoiler" class="button-spoiler">
      <span>{{`${showEpisodeSpoiler ? 'Skry' : 'Zobraz'}`}} prehľad</span>
      <span :style="`transform: rotate(${showEpisodeSpoiler ? '90' : '270'}deg)`">&#10094;</span>
    </button>
  </section>
</template>

<script setup>
import _ from '../../utils/main.js'
import { onBeforeMount, ref, watch } from 'vue'
import getData from '../../api/main.js'

const props = defineProps({
  id: String,
  season: Number,
  episode: Number
})

const episodeInfo = ref({})
const showEpisodeSpoiler = ref(false)

onBeforeMount(() => { getEpisodeInfo(props.id,props.season,props.episode) })

watch(props, val => { getEpisodeInfo(val.id,val.season,val.episode) })

const getEpisodeInfo = async (id, season, episode) => {
  try {
    const data = await getData({ endpoint: `/episode-info/${id}/${season}/${episode}` })
    
    const translations = _.getTranslations(data['translations']['translations'])

    episodeInfo.value = {
      seasonNumber: data['season_number'],
      episodeNumber: data['episode_number'],
      name: translations.length > 0 && translations[0]['data']['name'] !== '' ? translations[0]['data']['name'] : data['name'],
      airDate: data['air_date'] !== '' ? new Date(data['air_date']).toLocaleDateString('sk-SK', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' }) : null,
      overview: translations.length > 0 ? translations[0]['data']['overview'] : data.overview || 'Popis nie je dostupný',
      thumbnail: data['still_path'] !== '' ? data['still_path'] : null
    }
  } catch (error) { console.log(error) }
}
</script>

<style lang="scss" scoped>
section.episode-info{
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:10px;
  padding:12px 16px;
  border-bottom-left-radius:8px;
  border-bottom-right-radius:8px;
  background:var(--card-color);
  transition:0.2s ease height;
  overflow:hidden;
  div.title-holder{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    align-self:stretch;
    gap:10px;
    div.title{
      display:flex;
      align-items:center;
      gap:10px;
      b{ color:var(--theme-color) }
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
      color:var(--secondary-text-color)
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
      img{
        height:100%;
        width:100%;
        object-fit:cover;
      }
      div{
        width:100%;
        height:100%;
        background:var(--card-color-hover);
      }
    }
    div.overview{
      width:100%;
      max-height:127px;
      overflow:auto;
      padding-right:5px;
      line-height:1.1;
      span{
        padding-right:10px;
        font-size:var(--overview-font-size);
      }
    }
  }
  button.button-spoiler{
    color:var(--theme-color);
    align-self:center;
    display:flex;
    align-items:center;
    gap:0.75rem;
    line-height:1;
    white-space:nowrap;
    span:nth-child(1){
      font-family: 'Oswald', sans-serif;
      text-transform:uppercase;
      font-size:0.7rem;
      font-weight:900;
    }
    span:nth-child(2){ transition:0.2s ease transform }
  }
}

@media screen and (max-width: 600px) {
  div.thumbnail{display:none!important;}
  section.episode-info{padding:10px;}
}
</style>