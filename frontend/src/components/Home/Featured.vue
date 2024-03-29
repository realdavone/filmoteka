<template>
  <section class="featured-section user-select-none">
    <TransitionGroup
      name="slideshow"
      tag="div"
    >
      <template v-for="title, i in props.titles" :key="title.id">
        <div
          v-if="activeIndex === i"
          class="featured container"
        >
          <div
            v-if="title && title?.backdrop_path"
            class="background-image"
          >
            <CoverPoster
              style="filter:blur(3px)"
              :src="title?.backdrop_path"
              size="w1440_and_h320_multi_faces"
              alt="Obrázok v pozadí"
              :fadeInOnLoad="true"
            />
          </div>
          <div class="title-holder">
            <div class="poster">
              <Poster
                v-if="title && title?.poster_path"
                :src="title?.poster_path"
                :alt="title?.media_type === 'movie' ? title?.title : title?.name"
                :fadeInOnLoad="true"
              />
            </div>
            <div class="content">
              <div
                v-font:large
                v-if="title && title?.media_type"
                class="title"
              >{{ title?.media_type === 'movie' ? title?.title : title?.name }}</div>
              <div v-if="title && title?.overview" class="overview">
              <span v-font:medium>{{ title?.overview }}</span>
              </div>
              <BasicButton
                v-if="title"
                class="cta"
                @handleClick="handleShowTitle(() => $router.push(`/${title?.media_type}/${title?.id}`))"
              >Zobraziť viac</BasicButton>
            </div>      
          </div>
        </div>
      </template>
    </TransitionGroup>
    <CircleButtonsControl
      :number-of-buttons="titles?.length"
      :active-index="activeIndex"
      @changeButton="handleSelect"
    />
  </section>
</template>

<script setup lang="ts">
import { Title } from '../../types/title'
import { onActivated, onDeactivated, ref } from 'vue'
import BasicButton from '../Buttons/BasicButton.vue'
import Poster from '../Content/Poster.vue'
import CoverPoster from '../Content/CoverPoster.vue'
import CircleButtonsControl from '../Content/CircleButtonsControl.vue'

const activeIndex = ref(0)
const hasIntervalBeenStopped = ref(false)
let interval: number

const props = defineProps<{ titles: Array<Title> | null }>()

function handleSelect({ index, clear }: {
  index: number
  clear?: boolean
}) {
  activeIndex.value = index
  clear && clearInterval(interval)
}

function handleShowTitle(callback?: (...args: unknown[]) => void) {
  clearInterval(interval)
  hasIntervalBeenStopped.value = true
  callback?.()
}

function startInterval() {
  interval = setInterval(() => {
    if(!props.titles?.length) {
      clearInterval(interval)
      return
    }
    if(activeIndex.value + 1 !== props.titles?.length) handleSelect({ index: activeIndex.value + 1 })
    else handleSelect({ index: 0 })
  }, 10000)
}

onDeactivated(() => clearInterval(interval))
onActivated(() => !hasIntervalBeenStopped.value && startInterval())
</script>

<style lang="scss" scoped>
section.featured-section{
  margin-top: calc(0px - var(--nav-height));
  min-height: 480px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
}
div.featured{
  padding-top:calc(var(--nav-height) + var(--container-padding));
  padding-bottom:calc(var(--container-padding) + 30px);
  position:relative;
  width: 100%;
  isolation: isolate;
  background-color: var(--background-color);
  div.background-image{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    -webkit-mask-image: linear-gradient(#00000080, #00000040 70%, transparent);
    mask-image: linear-gradient(#00000080, #00000040 70%, transparent);
  }
  div.title-holder{
    position: relative;
    z-index:1;
    display:flex;
    align-items:center;
    gap:var(--container-padding);
    margin:0 auto;
    max-width:900px;
    div.poster{
      min-width:200px;
      max-width:200px;
      aspect-ratio:2/3;
      overflow:hidden;
      border-radius:8px;
      background-color:var(--card-color);
      box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.75);
    }
    div.content{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
      flex-basis: 100%;
      div.title{
        font-weight: 700;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 1.1;
      }
      div.overview{
        display:flex;
        align-items:center;
        gap: 15px;
        span{
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}

.slideshow-enter-from, .slideshow-leave-to{
  opacity: 0;
  display: none;
}
.slideshow-enter-active, .slideshow-leave-active{
  display: initial;
  transition: 0.7s ease opacity;
  position: absolute!important;
}
.slideshow-enter-to, .slideshow-leave-from{
  opacity: 1;
}

@media screen and (max-width: 600px) {
  section.featured-section{
    min-height: 310px;
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
    align-self: flex-end;
  }
}
</style>
