<template>
  <section class="featured container user-select-none">
    <div v-if="props.title && props.title?.backdrop_path" class="background-image">
      <CoverPoster class="unblur-mobile" :src="props.title?.backdrop_path" size="w1440_and_h320_multi_faces" alt="Obrázok v pozadí" :fadeInOnLoad="true" />
    </div>
    <section class="title-holder">
      <div class="poster">
        <Poster v-if="props.title && props.title?.poster_path" :src="props.title?.poster_path" :alt="title?.title" :fadeInOnLoad="true" />
      </div>
      <div class="content">
        <div v-if="props.title && props.title?.media_type" class="title">{{title?.title}}</div>
        <div v-else class="skeleton-text" style="height:1.75rem; width:25%; min-width:180px"></div>

        <div v-if="props.title && props.title?.overview" class="overview">
          <Rating v-if="props.title!.vote_average" size="large" :rating="Math.round(props.title!.vote_average * 10) / 10"/>
          <span>{{props.title?.overview}}</span>
        </div>
        <div v-else class="skeleton-text" style="height:1rem;width:80%;"></div>

        <BasicButton v-if="props.title" class="cta" @handleClick="$router.push(`/${props.title?.media_type}/${props.title?.id}`)">Zobraziť viac</BasicButton>
      </div>      
    </section>
  </section>
</template>

<script setup lang="ts">
import BasicButton from '../Buttons/BasicButton.vue'
import Rating from '../Content/Rating.vue'
import Poster from '../Content/Poster.vue'
import CoverPoster from '../Content/CoverPoster.vue'

const props = defineProps<{
  title: {
    backdrop_path?: string | null
    poster_path?: string | null
    media_type?: 'tv' | 'movie'
    title?: string
    overview?: string
    vote_average?: number
    id?: number
  } | null
}>()
</script>

<style lang="scss" scoped>
section.featured{
  padding-top:calc(var(--nav-height) + var(--container-padding));
  margin-top:calc(0px - var(--nav-height));
  padding-bottom:calc(var(--container-padding) + 2rem);
  position:relative;
  div.background-image{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    -webkit-mask-image: linear-gradient(#00000030, #00000080 50%, transparent);
    mask-image: linear-gradient(#00000030, #00000080 50%, transparent);
  }
  section.title-holder{
    position: relative;
    z-index:1;
    display:flex;
    align-items:center;
    gap:2rem;
    margin:0 auto;
    max-width:900px;
    div.poster{
      min-width:200px;
      max-width:200px;
      aspect-ratio:2/3;
      overflow:hidden;
      border-radius:16px;
      background-color:var(--card-color);
      box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.75);
    }
    div.content{
      display:flex;
      flex-direction:column;
      align-items:flex-start;
      gap:1rem;
      flex-basis:100%;
      div.title{
        font-weight:700;
        font-size:1.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height:1;
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
        gap:0.5rem;
        span:nth-child(1){
          color:goldenrod;
          font-weight:700;
          font-size:1.25rem;
          max-width:20px;
          overflow:hidden;
        }
        span:nth-child(2){ font-weight:700 }
        span:nth-child(4){
          font-size:0.75rem;
          text-transform:uppercase;
          font-weight:900;
        }
      }
      div.overview{
        display:flex;
        align-items:center;
        gap:1rem;
        span{
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size:0.85rem;
        }
      }
      button.go-to-button{
        align-self:flex-start;
        background-color:var(--theme-color);
        padding:0.5rem 0.75rem;
        border-radius:0.5rem;
        font-weight:700;
        display:flex;
        align-items:center;
        gap:8px;
        color:var(--font-color-dark);
        span{ font-size:0.75rem }
      }
    }
  }
}
.unblur-mobile{ filter:blur(5px) }
@media screen and (max-width: 600px) {
  div.poster{ display:none }
  section.title-holder{
    gap:1rem!important
  }
  .cta{ align-self:center; }
  div.overview{ font-size:0.75rem!important }
  .unblur-mobile{ filter:blur(0px)!important }
}
</style>
