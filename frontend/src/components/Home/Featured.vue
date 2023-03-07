<template>
  <section class="featured-section user-select-none" v-auto-animate>
    <template v-for="title, i in props.titles" :key="title.id">
      <div v-if="active === i" class="featured container">
        <div v-if="title && title?.backdrop_path" class="background-image">
          <CoverPoster style="filter:blur(3px)" :src="title?.backdrop_path" size="w1440_and_h320_multi_faces" alt="Obrázok v pozadí" :fadeInOnLoad="true" />
        </div>
        <div class="title-holder">
          <div class="poster">
            <Poster v-if="title && title?.poster_path" :src="title?.poster_path" :alt="title?.media_type === 'movie' ? title?.title : title?.name" :fadeInOnLoad="true" />
          </div>
          <div class="content">
            <div v-if="title && title?.media_type" class="title">{{ title?.media_type === 'movie' ? title?.title : title?.name }}</div>
            <div v-if="title && title?.overview" class="overview">
              <Rating v-if="title!.vote_average" size="large" :rating="Math.round(title!.vote_average * 10) / 10"/>
              <span>{{ title?.overview }}</span>
            </div>
            <BasicButton v-if="title" class="cta" @handleClick="$router.push(`/${title?.media_type}/${title?.id}`)">Zobraziť viac</BasicButton>
          </div>      
        </div>
      </div>
    </template>
    <CircleButtonsControl :number-of-buttons="titles?.length" :active-index="active" @changeButton="handleSelect" />
  </section>
</template>

<script setup lang="ts">
import { Title } from '../../types/title'
import { ref } from 'vue'
import BasicButton from '../Buttons/BasicButton.vue'
import Rating from '../Content/Rating.vue'
import Poster from '../Content/Poster.vue'
import CoverPoster from '../Content/CoverPoster.vue'
import CircleButtonsControl from '../Content/CircleButtonsControl.vue'

const active = ref(0)

const props = defineProps<{ titles: Array<Title> | null }>()

function handleSelect({ index, clear }: { index: number, clear?: boolean }){
  active.value = index
  clear && clearInterval(interval)
}

const interval = setInterval(() => {
  if(!props.titles?.length) return clearInterval(interval)
  if(active.value + 1 !== props.titles?.length) handleSelect({ index: active.value + 1 })
  else handleSelect({ index: 0 })
}, 10000)
</script>

<style lang="scss" scoped>
section.featured-section{
  margin-top: calc(0px - var(--nav-height));
  min-height: 480px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
div.featured{
  padding-top:calc(var(--nav-height) + var(--container-padding));
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
  div.title-holder{
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
      border-radius:0.5rem;
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
    }
  }
}
@media screen and (max-width: 600px) {
  section.featured-section{
    min-height: 300px;
  }
  div.poster{
    align-self: flex-start;
    min-width:80px!important;
    max-width:80px!important;
  }
  section.title-holder{
    gap:1rem!important
  }
  .cta{
    align-self:stretch;
  }
  div.overview{
    font-size:0.75rem!important;
  }
}
</style>
