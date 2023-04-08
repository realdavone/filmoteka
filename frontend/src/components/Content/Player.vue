<template>
  <section ref="playerHolder" :class="`user-select-none player-holder ${loadedIframe && false && 'active'}`">
    <div v-if="!iframeSource && props.isReady.status" class="not-pressed">
      <Transition name="fade">
        <div v-if="!isPlayerWorking" class="player-warning">
          <span class="material-icons-outlined">warning</span>
          <span v-font:medium>Prehrávač bol označený ako nefunkčný</span>
        </div>
      </Transition>
      <button
        v-if="globalSettingsStore.globalConfig?.allowWatchWhileUnregistered || authStore.isLoggedIn"
        @click="$emit('setPlayer')"
        class="play-button"
      ><span class="material-icons-outlined">play_arrow</span></button>
      <div v-else class="message">
        <span class="material-icons-outlined icon">lock</span>
        <div class="right">
          <span v-font:medium>Prehrávač je dostupný iba prihlásením užívateľom</span>
        </div>
      </div>
    </div>
    <div v-if="iframeSource && !loadedIframe" class="loading">
      <Loader type="default" />
    </div>
    <iframe
      @load="loadedIframe = true"
      v-if="iframeSource"
      :class="{ pinned: pinned }"
      :src="iframeSource"
      frameborder="0"
      loading="lazy"
      allowfullscreen
    ></iframe>
    <div v-if="!props.isReady.status" class="message">
      <span class="material-icons-outlined icon">event</span>
      <div class="right">
        <span class="message" v-font:medium>{{ props.isReady.message }}</span>
      </div>
    </div>
    <Dialog ref="dialog" />
  </section>
</template>

<script setup lang="ts">
import useEvent from '../../composables/event'
import { useAuthStore } from '../../store/auth';
import { useGlobalConfigStore } from '../../store/global-config';
import { useLocalSettingsStore } from '../../store/local-settings'
import Loader from '../Loader.vue'
import { ref, watch, defineAsyncComponent } from 'vue'
const Dialog = defineAsyncComponent(() => import('../Dialog.vue'))

const localSettingsStore = useLocalSettingsStore()
const globalSettingsStore = useGlobalConfigStore()

const authStore = useAuthStore()
const pinned = ref(false)
const loadedIframe = ref(false)
const playerHolder = ref<HTMLElement | null>(null)
const dialog = ref<InstanceType<typeof Dialog> | null>(null)
const iframeSource = ref<string | null>(null) 

const props = defineProps<{
  isReady: {
    message: null | string
    status: boolean
  },
  isPlayerWorking: boolean
}>()

watch(() => localSettingsStore.localSettings.pinnedPlayer, (val: Boolean) => { val ? addListener() : removeListener() })

function handleScroll() {
  pinned.value = Boolean(iframeSource.value) && localSettingsStore.localSettings.pinnedPlayer && (playerHolder.value!.offsetTop < window.scrollY)
}

async function handlePlayButton(url: string, cb?: (...args: unknown[]) => void) {
  try {
    (sessionStorage.getItem('adblockWarning') !== 'false') && globalSettingsStore.globalConfig?.adblockModalWarning && await dialog.value!.handleDialogWindow({
      body: `Po spustení prehraváča sa možu zobraziť reklamy tretích strán ktoré treba zavrieť.
      Týmto reklamám sa dá vyhnúť zapnutím Adblocku.`,
      cancelText: 'Zavrieť',
      confirmText: 'Pokračovať'
    })
    
    cb?.()
    iframeSource.value = url

    sessionStorage.setItem('adblockWarning', 'false')
  } catch (error) {
    console.error
  }
}

defineExpose({
  handlePlayButton
})

const { addListener, removeListener } = useEvent({ target: window, event: 'scroll', callback: handleScroll })

localSettingsStore.localSettings.pinnedPlayer ? addListener() : removeListener()
</script>

<style lang="scss" scoped>
@property --angle{
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
section.player-holder{
  width:var(--player-width);
  max-width:var(--player-width);
  aspect-ratio:16/9!important;
  display:flex;
  justify-content:center;
  align-items:center;
  margin:0 auto;
  position:relative;

  &.active::after{
    content: 'x';
    position: absolute;
    inset: -10px;
    background: conic-gradient(from var(--angle),#66339980, #ffa50080, #0000ff80);
    z-index: -1;
    filter: blur(35px);
    animation: rotate infinite linear 20s;
  }
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
    flex-direction: column;
    span.icon{
      font-size:36px;
    }
    div.right{
      text-align: center;
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
      color:var(--font-color-dark);
      line-height: 1;
      height: 80px;
      width: 80px;
      border-radius: 50%;
      transition:0.2s ease background-color;

      span{
        font-size:46px;
      }

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

@keyframes rotate{
  0%{
    --angle: 0deg;
  }
  100%{
    --angle: 360deg;
  }
}
@media screen and (max-width: 500px) {
  iframe.pinned{
    height:auto!important;
    width:100%!important;
  }
}
@media screen and (max-width: 1300px){
  section.player-holder{
    width:100%!important;
  }
}
</style>