<template>
  <section class="outter-holder">
    <Player
    :isPlayerWorking="props.isPlayerWorking"
    :title="props.title"
    :isReady="{ status: props['isReleased'], message: props['isReleased'] ? null : 'Film ešte nevyšiel' }"
    :source="playerSource"
    :type="'movie'"
    @setPlayer="setPlayer()"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Player from '../Content/Player.vue'
 
const props = defineProps({
  id: String,
  isReleased: Boolean,
  title: String,
  isPlayerWorking: Boolean
})

const playerSource = ref(null)

const setPlayer = () => { playerSource.value = `https://www.2embed.to/embed/imdb/movie?id=${props.id}` }
</script>

<style lang="scss" scoped>
section.outter-holder{
  background-color:var(--player-background-color);
}

@media screen and (max-width: 1300px) {
  section.outter-holder{ margin:0 calc(0px - var(--container-padding)) }
}
</style>