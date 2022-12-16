<template>
  <router-link tabindex="0" :to="`/${title.media_type}/${title.id}`" class="title">
    <div class="image-holder">
      <Poster :src="title.poster_path || null" :alt="title.title" fade-in-on-load aspect-ratio="1" />
    </div>
    <section class="details">
      <div class="title-holder">
        <span class="title">{{title.title}}</span>  
        <span style="color:var(--secondary-text-color)" v-if="title.release_date">&#32;({{(new Date(title.release_date)).getFullYear()}})</span>
      </div>
      <div v-if="title.vote_average" class="rating">
        <Rating :rating="title.vote_average" size="small" />
        <span v-if="store.methods.watched.exists({ type: title.media_type, id: title.id.toString() })" style="color:var(--theme-color);font-size:1rem;" class="material-icons icon">visibility</span>
      </div>
      <div class="overview" v-if="title.overview">{{title.overview}}</div>
    </section>
    <div v-if="title.backdrop_path" class="background-img">
      <CoverPoster :src="title.backdrop_path" :alt="title.title" :fade-in-on-load="true" size="w1440_and_h320_multi_faces" />
    </div>
  </router-link>
</template>

<script setup lang="ts">
import Rating from '../Content/Rating.vue'
import Poster from '../Content/Poster.vue'
import CoverPoster from '../Content/CoverPoster.vue'

import { inject } from 'vue'

const { title } = defineProps<{
  title: {
    media_type: 'movie' | 'tv'
    id: string | number
    poster_path?: string
    title: string
    release_date?: string
    vote_average: number
    overview?: string
    backdrop_path?: string
  }
}>()

const store = inject<any>('store')
</script>

<style lang="scss" scoped>
a.title{
  display:flex;
  height:140px;
  width:100%;
  align-items:center;
  background:var(--card-color);
  border-radius:0.5rem;
  user-select:none;
  gap:1rem;
  overflow:hidden;
  padding:1rem;
  position: relative;
  isolation:isolate;
  div.image-holder{
    height:100%;
    aspect-ratio:1;
    background:var(--card-color-hover);
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:1rem;
    overflow:hidden;
    flex-shrink:0;
    img{
      width:100%;
      height:100%;
      object-fit:cover;
      opacity:0;
      transition:0.4s ease opacity;
    }
  }
  section.details{
    padding:5px 10px 5px 0;
    display:flex;
    justify-content:center;
    flex-direction:column;
    gap:0.5rem;
    user-select:none;
    width:100%;
    div.title-holder{
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size:0.9rem;
      line-height:1.2;
      span.title{ font-weight:700 }
    }
    div.rating{
      display:flex;
      align-self:flex-start;
      align-items:center;
      gap:5px;
      line-height:1;
      span:nth-child(1){
        font-size:1.25rem;
        color:darkgoldenrod;
      }
      span:nth-child(2){ font-weight:700; font-size:0.75rem; }
      span:nth-child(3){ font-size:1.5rem }
    }
    div.overview{
      color:var(--secondary-text-color);
      text-align:justify;
      font-size:var(--overview-font-size);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size:0.75rem;
    }
  }
  &:hover{
    div.background-img{ opacity:0.25 }
  }
  div.background-img{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:-1;
    opacity:0.1;
    transition:0.2s ease opacity;
  }
}
@media screen and (max-width: 600px) {
  a.title{
    height:110px;
    div.overview{ display:none!important }
  }
}
</style>
