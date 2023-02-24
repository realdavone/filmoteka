<template>
  <section id="player-holder" class="user-select-none">
    <div v-if="!props.source && props['isReady']['status'] === true" class="not-pressed">
      <Transition name="fade">
        <div v-if="!isPlayerWorking" class="player-warning">
          <span class="material-icons-outlined">warning</span>
          <span>Prehrávač bol označený ako nefunkčný</span>
        </div>
      </Transition>
      <button v-if="store.state.globalSettings.allowWatchWhileUnregistered || store.state.credentials.loggedIn" @click="$emit('setPlayer')" class="play-button">&#9654;</button>
      <div v-else class="message">
        <span class="material-icons-outlined icon">lock</span>
        <div class="right">
          <span class="message">Pre sledovanie je nutné sa prihlásiť</span>
          <BasicButton type="hover-color-change" @handleClick="$router.push('/login')">Prihlásiť sa</BasicButton>
        </div>
      </div>
    </div>
    <div v-if="props.source && !loadedIframe" class="loading">
      <Loader height="2rem" border="0.3rem" color="white"/>
    </div>
    <iframe @load="loadedIframe = true" v-if="props.source" :class="{ pinned: pinned && store.state.settings.pinnedPlayer }" :src="props['source']" frameborder="0" loading="lazy" allowfullscreen></iframe>
    <div v-if="!props.isReady.status" class="message">
      <span class="material-icons-outlined icon">event</span>
      <div class="right">
        <span class="message">{{ props.isReady.message }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import useEvent from '../../composables/event'
import Loader from '../Loader.vue'
import BasicButton from '../Buttons/BasicButton.vue'
import { ref, inject } from 'vue'

const store = inject<any>('store')
const pinned = ref(false)
const loadedIframe = ref(false)

const props = defineProps<{
  isReady: {
    message: null | string
    status: boolean
  },
  source: null | string,
  isPlayerWorking: boolean
}>()


useEvent({
  target: document,
  event: 'scroll',
  callback: () => {
    if(props.source) pinned.value = document.getElementById('player-holder')!.offsetTop < window.scrollY
  }
})

</script>

<style lang="scss" scoped>
section#player-holder{
  width:var(--player-width);
  max-width:var(--player-width);
  aspect-ratio:16/9!important;
  display:flex;
  justify-content:center;
  align-items:center;
  margin:0 auto;
  position:relative;
  overflow:hidden;
  div.loading{
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  div.player-warning{
    position:absolute;
    top:0;
    z-index:2;
    font-size:0.75rem;
    background-color:#dc143c;
    padding:0.5rem 1rem;
    color:var(--font-color-dark);
    width:100%;
    display:flex;
    align-items:center;
    gap:0.5rem;
    justify-content:center;
    span:first-of-type{
      font-size:1rem;
    }
  }
  div.message{
    display:flex;
    gap:0.5rem;
    align-items:center;
    color:white;
    span.icon{
      font-size:3.5rem;
    }
    div.right{
      display:flex;
      flex-direction:column;
      gap:0.25rem;
      align-items:flex-start;
      span.message{
        font-weight:700;
        font-size:1rem;
      }
    }
  }
  div.not-pressed{
    padding:2.5rem;
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    position:absolute;
    top:0;
    left:0;
    button.play-button{
      font-size:3.5rem;
      color:var(--font-color-dark)
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
      top:calc(var(--nav-height) - 1px);
      left:0;
      z-index:15;
      height:40vh;
      width:auto;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    }
  }
}
@media screen and (max-width: 500px) {
  iframe.pinned{
    height:auto!important;
    width:100%!important;
  }
}
@media screen and (max-width: 1300px){
  section#player-holder{
    width:100%!important;
  }
}
</style>