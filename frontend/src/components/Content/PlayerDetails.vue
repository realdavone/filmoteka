<template>
  <section class="user-select-none container">
    <div class="outter">
      <div v-if="bg" class="background-image">
        <CoverPoster size="w1920_and_h800_multi_faces" :src="bg" alt="Obrázok v pozadí" :fade-in-on-load="true" />
      </div>
      <div class="content">
        <div class="top-row">
          <div class="left-col">
            <div class="poster">
              <slot name="poster" />
            </div>
            <slot v-if="store.state.credentials.loggedIn" name="feedback">
              <div class="skeleton-text" style="height:28px;width:100px;"></div>
            </slot>
          </div>
          <div class="right-col">
            <slot name="genres">
              <div class="skeleton-text" style="height:calc(1rem);width:120px;"></div>
            </slot>
            <slot name="title">
              <div class="skeleton-text" style="height:calc(1.5rem * 1.1);width:180px;margin-bottom:0.5rem"></div>
            </slot>
            <slot name="subtitle">
              <div class="skeleton-text" style="height:calc(0.75rem * 1.4);width:100px;"></div>
            </slot>
            <slot name="tagline">
              <div class="skeleton-text" style="height:calc(0.75rem * 1.4);width:120px;"></div>
            </slot>
            <div class="overview">
              <slot name="overview">
                <div style="width:100%">
                  <div class="skeleton-text" style="height:calc(0.7rem * 1.4);margin-bottom:0.5rem;"></div>
                  <div class="skeleton-text" style="height:calc(0.7rem * 1.4);"></div>
                </div>
              </slot>
            </div>
          </div>        
        </div>
        <slot name="actionMenu" />
      </div>
    </div>
    <section class="player-details-holder">
      <slot name="player">
        <PlayerPlaceholder />
      </slot>
      <slot name="details">
        <DetailsPlaceholder />
      </slot>
    </section>
  </section>
</template>

<script setup lang="ts">
import { inject } from 'vue'

import PlayerPlaceholder from '../Placeholders/PlayerPlaceholder.vue'
import DetailsPlaceholder from '../Placeholders/DetailsPlaceholder.vue'
import CoverPoster from './CoverPoster.vue'

const store = inject<any>('store')

const { bg } = defineProps<{
  bg?: string | null
}>()
</script>

<style lang="scss" scoped>
section.container{
  display:flex;
  flex-direction:column;
  gap:var(--container-padding);
  margin-top:calc(0px - var(--nav-height));
  div.background-image{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:0;
    -webkit-mask-image: linear-gradient(#00000010, #00000030 50%, transparent);
    mask-image: linear-gradient(#00000010, #00000030 50% transparent);
  }
  div.poster{
    aspect-ratio:2/3;
    min-width:200px;
    max-width:200px;
    background:var(--card-color-hover);
    border-radius:1rem;
    overflow:hidden;
    position:relative;
    box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.75);
  }
  div.outter{
    display:flex;
    flex-direction:column;
    margin:0 calc(0px - var(--container-padding));
    background-repeat:no-repeat;
    background-position:center;
    background-size:cover;
    position:relative;
    padding:calc(var(--nav-height) + var(--container-padding)) var(--container-padding) var(--container-padding);
    div.content{
      display:flex;
      flex-direction:column;
      gap:1.5rem;
      width:100%;
      max-width:1000px;
      align-self:center;
      z-index:1;
      div.top-row{
        display:flex;
        align-items:center;
        width:100%;
        gap:2rem;
        position:relative;
        z-index:1;
      }
    }
  }
  div.right-col{
    --right-col-gap:1.5rem;

    display:flex;
    flex-direction:column;
    align-items:flex-start;
    gap:var(--right-col-gap);
    z-index:1;
    position:relative;
    width:100%;
  }
  div.left-col{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:1rem;
    align-self:flex-start;
  }
}
:slotted(h1.title){
  line-height:1.1;
  font-size:2rem;
  font-weight:700;
  span{
    opacity:0.5;
    font-weight:400;
  }
}
:slotted(span.tagline){
  font-size:0.8rem;
  font-style:italic;
  opacity:0.5;
  &:empty{ display:none }
}
:slotted(span.overview){ font-size:0.85rem }
div.overview{
  display:flex;
  gap:1rem;
  align-items:center;
  align-self:stretch;
}
:slotted(div.under-title){
  span{
    font-size:0.75rem;
    &.rated{
      padding:1px 5px;
      border-radius:0.35rem;
      mix-blend-mode: difference;
      background-color:var(--font-color);
      color:var(--background-color);
      line-height:1;
      margin-right:0.5rem;
      font-weight:900;
    }
  }
}
:slotted(div.genres){
  font-size:0.75rem;
  font-weight:700;
  display:flex;
  column-gap:0.75rem;
  row-gap:0.25rem;
  flex-wrap:wrap;
  a:hover{ opacity:0.75; }
  &:empty{ display:none }
}
div.under-title{
  div{
    display:inline-block;
    font-size:0.8rem;
    vertical-align:middle;
  }
}
section.player-details-holder{
  display:flex;
  gap:var(--container-padding);
  align-items:flex-start;
}
@media screen and (max-width: 1300px) {
  section.player-details-holder{
    flex-direction:column;
    align-items:stretch!important;
  }
}
@media screen and (max-width: 600px){
  div.top-row{ 
    justify-content:start!important;
    gap:1rem!important;
  }
  div.poster{
    min-width:106px!important;
    max-width:106px!important;
  }
  :slotted(span.title){ font-size:1.25rem }
  div.right-col{
    gap:1rem!important;
    align-self:flex-start;
  }
  :slotted(span.overview){ font-size:0.75rem }
}
</style>
