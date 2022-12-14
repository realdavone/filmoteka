<template>
  <router-link tabindex="0" :title="item.title" :class="`title-card user-select-none ${store.methods.watched.exists({ type: item.media_type, id: item.id }) ? 'seen' : ''}`" :to="`/${item.media_type}/${item.id}`">
    <div class="poster">
      <Poster :src="item.poster_path || null" :alt="item.title" :fadeInOnLoad="true" />
      <div class="hover">
        <span class="material-icons">play_arrow</span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import Poster from './Poster.vue'

import { inject } from 'vue'

const store = inject<any>('store')
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
  border-radius:1rem;
  position:relative;
  transition:0.2s ease background;
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
      transition:0.6s ease transform, 0.4s ease opacity;
      object-fit:cover;
      opacity:0;
    }
    div.hover{
      position:absolute;
      top:0;
      left:0;
      background:#000000a0;
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      opacity:0;
      transition:0.4s ease opacity;
      span{
        color:var(--font-color-dark);
        font-size:2.5rem;
        transition:0.4s ease transform, 0.8s ease box-shadow;
        border-radius:50%;
        transform:scale(1.35);
        box-shadow: inset 0px 0px 0px 0.5rem var(--theme-color);
        outline:0.25rem solid var(--theme-color);
        outline-offset:0.35rem;
        display:inline-block;
        width:64px;
        height:64px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-weight:900;
      }
    }
    &:hover{
      div.hover{
        opacity:1;
        span{ transform:scale(1) }
      }
      img{ transform:scale(1.05) }
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
    font-size:1.5rem;
    position:absolute;
    width:100%;
    max-width:100%;
    top:0;
    z-index:10;
    text-align:right;
    padding:0.25rem 0.5rem;
    box-sizing:border-box;
  }
}
@media screen and (max-width: 600px) {
  div.poster{ pointer-events:none }
}
</style>