<template>
  <aside ref="menu">
    <header class="container user-select-none">
      <NavButton @handleClick="closeMenu">
        <template #icon><span style="font-size:1.5rem">&#10094;</span></template>
      </NavButton>
      <div class="right-menu">
        <template v-if="store.state.credentials.loggedIn">
          <span style="font-size:0.75rem">{{store.state.credentials.user.email.split('@')[0]}}</span>
          <button class="logout-button" @click="logout(); closeMenu()">Odhlásiť sa</button>
        </template>
      </div>
    </header>
    <main class="menu-content">
      <section class="menu-links">
        <SidebarLink v-for="link, i in links" :key="i" :link="link" @close="closeMenu()"/>
      </section>
      <OpenCloseSettings>
        <template #label>Vizuálne nastavenia</template>
        <template #content>
          <div class="theme-picker">
            <button class="theme-button dark" @click="store.methods.settings.darkTheme.set(true)" :data-active="store.state.settings.darkTheme === true">
              <span class="material-icons">dark_mode</span>
            </button>
            <button class="theme-button light" @click="store.methods.settings.darkTheme.set(false)" :data-active="store.state.settings.darkTheme === false">
              <span class="material-icons-outlined">light_mode</span>
            </button>
          </div>
          <div class="color-picker">
            <button v-for="(color, i) in store.state.settings.themeColors.colors" :key="i" class="color" :style="'background:'+color" @click="store.methods.settings.themeColor.set(color)" :data-active="store.methods.settings.themeColor.get()===color"></button>
          </div>
        </template>
      </OpenCloseSettings>
      <OpenCloseSettings>
        <template #label>Posledne navštívené</template>
        <template #content>
          <span v-if="store.state.recentItems.length === 0" class="no-history">Žiadne navštívené</span>
          <div v-else class="grid-list-sec">
            <router-link class="recent-item" v-for="(recentItem, i) in store.state.recentItems" :key="i" :title="recentItem.title" :to="{ path: `/${recentItem.type}/${recentItem.id}` }">
              <img v-if="recentItem.poster" :src="`https://www.themoviedb.org/t/p/w220_and_h330_face${recentItem.poster}`" :alt="recentItem.title">
              <span v-else>{{recentItem.title}}</span>
            </router-link>
          </div>
        </template>
      </OpenCloseSettings>
      <Footer />
    </main>
  </aside>
</template>

<script setup>
import NavButton from './Buttons/NavButton.vue'
import SidebarLink from './Sidebar/SidebarLink.vue'
import OpenCloseSettings from './Sidebar/OpenCloseSettings.vue'
import Footer from './Footer.vue'
import { notify } from "@kyvg/vue3-notification"
import { onClickOutside } from '@vueuse/core'
import { ref, inject, onMounted, onUnmounted } from 'vue'
import Auth from '../auth/main.js'

const store = inject('store')
const menu = ref(null)
const emit = defineEmits(['closeMenu','menu'])

const links = [
  {
    icon:`<span style="font-size:1.25rem" class="material-icons">home</span>`,
    label:'Domov',
    route:'/',
    shown:true
  },
  {
    icon:`<span style="font-size:1.25rem" class="material-icons">video_library</span>`,
    label:'Knižnica',
    route:'/library',
    shown:true
  },
  {
    icon:`<span style="font-size:1.25rem" class="material-icons">recommend</span>`,
    label:'Odporúčané',
    route:'/recommended',
    shown:true
  },
  {
    icon:'<span style="font-size:1.25rem" class="material-icons">settings</span>',
    label:'Admin',
    route:'/admin',
    shown:store.state.credentials.user?.isAdmin || false
  }
]

const logout = () => {  Auth.logout().then(res => notify({ type: 'success', text: res.message })) }

const closeAtEscapeKeydown = (e) => { if(e.code === 'Escape') closeMenu() }

onMounted(() => { document.addEventListener('keydown', closeAtEscapeKeydown) })
onUnmounted(() => { document.removeEventListener('keydown', closeAtEscapeKeydown) })

onClickOutside(menu, () => { closeMenu() })

const closeMenu = () => { emit('closeMenu',true) }
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
    gap:15px;
    background-color:var(--card-color-hover)!important;
    div.right-menu{
      margin-left:auto;
      display:flex;
      align-items:center;
      gap:10px;
      button{
        display:flex;
        justify-content:center;
        align-items:center;
        gap:5px;
        font-size:0.75rem;
        &.logout-button{ 
          outline:1px solid var(--font-color);
          padding:3px 6px;
          border-radius:2px;
        }
      }
    }
  }
  header, main.menu-content{
    transition: 0.2s ease background;
    background:var(--card-color);
  }
  main.menu-content{
    display:flex;
    flex-direction:column;
    gap:0.5rem;
    overflow:auto;
    padding:0.75rem 0.75rem 0.5rem;
    background:var(--card-color);
    min-height:calc(100vh - var(--nav-height));
    overflow-x:hidden;
    &::-webkit-scrollbar{width:15px;height:15px;}
    &::-webkit-scrollbar-thumb{background:var(--card-color-hover);border:4px solid transparent;border-radius:10px;background-clip:content-box;}
    section.menu-links{
      display:flex;
      flex-direction:column;
      gap:0.25rem
    }
    div.theme-picker{
      display:flex;
      gap:10px;
      padding-top:0.5rem;
      button.theme-button{
        width:100%;
        padding:4px 8px;
        border-radius:6px;
        display:flex;
        gap:10px;
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
        position: relative;
        color:var(--font-color-dark);
        &[data-active=true]::after{
          content:'\2713';
          font-weight:900;
        }
      }
    }
    div.flex-list{
      margin-top:6px;
      display:flex;
      flex-wrap:wrap;
      gap:8px;
      a.history-item{
        font-size:0.75rem;
        background:var(--theme-color);
        padding:4px 8px;
        border-radius:14px;
        color:var(--font-color-dark);
      }
    }
    div.grid-list-sec{
      display:grid;
      grid-template-columns:repeat(3, 1fr);
      gap:10px;
      margin-top:6px;
      a.recent-item{
        background-color:var(--primary-color);
        overflow:hidden;
        border-radius:8px;
        aspect-ratio:2/3;
        img{ width:100%; height:auto; }
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
  button.remove-history, button.remove-recent{
    span{ font-size:1.25rem }
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