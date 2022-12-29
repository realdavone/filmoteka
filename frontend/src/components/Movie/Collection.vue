<template>
  <section class="outter container user-select-none">
    <section class="inner">
      <div v-if="collection['backdrop_path']" class="background-image">
        <CoverPoster size="w1440_and_h320_multi_faces" :src="collection['backdrop_path']" alt="Obrázok kolekcie" :fadeInOnLoad="true" />
      </div>
      <span class="heading">Tento film je súčasťou kolekcie</span>
      <BasicButton text="Prejsť na kolekciu" @handleClick="$router.push(`/collection/${collection.id}`)"/>
    </section>
  </section>
</template>

<script setup lang="ts">
import BasicButton from '../Buttons/BasicButton.vue'
import CoverPoster from '../Content/CoverPoster.vue'

const { collection } = defineProps<{
  collection: {
    backdrop_path?: string
    id: number
    name: string
    poster_path: string
  }
}>()

</script>

<style lang="scss" scoped>
section.outter{
  isolation:isolate;
  section.inner{
    isolation:isolate;
    height:200px;
    min-height:200px;
    overflow:hidden;
    background-size:cover!important;
    background-repeat:no-repeat!important;
    background-position:center!important;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;
    gap:1rem;
    padding:var(--container-padding);
    position:relative;
    border-radius:1rem;
    overflow:hidden;
    div.background-image{
      position: absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      -webkit-mask-image: linear-gradient(to left, #000000, #00000060);
      mask-image: linear-gradient(to left, #000000, #00000060);
      filter:blur(5px);
    }
    span.heading{
      font-size:1.5rem;
      position:relative;
      z-index:1;
      line-height:1;
    }
  }
}
@media screen and (max-width: 600px) {
  span.heading{ font-size:1.5rem!important }
}
</style>