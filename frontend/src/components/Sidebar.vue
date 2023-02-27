<template>
  <aside ref="menu">
    <header class="user-select-none">
      <div class="left-col">
        <Logo :height="40"/>
      </div>
      <div class="right-col">
        <NavButton @handleClick="closeMenu">
          <template #icon><span style="font-size:1.5rem;font-weight:700;:5px;line-height:1;">&times;</span></template>
        </NavButton>
      </div>
    </header>
    <main class="menu-content">
      <section v-if="store.state.credentials.loggedIn" class="user-select-none user">
        <div class="user-info">
          <div class="username">
            <Avatar :id="store.state.credentials.user._id" />
            <span class="name">{{ store.state.credentials.user.email }}</span>
            <span v-if="store.state.credentials.user.isVerified" class="material-icons" style="font-size:1rem;color:var(--theme-color)">verified</span>
          </div>
        </div>
        <BasicButton type="transparent" @handleClick="() => {
          logout()
          closeMenu()
        }" title="Odhlásiť">Odhlásiť</BasicButton>
      </section>
      <section class="menu-tabs">
        <SidebarMenuTile v-for="link, i in links" :key="i" :link="link" @click="closeMenu" />
      </section>
      <section class="menu-items">
        <button @click="isVisualMenuOpened = true" class="menu-button">
          <span class="material-icons">palette</span>
          <span class="label">Vizuálne nastavenia</span>
        </button>
        <Transition name="fade">
          <VisualSettingsModal v-if="isVisualMenuOpened" @close="isVisualMenuOpened = false" />
        </Transition>
      </section>
    </main>
    <Footer :style="{ marginTop: 'auto', marginLeft: '10px' }" />
  </aside>
</template>

<script setup lang="ts">
import NavButton from './Buttons/NavButton.vue'
import SidebarMenuTile from './Sidebar/SidebarMenuTile.vue'
import Footer from './Footer.vue'
import Logo from './Logo.vue'
import Avatar from './Avatar.vue'
import VisualSettingsModal from './VisualSettingsModal.vue'

import { notify } from "@kyvg/vue3-notification"
import { onClickOutside } from '@vueuse/core'
import { ref, inject } from 'vue'
import Auth from '../auth/main'
import useEvent from '../composables/event'
import BasicButton from './Buttons/BasicButton.vue'

const store = inject<any>('store')
const menu = ref<null | HTMLDivElement>(null)
const emit = defineEmits(['closeMenu','menu'])

const isVisualMenuOpened = ref(false)

const links = [
  {
    icon: `home`,
    label: 'Domov',
    isLink: true,
    route: '/',
    shown: true
  },
  {
    icon: `video_library`,
    label: 'Knižnica',
    isLink: true,
    route: '/library',
    shown: true
  },
  {
    icon: `recommend`,
    label: 'Odporúčané',
    isLink: true,
    route: '/recommended',
    shown: true
  },
  {
    icon: 'admin_panel_settings',
    label: 'Admin',
    isLink: true,
    route: '/admin',
    shown: store.state.credentials.user?.isAdmin || false
  },
  {
    icon: 'lock',
    label: 'DMCA',
    isLink: true,
    route: '/dmca',
    shown: true
  }
]

const logout = () => Auth.logout().then(res => notify({ type: 'success', text: res.message }))

const closeAtEscapeKeydown = (e: KeyboardEvent) => { if(e.code === 'Escape') closeMenu() }

useEvent({ target: document, event: 'keydown', callback: closeAtEscapeKeydown })

onClickOutside(menu, () => closeMenu())

const closeMenu = () => emit('closeMenu', true)
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
    justify-content: space-between;
    align-items: center;
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
    padding:0.75rem 0.5rem 0.5rem 0.75rem;
    overflow-x:hidden;

    &::-webkit-scrollbar{width:15px;height:15px;}
    &::-webkit-scrollbar-thumb{background:var(--card-color);border:4px solid transparent;border-radius:10px;background-clip:content-box;}
    section.menu-items{
      display:flex;
      flex-direction:column;
      align-items: flex-start;
      gap:0.5rem;

      button{
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        gap:10px;
        background-color: var(--card-color);
        width: 100%;
        padding: 8px;
        border-radius: 0.25rem;

        span:last-of-type{
          font-size: 0.85rem;
        }

        &:hover{
          background-color: var(--card-color-hover);
        }
      }
    }
    section.menu-tabs{
      display:grid;
      grid-template-columns:repeat(3, 1fr);
      gap:10px;
    }
    div.grid-list-sec{
      display:grid;
      grid-template-columns:repeat(3, 1fr);
      gap:1rem;
      a.recent-item{
        background-color:var(--primary-color);
        overflow:hidden;
        border-radius:1rem;
        aspect-ratio:2/3;
        img{
          width:100%;
          height:auto;
          object-fit:cover;
        }
        span{
          font-size:0.5rem;
          line-height:1;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:5px;
          width:100%;
          height:100%;
        }
      }
    }
  }
  span.no-history{ font-size:0.8rem }
}
@media screen and (max-width: 600px){
  aside{
    max-width:100%;
    min-width:100%;
  }
}
</style>