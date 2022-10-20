<template>
  <section class="user-select-none container">
    <div class="outter">
      <div v-if="bg" class="background-image">
        <img @error="bg = false" :src="`https://image.tmdb.org/t/p/w1440_and_h320_multi_faces${bg}`" alt="Obrázok v pozadí">
      </div>
      <div class="poster">
        <slot name="poster" />
      </div>
      <div class="title">
        <slot name="subnav" />
        <div>
          <slot name="title">
            <div style="background:var(--font-color);height:calc(1.5rem * 1.1);width:160px;border-radius:6px;"></div>
          </slot>
          <slot name="subtitle">
            <div style="background:var(--font-color);height:calc(0.75rem * 1.4);width:100px;border-radius:6px;margin-top:5px;"></div>
          </slot>
        </div>
        <slot name="tagline">
          <div style="background:var(--font-color);height:calc(0.75rem * 1.4);width:100px;border-radius:6px;"></div>
        </slot>
        <div class="overview">
          <slot name="shortOverview">
            <div style="background:var(--font-color);height:calc(0.75rem * 1.4);width:100%;border-radius:6px;"></div>
          </slot>
        </div>
      </div>
    </div>
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
  isolation:isolate;
  div.background-image{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:0;
    -webkit-mask-image: linear-gradient(var(--background-color), transparent 75%);
    mask-image: linear-gradient(var(--background-color), transparent 75%);
    img{
      width:100%;
      height:100%;
      object-fit:cover;
    }
  }
  div.poster{
    aspect-ratio:2/3;
    min-width:200px;
    max-width:200px;
    background:var(--card-color-hover);
    border-radius:16px;
    overflow:hidden;
    align-self:flex-start;
    z-index:1;
    position:relative;
  }
  div.outter{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:1.5rem;
    padding:var(--container-padding);
    margin:0 calc(0px - var(--container-padding));
    background-repeat:no-repeat;
    background-position:center;
    background-size:cover;
    position:relative;
  }
  div.title{
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    gap:1.5rem;
    width:100%;
    max-width:600px;
    z-index:1;
    position:relative;
  }
}
:slotted(span.title){
  line-height:1.1;
  font-size:1.75rem;
  font-weight:700;
}
:slotted(img.poster){
  width:100%;
  height:100%;
  object-fit:cover;
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
  flex-direction:column;
  gap:5px;
  align-self:stretch;
}
:slotted(span.label){
  font-weight:700;
  font-size:0.95rem;
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
  section.container{gap:0}
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
    min-width:75px!important;
    max-width:75px!important;
  }
  :slotted(span.title){ font-size:1.25rem }
}
</style>