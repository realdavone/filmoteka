<template>
  <section class="container panel">
    <div class="upper-row">
      <Title style="margin-bottom:0"><slot name="title" /></Title>
      <div v-if="allowGrid" class="view-buttons">
        <button @click="gridView = true" :data-active="gridView">
          <span class="material-icons">grid_view</span>
        </button>
        <button @click="gridView = false" :data-active="!gridView">
          <span class="material-icons">view_column</span>
        </button>
      </div>
    </div>
    <div ref="cardHolder" :class="`${gridView ? 'grid' : 'scroll container' } card-holder`">
      <slot name="card">
        <VerticalCardPlaceholder v-for="n in placeholderInfo['count']" :key="n" class="skeleton"/>
      </slot>
    </div>
    <template v-if="!gridView">
      <button class="scroll left" title="Vľavo" @click="scrollTo(cardHolder, -180)">&#10094;</button>
      <button class="scroll right" title="Vpravo" @click="scrollTo(cardHolder, 180)">&#10095;</button>
    </template>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Title from '../Content/Title.vue'
import VerticalCardPlaceholder from '../Placeholders/VerticalCardPlaceholder.vue'

const { allowGrid, isGrid, placeholderInfo } = defineProps({ allowGrid: { type: Boolean, default: false },
  isGrid: { type: Boolean, default: false }, placeholderInfo: Object 
})

const cardHolder = ref(null)
const gridView = ref(isGrid)

const scrollTo = (element, distance) => element.scrollTo({ left: element.scrollLeft += distance, behavior: 'smooth' })
</script>

<style lang="scss" scoped>
section.panel{
  position: relative;
  isolation:isolate;
  div.upper-row{
    display:flex;
    align-items:center;
    gap:2rem;
    padding-bottom:1rem;
    div.view-buttons{
      display:flex;
      align-items:center;
      padding-top:0.35rem;
      button{
        &:last-of-type{
          span{font-size:2rem}
        }
        &[data-active=true]{ color:var(--theme-color) }
      }
    }
  }
  div.card-holder{
    gap:1.75rem;
    &.scroll{
      flex-wrap:nowrap;
      overflow:auto;
      display:flex;
      align-items:stretch;
      scroll-snap-type:x mandatory;
      scroll-padding:var(--container-padding);
      scroll-behavior: smooth;
      margin:0 calc(0px - var(--container-padding))!important;
      &::-webkit-scrollbar{ display:none; }
      :slotted(a.title-card){
        width:var(--vertical-card-width);
        min-width:var(--vertical-card-width);
      }
      &>.skeleton{
        width:var(--vertical-card-width);
        min-width:var(--vertical-card-width);
      }
    }
    &.grid{
      display:grid;
      grid-template-columns:repeat(auto-fill, minmax(180px, 1fr));
      overflow:auto;
      &::-webkit-scrollbar{ display:none; }
    }
  }
  button.scroll{
    position:absolute;
    color:var(--theme-color);
    z-index:5;
    top:50%;
    font-size:1.5rem;
    line-height:1;
    background-color:var(--card-color);
    width:2.75rem;
    aspect-ratio:1;
    border-radius:50%;
    display:flex;
    justify-content:center;
    align-items:center;
    transition:0.2s ease background-color, 0.4s ease transform;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    &.left{
      left:20px;
      padding:0 4px 2px 0;
    }
    &.right{right:20px;}
    &:hover{
      transform:scale(1.1);
      background-color:var(--card-color-hover);
    }
  }
}
@media screen and (max-width: 600px) {
  div.grid{ grid-template-columns:repeat(auto-fill, minmax(80px, 1fr))!important }
}
</style>
