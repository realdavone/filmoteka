<template>
  <section class="user-select-none container">
    <div class="outter">
      <div v-if="bg" class="background-image">
        <img @error="bg = false" :src="`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${bg}`" alt="Obrázok v pozadí" draggable="false">
      </div>
      <div class="left-col">
        <div class="poster">
          <slot name="poster" />
        </div>
      </div>
      <div class="right-col">
        <div>
          <slot name="title">
            <div class="skeleton-text" style="height:calc(1.5rem * 1.1);width:180px;margin-bottom:0.5rem"></div>
          </slot>
          <slot name="subtitle">
            <div class="skeleton-text" style="height:calc(0.75rem * 1.4);width:100px;"></div>
          </slot>
        </div>
        <slot name="tagline">
          <div class="skeleton-text" style="height:calc(0.75rem * 1.4);width:120px;"></div>
        </slot>
        <div class="overview">
          <slot name="shortOverview">
            <div style="width:100%">
              <div class="skeleton-text" style="height:calc(0.7rem * 1.4);margin-bottom:0.5rem;"></div>
              <div class="skeleton-text" style="height:calc(0.7rem * 1.4);"></div>
            </div>
          </slot>
        </div>
        <slot name="feedback" />
      </div>
    </div>
    <slot name="actionMenu" />
    <section class="player-details-holder">
      <slot name="player">
        <PlayerPlaceholder :type="type" />
      </slot>
      <slot name="details">
        <DetailsPlaceholder :type="type" />
      </slot>
    </section>
  </section>
</template>

<script setup>
import PlayerPlaceholder from '../Placeholders/PlayerPlaceholder.vue'
import DetailsPlaceholder from '../Placeholders/DetailsPlaceholder.vue'

const { type, bg } = defineProps({ type: String, bg: String | undefined })
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
    -webkit-mask-image: linear-gradient(#00000030, #00000080 50%, transparent);
    mask-image: linear-gradient(#00000030, #00000080 50%, transparent);
    img{
      width:100%;
      height:100%;
      object-fit:cover;
    }
  }
  div.left-col{ align-self:flex-start }
  div.poster{
    aspect-ratio:2/3;
    min-width:200px;
    max-width:200px;
    background:var(--card-color-hover);
    border-radius:1rem;
    overflow:hidden;
    z-index:1;
    position:relative;
    box-shadow: 0px 0px 15px 1px rgba(0,0,0,0.75);
  }
  div.outter{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:2rem;
    padding:var(--container-padding);
    margin:0 calc(0px - var(--container-padding));
    background-repeat:no-repeat;
    background-position:center;
    background-size:cover;
    position:relative;
    padding-top:calc(var(--nav-height) + var(--container-padding));
  }
  div.right-col{
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    gap:1.5rem;
    width:100%;
    max-width:600px;
    z-index:1;
    position:relative;
    div.rating{
      display:flex;
      gap:1rem;
    }
  }
}
:slotted(span.title){
  line-height:1.1;
  font-size:1.75rem;
  font-weight:700;
}
:slotted(span.tagline){
  font-size:0.75rem;
  font-style:italic;
  &:empty{ display:none }
}
:slotted(span.overview){
  font-size:0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
div.overview{
  display:flex;
  gap:1rem;
  align-items:center;
  align-self:stretch;
}
:slotted(div.under-title){
  span{ font-size:0.75rem;
    &.rated{
      padding:1px 0.3rem;
      border-radius:4px;
      mix-blend-mode: difference;
      font-size:0.65rem;
      background-color:var(--font-color);
      color:var(--background-color);
      font-family:'Oswald',sans-serif;
      line-height:1;
      margin-right:8px;
      font-weight:900;
    }
  }
}
:slotted(div.genres){
  font-size:0.75rem;
  font-weight:700;
  display:flex;
  gap:8px;
  flex-wrap:wrap;
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
  div.outter{ 
    justify-content:start!important;
    gap:1rem!important;
  }
  div.poster{
    min-width:100px!important;
    max-width:100px!important;
  }
  :slotted(span.title){ font-size:1.25rem }
  div.right-col{ gap:1rem!important }
}
</style>