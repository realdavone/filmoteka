<template>
  <section class="outter container user-select-none">
    <section class="inner" :style="props.collection['backdrop_path']!==null?
    `background:linear-gradient(90deg, var(--background-color-alpha) 20%, #ffffff00 100%), url(https://www.themoviedb.org/t/p/w1440_and_h320_multi_faces${props.collection['backdrop_path']})`:
    'background:black;'
    ">
      <span class="heading">Tento film je súčasťou kolekcie</span>
      <router-link class="cta" :to="{ name:'Collection', params:{ id: props.collection.id } }">
        <b>Prejsť na kolekciu</b>
        <span class="material-symbols-outlined">chevron_right</span>
      </router-link>
    </section>
  </section>
</template>

<script setup>
const props = defineProps({ collection: Object })
</script>

<style lang="scss" scoped>
section.outter{
  section.inner{
    height:258px;
    min-height:258px;
    border-radius:12px;
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
    span.heading{
      font-size:1.5rem;
      color:var(--font-color-dark);
      b{font-size:1.5rem;}
    }
    a.cta{
      background:var(--theme-color-transparent);
      padding:8px 10px 8px 15px;
      border-radius:35px;
      text-transform:uppercase;
      font-weight:bold;
      font-size:0.8rem;
      transition:0.2s ease background;
      color:white;
      display:flex;
      align-items:center;
    }
    a.cta:hover{ background:var(--theme-color) }
  }
}
@media screen and (max-width: 600px) {
  span.heading{ font-size:1.5rem!important }
}
</style>