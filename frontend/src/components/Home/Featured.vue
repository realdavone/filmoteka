<template>
  <section class="featured container user-select-none">
    <div v-if="title?.backdrop_path" class="background-image">
      <img :src="`https://image.tmdb.org/t/p/w1280${title?.backdrop_path}`" alt="">
    </div>
    <Title style="position:relative;z-index:2">Vybrané</Title>
    <section class="title-holder">
      <div class="poster">
        <img v-if="title?.poster_path" :src="`https://www.themoviedb.org/t/p/w300${title?.poster_path}`" :alt="title?.name || title?.title">
      </div>
      <div class="content">
        <div v-if="title?.name || title?.title" class="title">{{title?.name || title?.title}}</div>
        <div v-else class="skeleton" style="height:1.75rem;width:25%;min-width:180px;"></div>

        <div v-if="title?.media_type" class="sub-title">
          <TypeIcon :type="title?.media_type"/>
          <span>{{title?.original_language}}</span>
        </div>
        <div v-else class="skeleton" style="height:1rem;width:20%;min-width:180px;"></div>

        <div v-if="title?.vote_average !== undefined" class="rating">
          <span>&starf;</span>
          <span>{{Math.round(title?.vote_average * 10) / 10}}</span>
        </div>
        <div v-else class="skeleton" style="height:1.75rem;width:60px;"></div>

        <div v-if="title?.overview" class="overview">{{title?.overview}}</div>
        <div v-else class="skeleton" style="height:1rem;width:80%;"></div>

        <button class="go-to-button" @click="$router.push(`/${title?.media_type}/${title?.id}`)">
          <span>&#9655;</span>
          <span>Prehrať</span>
        </button>
      </div>      
    </section>
  </section>
</template>

<script setup>
import TypeIcon from '../Content/TypeIcon.vue'
import Title from '../Content/Title.vue'

const { title } = defineProps({ title: Object })
</script>

<style lang="scss" scoped>
section.featured{
  background-size:cover!important;
  background-repeat:no-repeat!important;
  background-position:center!important;
  padding-top:var(--container-padding);
  padding-bottom:var(--container-padding);
  position:relative;
  div.background-image{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    -webkit-mask-image: linear-gradient(black, transparent 50%);
    mask-image: linear-gradient(black, transparent 50%);
    img{
      width:100%;
      height:100%;
      object-fit:cover;
    }
  }
  div.skeleton{
    background:white;
    border-radius:4px;
  }
  section.title-holder{
    position: relative;
    z-index:1;
    display:flex;
    align-items:center;
    gap:2rem;
    div.poster{
      min-width:200px;
      max-width:200px;
      aspect-ratio:2/3;
      overflow:hidden;
      border-radius:16px;
      background-color:var(--theme-color);
      img{
        width:100%;
        height:100%;
        object-fit:cover;
      }
    }
    div.content{
      display:flex;
      flex-direction:column;
      gap:1rem;
      flex-basis:100%;
      div.title{
        font-weight:700;
        font-size:1.75rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      div.sub-title{
        display:flex;
        align-items:center;
        gap:0.5rem;
        span:nth-child(2){
          font-size:0.75rem;
          text-transform:uppercase;
          font-weight:900;
        }
        span:nth-child(3){
          font-size:0.85rem;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      div.genres{
        font-size:0.65rem;
        display:flex;
        flex-wrap:wrap;
        gap:0.5rem;
        align-items:center;
        color:var(--font-color-dark);
        button{
          background:var(--theme-color);
          padding:2px 8px 3px;
          border-radius:12px;
          font-size:inherit;
        }
      }
      div.rating{
        display:flex;
        align-items:center;
        gap:10px;
        span:nth-child(1){
          color:goldenrod;
          font-weight:700;
          font-size:1.25rem;
          max-width:20px;
          overflow:hidden;
        }
        span:nth-child(2){ font-weight:700 }
      }
      div.overview{
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size:0.85rem;
        text-align:justify;
      }
      button.go-to-button{
        align-self:flex-start;
        background-color:var(--theme-color);
        padding:4px 10px;
        border-radius:8px;
        font-weight:700;
        display:flex;
        align-items:center;
        gap:8px;
        color:var(--font-color-dark);
        span:nth-child(1){ font-size:1rem }
        span:nth-child(2){ font-size:0.85rem }
      }
    }
  }
}
@media screen and (max-width: 600px) {
  div.poster{ display:none }
  div.title{ font-size:1.25rem!important }
  section.title-holder{
    gap:1rem!important
  }
  button.go-to-button{
    align-self:stretch!important;
    justify-content:center;
  }
  div.overview{ font-size:0.75rem!important }
}
</style>
