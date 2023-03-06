<template>
  <section class="container panel" v-if="props.cards?.length !== 0">
    <div class="upper-row">
      <Title style="margin-bottom:0">{{ props.heading }}</Title>
      <div v-if="props.allowGrid" class="view-buttons">
        <button @click="isGrid = true" :data-active="isGrid">
          <span class="material-icons">grid_view</span>
        </button>
        <button @click="isGrid = false" :data-active="!isGrid">
          <span class="material-icons">view_column</span>
        </button>
      </div>
    </div>
    <div
    ref="cardHolder"
    :class="`${isGrid ? 'grid' : 'scroll container' } card-holder`"
    @scroll="handleScroll()">
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
      }"/>
    </div>
    <template v-if="!isGrid">
      <button v-show="arrowVisibility.left" class="scroll left" title="Vľavo" @click="scrollTo(cardHolder!, -180)">&#10094;</button>
      <button v-show="arrowVisibility.right" class="scroll right" title="Vpravo" @click="scrollTo(cardHolder!, 180)">&#10095;</button>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, withDefaults, reactive, onMounted, onActivated, watch } from 'vue'
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

const arrowVisibility = reactive({ left: true, right: true })

function handleScroll() {
  cardHolder.value?.scrollLeft === 0 ? arrowVisibility.left = false : arrowVisibility.left = true

  if(cardHolder?.value?.scrollWidth) Math.floor(cardHolder?.value?.scrollWidth - cardHolder?.value!.scrollLeft) <= cardHolder?.value!.clientWidth ? arrowVisibility.right = false : arrowVisibility.right = true
}

function scrollTo(element: HTMLDivElement, distance: number){
  element.scrollTo({
    left: element.scrollLeft += distance,
    behavior: 'smooth'
  })
}

watch(isGrid, () => {
  setTimeout(() => {
    !isGrid.value && handleScroll()
  }, 100)
})
onMounted(() => handleScroll())
onActivated(() => handleScroll())
</script>

<style lang="scss" scoped>
section.panel{
  position: relative;
  isolation:isolate;
  div.upper-row{
    display:flex;
    align-items:center;
    justify-content: space-between;
    gap:2rem;
    padding-bottom:1rem;
    div.view-buttons{
      display:flex;
      align-items:center;
      padding-top:0.35rem;
      button{
        opacity: 0.5;
        &:last-of-type{
          span{
            font-size:2rem
          }
        }
        &[data-active=true]{
          opacity: 1!important;
          color: var(--theme-color);
        }
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
    bottom:0;
    font-size:1.5rem;
    line-height:1;
    width:3.5rem;
    height:calc(var(--vertical-card-width) / 2 * 3);
    display:flex;
    justify-content:center;
    align-items:center;
    transition:0.2s ease background-color, 0.4s ease transform;
    padding-top:2px;
    user-select:none;
    &.left{
      left:0;
      padding-right:5px;
      padding-bottom:1px;
      background: linear-gradient(to right, var(--background-color) 10%, transparent);
    }
    &.right{
      right:0;
      background: linear-gradient(to left, var(--background-color) 10%, transparent);
    }
  }
}
@media screen and (max-width: 600px) {
  div.grid{ grid-template-columns:repeat(auto-fill, minmax(80px, 1fr))!important }
}
</style>
