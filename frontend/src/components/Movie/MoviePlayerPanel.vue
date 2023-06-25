<template>
  <section class="outter-holder">
    <Player
      ref="player"
      :isPlayerWorking="props.isPlayerWorking"
      :isReady="{
        status: props.isReleased,
        message: props.isReleased ? null : 'Film ešte nevyšiel'
      }"
      @setPlayer="setPlayer()"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Player from '../Content/Player.vue'

const player = ref<InstanceType<typeof Player> | null>()

const props = defineProps<{
  id: string
  isReleased: boolean
  isPlayerWorking: boolean
}>()

function setPlayer() { 
  player.value?.handlePlayButton(`https://www.2embed.cc/embed/${props.id}`)
}
</script>

<style lang="scss" scoped>
section.outter-holder{
  background-color:var(--player-background-color);
}

@media screen and (max-width: 1300px) {
  section.outter-holder{ margin:0 calc(0px - var(--container-padding)) }
}
</style>