<template>
  <router-link :to="`/${title.type}/${title.id}`" class="title">
    <div class="image-holder">
      <img v-if="title.poster_path" :src="`https://www.themoviedb.org/t/p/w300_and_h300_face${title.poster_path}`" :alt="title.title" loading="lazy">
    </div>
    <section class="details">
      <div class="title-holder">
        <span class="title">{{title.title || title.name}}</span>  
        <span style="color:var(--secondary-text-color)" v-if="title.release_date || title.first_air_date">&#32;({{(new Date(title.release_date || title.first_air_date)).getFullYear()}})</span>
      </div>
      <div v-if="title.vote_average !== undefined" class="rating">
        <span>&starf;</span>
        <span>{{title.vote_average}}</span>
        <span v-if="store.methods.watched.exists({ type: title.type[0].toUpperCase() + title.type.substring(1), id: title.id.toString() })" style="color:var(--theme-color)">&#128065;&#xFE0E;</span>
      </div>
      <div class="overview" v-if="title.overview">{{title.overview}}</div>
    </section>
    <div v-if="title.poster_path" class="background-img">
      <img :src="`https://www.themoviedb.org/t/p/w780${title.poster_path}`" :alt="title.title" loading="lazy">
    </div>
  </router-link>
</template>

<script setup>
import { inject } from 'vue'

const { title } = defineProps({ title: Object })

const store = inject('store')
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
  transition:0.2s ease background;
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
    border-radius:0.5rem;
    overflow:hidden;
    flex-shrink:0;
    img{
      width:100%;
      height:100%;
      object-fit:cover;
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
  &:hover{background:var(--card-color-hover);}
  div.background-img{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:-1;
    opacity:0.1;
    img{
      width:100%;
      height:100%;
      object-fit:cover;
    }
  }
}
@media screen and (max-width: 600px) {
  a.title{
    height:110px;
    div.overview{ display:none!important }
  }
}
</style>