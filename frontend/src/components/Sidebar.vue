<template>
  <aside ref="menu">
    <header class="user-select-none">
      <div class="left-col">
        <Logo :height="40"/>
      </div>
      <div class="right-col">
        <NavButton @handleClick="closeMenu">
          <template #icon><span style="font-size:1.5rem;padding:0 0 5px 0;line-height:1;">&times;</span></template>
        </NavButton>
      </div>
    </header>
    <main class="menu-content">
      <section v-if="store.state.credentials.loggedIn" class="welcome">
        <span class="greeting">Serus, {{store.state.credentials.user.email}}</span>
        <button class="logout-button" @click="logout(); closeMenu()" title="Odhlásiť">
          <span class="material-icons-outlined">logout</span>
        </button>
      </section>
      <section class="menu-tabs">
        <SidebarMenuTile v-for="link, i in links" :key="i" :link="link" @click="closeMenu()" />
      </section>
      <section v-auto-animate class="menu-items">
        <SidebarMenuItem :link="visualMenuButton" @click="isVisualMenuOpened = !isVisualMenuOpened" :class="isVisualMenuOpened && 'active'"/>
        <div v-if="isVisualMenuOpened" class="visual-menu">
          <div class="theme-picker">
            <button class="theme-button dark" @click="store.methods.settings.darkTheme.set(true)" :data-active="store.state.settings.darkTheme === true" title="Tmavý režim">
              <span class="material-icons">dark_mode</span>
            </button>
            <button class="theme-button light" @click="store.methods.settings.darkTheme.set(false)" :data-active="store.state.settings.darkTheme === false" title="Svetlý režim">
              <span class="material-icons-outlined">light_mode</span>
            </button>
          </div>
          <div class="color-picker">
            <button v-for="(color, i) in store.state.settings.themeColors.colors" :key="i" class="color" :style="`border-color:${color}`" @click="store.methods.settings.themeColor.set(color)" :data-active="store.methods.settings.themeColor.get()===color"></button>
          </div>
        </div>
        <SidebarMenuItem :link="recentItemsMenuButton" @click="isRecentItemsMenuOpened = !isRecentItemsMenuOpened" :class="isRecentItemsMenuOpened && 'active'" />
        <div v-if="isRecentItemsMenuOpened" class="recent-items">
          <span v-if="store.state.recentItems.length === 0" class="no-history">Žiadne navštívené</span>
          <div v-else class="grid-list-sec">
            <router-link class="recent-item" v-for="(recentItem, i) in store.state.recentItems" :key="i" :title="recentItem.title" :to="{ path: `/${recentItem.type}/${recentItem.id}` }" @click.native="closeMenu">
              <img v-if="recentItem.poster" :src="`https://www.themoviedb.org/t/p/w220_and_h330_face${recentItem.poster}`" :alt="recentItem.title">
              <span v-else>{{recentItem.title}}</span>
            </router-link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  </aside>
</template>

<script setup lang="ts">
import NavButton from './Buttons/NavButton.vue'
import SidebarMenuItem from './Sidebar/SidebarMenuItem.vue'
import SidebarMenuTile from './Sidebar/SidebarMenuTile.vue'
import Footer from './Footer.vue'
import Logo from './Logo.vue'

import { notify } from "@kyvg/vue3-notification"
import { onClickOutside } from '@vueuse/core'
import { ref, inject, onMounted, onUnmounted } from 'vue'
import Auth from '../auth/main'
import useEvent from '../composables/event'

const store = inject<any>('store')
const menu = ref(null)
const emit = defineEmits(['closeMenu','menu'])

const isVisualMenuOpened = ref(false)
const isRecentItemsMenuOpened = ref(false)

