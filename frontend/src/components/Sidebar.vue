<template>
  <aside ref="menu">
    <header class="user-select-none">
      <div class="left-col">
        <button @click="closeMenu" style="font-size: 1.5rem;width:45px;">&times;</button>
      </div>
      <div v-if="store.state.credentials.loggedIn" class="right-col">
        <BasicButton type="transparent" @handleClick="() => {
          logout()
          closeMenu()
        }" title="Odhlásiť">Odhlásiť</BasicButton>
      </div>
    </header>
    <section v-if="store.state.credentials.loggedIn" class="user-select-none user">
        <div class="user-info">
          <div class="username">
            <Avatar :id="store.state.credentials.user._id" />
            <span class="name">{{ store.state.credentials.user.email }}</span>
            <span v-if="store.state.credentials.user.isVerified" class="material-icons" style="font-size:1rem;color:var(--theme-color)">verified</span>
          </div>
        </div>
      </section>
    <main class="menu-content">
      <section class="menu">
        <router-link @click.native="closeMenu" to="/">
          <span class="material-icons-outlined">home</span>
          <span class="label">Domov</span>
        </router-link>
        <router-link @click.native="closeMenu" to="/library">
          <span class="material-icons-outlined">video_library</span>
          <span class="label">Knižnica</span>
        </router-link>
        <router-link @click.native="closeMenu" to="/recommended">
          <span class="material-icons-outlined">recommend</span>
          <span class="label">Odporúčane</span>
        </router-link>
        <router-link @click.native="closeMenu" v-if="store.state.credentials.user?.isAdmin" to="/admin">
          <span class="material-icons-outlined">admin_panel_settings</span>
          <span class="label">Admin</span>
        </router-link>
        <router-link @click.native="closeMenu" to="/dmca">
          <span class="material-icons-outlined">lock</span>
          <span class="label">DMCA</span>
        </router-link>
        <button @click="openVisualSettings" class="menu-button">
          <span class="material-icons">palette</span>
          <span class="label">Vizuálne nastavenia</span>
        </button>
      </section>
      <Transition name="fade">
        <VisualSettingsModal v-if="isVisualMenuOpened" @close="isVisualMenuOpened = false" />
      </Transition>
    </main>
    <Footer :style="{ marginTop: 'auto', marginLeft: '10px' }" />
    <Teleport to="body">
      <div style="background-color: black; position: fixed; width: 100%; height: 100vh; top: 0; left: 0; opacity: 0.5; z-index: 100;"></div>
    </Teleport>
  </aside>
</template>

<script setup lang="ts">
import Footer from './Footer.vue'
import Avatar from './Avatar.vue'
import VisualSettingsModal from './VisualSettingsModal.vue'
import BasicButton from './Buttons/BasicButton.vue'

import { notify } from "@kyvg/vue3-notification"
import { onClickOutside } from '@vueuse/core'
import { ref, inject, onMounted, onUnmounted } from 'vue'
import Auth from '../auth/main'
import _ from '../utils/main'
import useEvent from '../composables/event'

const store = inject<any>('store')
const menu = ref<null | HTMLDivElement>(null)
const emit = defineEmits(['closeMenu','menu'])

const isVisualMenuOpened = ref(false)

const logout = () => Auth.logout().then(res => notify({ type: 'success', text: res.message }))

const closeAtEscapeKeydown = (e: KeyboardEvent) => { if(e.code === 'Escape') closeMenu() }

function openVisualSettings() { isVisualMenuOpened.value = true }

useEvent({ target: document, event: 'keydown', callback: closeAtEscapeKeydown })

onClickOutside(menu, () => closeMenu())

const closeMenu = () => emit('closeMenu', true)

onMounted(() => _.makeUnscrollable(document.body, true))
onUnmounted(() => _.makeUnscrollable(document.body, false))
</script>

<style lang="scss" scoped>
aside{
  position:fixed;
  top:0;
  left:0;
  z-index:101;
  max-width:330px;
  min-width:330px;
  max-height:100vh;
  min-height:100vh;
  display:flex;
  flex-direction:column;
  overflow:hidden;
  background-color:var(--background-color);

  header{
    display:flex;
    align-items:center;
    min-height:var(--nav-height);
    gap:1rem;
    padding:0 0.5rem 0 1.5rem;
    transition: 0.2s ease background;

    div.left-col{
      margin-right:auto;
      display:flex;
      align-items:center;
      gap:1rem;
    }
    div.right-col{
      margin-left:auto;
      display:flex;
      align-items:center;
      gap:1rem;
    }
  }
  div.visual-menu{
    display:flex;
    flex-direction:column;
    gap:1rem;
    padding:1rem;
    border-bottom-right-radius:2rem;
    border-bottom-left-radius:2rem;
    background:var(--card-color);
  }
  section.user{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--card-color);
    padding: 10px;
    div.user-info{
      div.username{
        display: flex;
        align-items: center;
        gap:8px;

        span{
          font-size: 0.75rem;
        }
      }
    }
  }
  main.menu-content{
    display:flex;
    flex-direction:column;
    gap:10px;
    overflow-y:scroll;
    
    overflow-x:hidden;

    &::-webkit-scrollbar{ width:15px; height:15px; }
    &::-webkit-scrollbar-thumb{background:var(--card-color);border:4px solid transparent;border-radius:10px;background-clip:content-box;}
    section.menu{
      display:flex;
      flex-direction:column;
      align-items: flex-start;
      gap:0.5rem;
      padding:0.75rem;

      button,a{
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        gap:10px;
        width: 100%;
        padding: 8px;
        border-radius: 0.25rem;
        font-weight: 700;

        span:first-of-type{
          opacity: 0.5;
          transition: 0.2s ease opacity;
        }

        span:last-of-type{
          font-size: 0.85rem;
        }

        &.router-link-active{
          color: var(--theme-color);

          span:first-of-type{
            opacity: 1;
          }
        }

        &:hover{
          background-color: var(--card-color);

          span:first-of-type{
            opacity: 1;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 600px){
  aside{
    max-width:100%;
    min-width:100%;
  }
}
</style>