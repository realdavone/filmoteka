<template>
  <router-link
    tabindex="0"
    :title="item.title"
    :class="`title-card user-select-none ${watchedStore.exists({ type: item.media_type, id: item.id.toString() }) ? 'seen' : ''}`"
    :to="`/${item.media_type}/${item.id}`"
  >
    <div class="poster">
      <div v-if="!item.poster_path">{{ item.title }}</div>
      <Poster
        :src="item.poster_path ?? null"
        :alt="item.title"
        :fadeInOnLoad="true"
      />
      <div class="hover">
        <span class="material-icons-outlined">play_arrow</span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import Poster from './Poster.vue'

import { useWatchedStore } from '../../store/watched'

const watchedStore = useWatchedStore()

const { item } = defineProps<{
  item: {
    media_type: 'movie' | 'tv'
    id: string | number
    poster_path?: string
    title: string
  }
}>()
</script>

<style lang="scss" scoped>
a.title-card{
  overflow:hidden;
  background:var(--card-color);
  border-radius: 10px;
  position:relative;
  transition: 0.2s ease background;
  scroll-snap-align:start;
  isolation:isolate;
  div.poster{
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    aspect-ratio:2/3;
    overflow:hidden;
    position: relative;
    img.poster{
      width:100%;
      aspect-ratio:2/3;
      transition:0.6s ease transform, 0.3s ease opacity;
      object-fit:cover;
      opacity:0;
    }
    div.hover{
      position:absolute;
      top:0;
      left:0;
      background:#00000080;
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      opacity:0;
      transition:0.3s ease opacity;

      span{
        color:var(--font-color-dark);
        transition:0.3s ease transform, 0.8s ease box-shadow;
        border-radius:50%;
        transform:scale(1.35);
        box-shadow: inset 0px 0px 0px 6px var(--theme-color);
        outline:2px solid var(--theme-color);
        outline-offset:6px;
        display:inline-block;
        width:54px;
        height:54px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size: 40px!important;
      }
    }
    &:active{
      div.hover{ 
        span{ box-shadow: inset 0px 0px 0px 200px var(--theme-color) }
      }
    }
  }
  &.seen::before{
    font-family:'Material Icons';
    content:'visibility';
    color:var(--theme-color);
    position:absolute;
    width:100%;
    max-width:100%;
    top:0;
    z-index:10;
    text-align:right;
    padding:3px 7px;
    box-sizing:border-box;
    font-size: var(--large-font-size);
  }
}
@media (hover: hover) {
  div.poster:hover{
    div.hover{
      opacity:1!important;
      
      span{
        transform:scale(1)!important;
      }
    }
    img{
      transform:scale(1.05)
    }
  }
}
</style>