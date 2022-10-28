<template>
  <section class="ctr user-select-none" v-if="shown">
    <span><b>Neobmedzené</b> sledovanie filmov a seriálov.</span>
    <section class="logos">
      <img v-for="(network, i) in networks" :key="i" :src="`https://www.themoviedb.org/t/p/original/${network.src}.svg`" :alt="network.name">
      <span>a ďalšie...</span>
    </section>
    <button class="cta" @click="$router.push('/login')">Prihlásiť sa</button>
    <CloseButton class="close" @click="shown = false"  />
  </section>
</template>

<script setup>
import CloseButton from '../Buttons/CloseButton.vue'
import { ref } from 'vue'
const shown = ref(true)

const networks = [
  {
    name: 'Netflix',
    src: 'wwemzKWzjKYJFfCeiB57q3r4Bcm'
  },
  {
    name: 'HBO',
    src: 'tuomPhY2UtuPTqqFnKMVHvSb724'
  },
  {
    name: 'Disney+',
    src: 'uzKjVDmQ1WRMvGBb7UNRE0wTn1H'
  }
]

defineExpose({ shown })
</script>

<style lang="scss" scoped>
section.ctr{
  padding:1.5rem 3rem;
  background-color:var(--card-color-hover);
  font-size:1.05rem;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:1rem;
  text-align:center;
  margin-top:-1rem;
  position:relative;
  button.cta{
    font-size:0.9rem;
    font-weight:700;
    color:var(--theme-color);
  }
  .close{
    position:absolute;
    top:1rem;
    right:1rem;
  }
  section.logos{
    display:flex;
    gap:1rem;
    img{
      height:1.25rem;
      width:auto;
    }
    span{ font-size:0.75rem }
  }
}  
</style>