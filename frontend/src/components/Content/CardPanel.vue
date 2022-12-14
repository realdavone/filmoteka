<template>
  <section class="container panel" v-if="props.cards?.length !== 0">
    <div class="upper-row">
      <Title style="margin-bottom:0">{{props.heading}}</Title>
      <div v-if="props.allowGrid" class="view-buttons">
        <button @click="isGrid = true" :data-active="isGrid">
          <span class="material-icons">grid_view</span>
        </button>
        <button @click="isGrid = false" :data-active="!isGrid">
          <span class="material-icons">view_column</span>
        </button>
      </div>
    </div>
    <div ref="cardHolder" :class="`${isGrid ? 'grid' : 'scroll container' } card-holder`">
      <VerticalCardPlaceholder v-if="props.cards === null" v-for="n in props.placeholderInfo.count" :key="n" class="skeleton"/>
      <Card
      class="card"
      v-else
      v-for="item in props.cards"
      :key="item.id"
      :item="{
        media_type: item.media_type,
        id: item.id,
        poster_path: item.poster_path,
        title: item.title
      }"
      />
    </div>
    <template v-if="!isGrid">
      <button class="scroll left" title="Vľavo" @click="scrollTo(cardHolder!, -180)">&#10094;</button>
      <button class="scroll right" title="Vpravo" @click="scrollTo(cardHolder!, 180)">&#10095;</button>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, withDefaults } from 'vue'
import Title from '../Content/Title.vue'
import VerticalCardPlaceholder from '../Placeholders/VerticalCardPlaceholder.vue'
import Card from './Card.vue'

const props = withDefaults(defineProps<{
  allowGrid?: boolean
  isGrid?: boolean
  heading?: string
  loading?: boolean
  cards: Array<{
    media_type: 'movie' | 'tv'
    id: string | number
    poster_path?: string
    title: string
  }> | null
  placeholderInfo: {
    type: string,
    count: number
  }
}>(), {
  allowGrid: () => false,
  isGrid: () => false
})

const isGrid = ref(props.isGrid)

const cardHolder = ref<null | HTMLDivElement>(null)

const scrollTo = (element: HTMLElement, distance: number) => element.scrollTo({ left: element.scrollLeft += distance, behavior: 'smooth' })
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
          span{
            font-size:2rem
          }
        }
        &[data-active=true]{ color:var(--theme-color) }
      }
    }
  }
  div.card-holder{
    gap:var(--container-padding);
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
      .card{
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
    padding-top:2px;
    &.left{
      left:20px;
      padding-right:5px;
      padding-bottom:1px;
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
