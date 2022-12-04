<template>
  <aside ref="menu">
    <header class="user-select-none">
      <div class="left-col">
        <Logo :height="40"/>
      </div>
      <div class="middle-col">
        <template v-if="store.state.credentials.loggedIn">
          <div class="user">
            <span style="font-size:0.75rem">{{store.state.credentials.user.email.split('@')[0]}}</span>
          </div>
          <button class="logout-button" @click="logout(); closeMenu()">Odhlásiť</button>
        </template>
      </div>
      <div class="right-col">
        <NavButton @handleClick="closeMenu">
          <template #icon><span style="font-size:1.5rem;padding:0 5px 0 0;line-height:1;">&#10094;</span></template>
        </NavButton>
      </div>
    </header>
    <main class="menu-content">
      <section v-auto-animate class="menu-links">
        <SidebarMenuItem v-for="link, i in links" :key="i" :link="link" @click="closeMenu()" />
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

<script setup>
import NavButton from './Buttons/NavButton.vue'
import SidebarMenuItem from './Sidebar/SidebarMenuItem.vue'
import Footer from './Footer.vue'
import Logo from './Logo.vue'

import { notify } from "@kyvg/vue3-notification"
import { onClickOutside } from '@vueuse/core'
import { ref, inject, onMounted, onUnmounted } from 'vue'
import Auth from '../auth/main.js'

const store = inject('store')
const menu = ref(null)
const emit = defineEmits(['closeMenu','menu'])

const isVisualMenuOpened = ref(false)
const isRecentItemsMenuOpened = ref(false)

const links = [
  {
    icon: `<span style="font-size:1.25rem" class="material-icons">home</span>`,
    label: 'Domov',
    isLink: true,
    route: '/',
    shown: true
  },
  {
    icon: `<span style="font-size:1.25rem" class="material-icons">video_library</span>`,
    label: 'Knižnica',
    isLink: true,
    route: '/library',
    shown: true
  },
  {
    icon: `<span style="font-size:1.25rem" class="material-icons">recommend</span>`,
    label: 'Odporúčané',
    isLink: true,
    route: '/recommended',
    shown: true
  },
  {
    icon: '<span style="font-size:1.25rem" class="material-icons">settings</span>',
    label: 'Admin',
    isLink: true,
    route: '/admin',
    shown: store.state.credentials.user?.isAdmin || false
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

const closeAtEscapeKeydown = (e) => { if(e.code === 'Escape') closeMenu() }

onMounted(() => { document.addEventListener('keydown', closeAtEscapeKeydown) })
onUnmounted(() => { document.removeEventListener('keydown', closeAtEscapeKeydown) })

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
    div.middle-col{
      margin:0 auto;
      display:flex;
      align-items:center;
      gap:1rem;
      div.user{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:0.5rem;
        span:last-of-type{
          line-height:1;
        }
      }
      button.logout-button{
        font-size:0.65rem;
        outline:1px solid var(--font-color);
        padding:3px 6px;
        border-radius:0.25rem;
      }
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
    gap:0.5rem;
    overflow-y:scroll;
    padding:0.75rem 0.75rem 0.5rem;
    background:var(--card-color);
    min-height:calc(100vh - var(--nav-height));
    overflow-x:hidden;
    &::-webkit-scrollbar{width:15px;height:15px;}
    &::-webkit-scrollbar-thumb{background:var(--card-color-hover);border:4px solid transparent;border-radius:10px;background-clip:content-box;}
    section.menu-links{
      display:flex;
      flex-direction:column;
      gap:0.5rem;
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