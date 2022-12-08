<template>
  <section class="prompt user-select-none" v-if="shown">
    <span><b>Neobmedzené</b> sledovanie filmov a seriálov.</span>
    <BasicButton text="Prihlásiť sa" mutation="hover-color-change"  @handleClick="$router.push('/login')"/>
    <CloseButton v-if="props.enableClose" class="close" @click="shown = false"  />
  </section>
</template>

<script setup lang="ts">
import CloseButton from '../Buttons/CloseButton.vue'
import BasicButton from '../Buttons/BasicButton.vue'
import { ref, withDefaults } from 'vue'

const props = withDefaults(defineProps<{
  enableClose?: boolean
}>(), {
  enableClose: () => true
})

const shown = ref(true)

defineExpose({ shown })
</script>

<style lang="scss" scoped>
section.prompt{
  padding:1.5rem 3rem;
  background-color:var(--card-color-hover);
  font-size:.95rem;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-wrap:wrap;
  gap:1rem;
  text-align:center;
  margin:-2.5rem var(--container-padding) 0;
  position:relative;
  border-radius:1rem;
  isolation:isolate;
  .close{
    position:absolute;
    top:0.5rem;
    right:0.5rem;
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

@media screen and (max-width: 600px) {
  section.prompt{
    padding:1rem;
    font-size:0.85rem;
  }
}
</style>