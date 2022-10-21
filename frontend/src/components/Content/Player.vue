<template>
  <section id="player-holder" class="player-holder user-select-none">
    <Transition name="fade">
      <div v-if="!props.source && props['isReady']['status'] === true" class="not-pressed">
        <div v-if="isPlayerWorking === false" class="player-warning">Prehrávač bol označený ako nefunkčný</div>
        <button v-if="store.state.globalSettings.allowWatchWhileUnregistered || store.state.credentials.loggedIn" @click="$emit('setPlayer')" class="play-button">&#9654;</button>
        <button v-else class="locked-player" @click="$router.push('/login')">
          <span>Prihláste sa pre sledovanie</span>
        </button>
      </div>
    </Transition>
    <Transition name="fade">
      <iframe v-if="props.source" :class="{ pinned: pinned && store.state.settings.pinnedPlayer }" :src="props['source']" frameborder="0" loading="lazy" allowfullscreen></iframe>
    </Transition>
    <span v-if="!props['isReady']['status']" class="warning">{{ props['isReady']['message'] }}</span>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, onActivated, onDeactivated } from 'vue'

const store = inject('store')
const pinned = ref(false)

const props = defineProps({
  isReady: Object,
  source: String,
  type: String,
  title: String,
  isPlayerWorking: Boolean
})

const pinPlayer = () => { if(props.source) pinned.value = document.getElementById('player-holder').offsetTop < window.scrollY }
onActivated(() => { document.addEventListener('scroll', pinPlayer) })
onMounted(() => { document.addEventListener('scroll', pinPlayer) })
onDeactivated(() => { document.removeEventListener('scroll', pinPlayer) })
onUnmounted(() => { document.removeEventListener('scroll', pinPlayer) })
</script>

<style lang="scss" scoped>
section.player-holder{
  width:var(--player-width);
  max-width:var(--player-width);
  aspect-ratio:16/9!important;
  display:flex;
  justify-content:center;
  align-items:center;
  margin:0 auto;
  position:relative;
  overflow:hidden;
  div.player-warning{
    position:absolute;
    top:0;
    z-index:2;
    color:crimson;
    font-weight:700;
    font-size:0.8rem;
    padding:5px;
  }
  button.locked-player{
    display:flex;
    align-items:center;
    gap:10px;
    position:relative;
    z-index:2;
    font-size:0.75rem;
    border:1px solid #ffffff40;
    padding:6px 8px;
    border-radius:2px;
    text-align:center;
    color:var(--font-color-dark);
    transition:0.2s ease border;
    &:hover{border:1px solid var(--font-color-dark);}
  }
  div.not-pressed{
    padding:15px;
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    position:absolute;
    top:0;
    left:0;
    button.play-button{
      font-size:2.5rem;
    }
  }
  iframe{
    aspect-ratio:16/9;
    width:100%;
    position:relative;
    top:0;
    left:0;
    transition:0.2s ease all;
    &.pinned{
      position:fixed;
      top:var(--nav-height);
      left:0;
      z-index:15;
      height:40vh;
      width:auto;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    }
  }
  span.warning{
    font-size:0.85rem;
    color:var(--font-color-dark);
  }
}
@media screen and (max-width: 500px) {
  iframe.pinned{height:auto!important;width:100%!important;}
}
@media screen and (max-width: 1300px){
  section.player-holder{width:100%!important;}
}
</style>