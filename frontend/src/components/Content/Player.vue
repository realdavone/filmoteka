<template>
  <section id="player-holder" class="user-select-none">
    <div v-if="!props.source && props['isReady']['status'] === true" class="not-pressed">
      <Transition name="fade">
        <div v-if="!isPlayerWorking" class="player-warning">
          <span class="material-icons-outlined">warning</span>
          <span v-font:medium>Prehrávač bol označený ako nefunkčný</span>
        </div>
      </Transition>
      <button
        v-if="store.state.globalSettings.allowWatchWhileUnregistered || store.state.credentials.loggedIn"
        @click="$emit('setPlayer')"
        class="play-button"
      >&#9654;</button>
      <div v-else class="message">
        <span class="material-icons-outlined icon">lock</span>
        <div class="right">
          <span class="message" v-font:medium>Pre sledovanie je nutné sa prihlásiť</span>
          <BasicButton
            type="hover-color-change"
            @handleClick="$router.push('/login')"
          >Prihlásiť sa</BasicButton>
        </div>
      </div>
    </div>
    <div v-if="props.source && !loadedIframe" class="loading">
      <Loader type="default" style="border-color: white;border-top-color: transparent;" />
    </div>
    <iframe
      @load="loadedIframe = true"
      v-if="props.source"
      :class="{ pinned: pinned && store.state.settings.pinnedPlayer }"
      :src="props['source']"
      frameborder="0"
      loading="lazy"
      allowfullscreen
    ></iframe>
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
    background-color:#dc143c;
    padding:8px 15px;
    color:var(--font-color-dark);
    width:100%;
    display:flex;
    align-items:center;
    gap:8px;
    justify-content:center;
  }
  div.message{
    display:flex;
    gap:8px;
    align-items:center;
    color:white;
    span.icon{
      font-size:46px;
    }
    div.right{
      display:flex;
      flex-direction:column;
      gap:4px;
      align-items:flex-start;
      span.message{
        font-weight:700;
      }
    }
  }
  div.not-pressed{
    padding:35px;
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    position:absolute;
    top:0;
    left:0;
    button.play-button{
      font-size:46px;
      color:var(--font-color-dark);
      line-height: 1;
      height: 80px;
      width: 80px;
      border-radius: 50%;
      padding-left: 8px;
      transition:0.2s ease background-color;

      &:hover{
        background-color:var(--background-color-alpha);
      }
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