const links = [
  {
    icon: `<span class="material-icons">home</span>`,
    label: 'Domov',
    isLink: true,
    route: '/',
    shown: true
  },
  {
    icon: `<span class="material-icons">video_library</span>`,
    label: 'Knižnica',
    isLink: true,
    route: '/library',
    shown: true
  },
  {
    icon: `<span class="material-icons">recommend</span>`,
    label: 'Odporúčané',
    isLink: true,
    route: '/recommended',
    shown: true
  },
  {
    icon: '<span class="material-icons">settings</span>',
    label: 'Admin',
    isLink: true,
    route: '/admin',
    shown: store.state.credentials.user?.isAdmin || false
  },
  {
    icon: '<span class="material-icons">lock</span>',
    label: 'DMCA',
    isLink: true,
    route: '/dmca',
    shown: true
  }
]

const visualMenuButton = {
  icon: '<span style="font-size:1.25rem" class="material-icons">brush</span>',
  label: 'Vizuálne nastavenia',
  isLink: false,
  route: null,
  shown: true
}

const recentItemsMenuButton = {
  icon: '<span style="font-size:1.25rem" class="material-icons">history</span>',
  label: 'Posledne navštívené',
  isLink: false,
  route: null,
  shown: true
}

const logout = () => {  Auth.logout().then(res => notify({ type: 'success', text: res.message })) }

const closeAtEscapeKeydown = (e: any) => { if(e.code === 'Escape') closeMenu() }

useEvent({ target: document, event: 'keydown', callback: closeAtEscapeKeydown })

onClickOutside(menu, () => { closeMenu() })

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
  header{
    display:flex;
    align-items:center;
    min-height:var(--nav-height);
    gap:1rem;
    padding:0 0.5rem 0 1.5rem;
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
    background:var(--card-color-hover);
    padding:1rem;
    border-bottom-right-radius:2rem;
    border-bottom-left-radius:2rem;
  }
  div.recent-items{
    background:var(--card-color-hover);
    padding:1rem;
    border-bottom-right-radius:2rem;
    border-bottom-left-radius:2rem;
  }
  header, main.menu-content{
    transition: 0.2s ease background;
    background:var(--card-color);
  }
  main.menu-content{
    display:flex;
    flex-direction:column;
    gap:1rem;
    overflow-y:scroll;
    padding:1.5rem 0.75rem 0.5rem;
    background:var(--card-color);
    min-height:calc(100vh - var(--nav-height));
    overflow-x:hidden;
    &::-webkit-scrollbar{width:15px;height:15px;}
    &::-webkit-scrollbar-thumb{background:var(--card-color-hover);border:4px solid transparent;border-radius:10px;background-clip:content-box;}
    section.welcome{
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:1rem;
      span.greeting{
        font-size:0.85rem;
      }
      button.logout-button{
        line-height:1;
        span{
          font-size:1rem;
        }
      }
    }
    section.menu-items{
      display:flex;
      flex-direction:column;
      gap:0.5rem;
    }
    section.menu-tabs{
      display:grid;
      grid-template-columns:repeat(3, 1fr);
      gap:1rem
    }
    div.theme-picker{
      display:flex;
      gap:1rem;
      button.theme-button{
        width:100%;
        padding:4px 8px;
        border-radius:0.5rem;
        display:flex;
        gap:1rem;
        align-items:center;
        justify-content:center;
        position:relative;
        &.dark{
          background:var(--dark-background);
          color:var(--font-color-dark);
        }
        &.light{
          background:var(--light-background);
          color:var(--font-color-light);
        }
        &[data-active=true]::after{
          content:'';
          position:absolute;
          top:-7px;
          right:5px;
          font-weight:900; 
          font-size:0.75rem;
          content:'\2713'
        }
      }
    }
    div.color-picker{
      display:flex;
      gap:8px;
      button.color{
        width:100%;
        aspect-ratio:1;
        border-radius:100px;
        position:relative;
        color:var(--font-color-dark);
        overflow:hidden;
        border-width:3px;
        border-style:solid;
        &[data-active=true]{ background-color:var(--theme-color) }
      }
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