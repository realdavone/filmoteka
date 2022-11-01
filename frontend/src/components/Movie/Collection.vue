<template>
  <section class="outter user-select-none">
    <section class="inner">
      <div v-if="collection['backdrop_path']" class="background-image">
        <img :src="`https://www.themoviedb.org/t/p/w1440_and_h320_multi_faces${collection['backdrop_path']}`" alt="Obrázok kolekcie">
      </div>
      <span class="heading">Tento film je súčasťou kolekcie</span>
      <BasicButton text="Prejsť na kolekciu" @handleClick="$router.push(`/collection/${collection.id}`)"/>
    </section>
  </section>
</template>

<script setup>
import BasicButton from '../Buttons/BasicButton.vue'
const { collection } = defineProps({ collection: Object })
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
    gap:20px;
    padding:var(--container-padding);
    position:relative;
    div.background-image{
      position: absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      -webkit-mask-image: linear-gradient(to left, #000000, #00000060);
      mask-image: linear-gradient(to left, #000000, #00000060);
      img{
        width:100%;
        height:100%;
        object-fit:cover;
      }
    }
    span.heading{
      font-size:1.5rem;
      position:relative;
      z-index:1;
    }
  }
}
@media screen and (max-width: 600px) {
  span.heading{ font-size:1.5rem!important }
}
</style>