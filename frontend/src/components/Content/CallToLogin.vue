<template>
  <section class="ctr user-select-none" v-if="shown">
    <span><b>Neobmedzené</b> sledovanie filmov a seriálov.</span>
    <BasicButton text="Prihlásiť sa" @handleClick="$router.push('/login')"/>
    <CloseButton class="close" @click="shown = false"  />
  </section>
</template>

<script setup>
import CloseButton from '../Buttons/CloseButton.vue'
import BasicButton from '../Buttons/BasicButton.vue'

import { ref } from 'vue'
const shown = ref(true)

defineExpose({ shown })
</script>

<style lang="scss" scoped>
section.ctr{
  padding:1.5rem 3rem;
  background-color:var(--card-color-hover);
  font-size:1.05rem;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-wrap:wrap;
  gap:1rem;
  text-align:center;
  margin:-2.5rem var(--container-padding) 0;
  position:relative;
  border-radius:1rem;
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