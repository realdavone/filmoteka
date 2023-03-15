<template>
  <section class="prompt user-select-none" v-if="shown">
    <span v-font:medium><b>Neobmedzené</b> sledovanie filmov a seriálov.</span>
    <BasicButton type="hover-color-change"  @handleClick="$router.push('/login')">Prihlásiť sa</BasicButton>
  </section>
</template>

<script setup lang="ts">
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
  padding:20px 30px;
  background-color:var(--card-color-hover);
  display:flex;
  align-items:center;
  justify-content:center;
  flex-wrap:wrap;
  gap:15px;
  text-align:center;
  margin:0 var(--container-padding);
  position:relative;
  border-radius: 10px;
  isolation:isolate;
}

@media screen and (max-width: 600px) {
  section.prompt{
    padding:15px;
  }
}
</style>