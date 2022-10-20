<template>
  <nav class="container">
    <div v-if="!isSearchRendered" class="left-menu">
      <NavButton @handleClick="isMenuOpened = !isMenuOpened">
        <template #icon><span style="font-size:1.5rem">&#9776;</span></template>
      </NavButton>
      <router-link to="/">
        <Logo class="icon-hide" :height="36" />
      </router-link>
    </div>
    <SearchForm v-if="isSearchRendered" />
    <div class="right-menu">
      <NavButton title="Vyhĺadávanie" @handleClick="isSearchRendered = !isSearchRendered">
        <template #icon><span class="material-symbols-outlined" style="padding-top:5px;color:var(--theme-color);font-weight:700;">{{!isSearchRendered ? 'search' : 'arrow_forward_ios'}}</span></template>
      </NavButton>
      <template v-if="!isSearchRendered && store.state.credentials.loggedIn">
        <NavButton class="icon-hide" title="Knižnica" @handleClick="$router.push('/library')">
          <template #icon><span class="material-symbols-outlined icon" style="padding-top:5px">video_library</span></template>
        </NavButton>
        <NavButton class="icon-hide" title="Odporúčané" @handleClick="$router.push('/recommended')">
          <template #icon><span class="material-symbols-outlined" style="padding-top:5px">recommend</span></template>
          <template #notification><span class="notification" v-if="store.state.notifications.recommended.length > 0"></span></template>
        </NavButton>
        <NavButton title="Záložky" @handleClick="bookmarksVisible = true">
          <template #icon><span :style="favStyles" id="favCount">{{favCount}}</span></template>
        </NavButton>
      </template>
      <div v-if="!isSearchRendered && !store.state.credentials.loggedIn" class="auth-buttons">
        <button v-if="store.state.globalSettings?.allowRegistration" class="register-button" @click="$router.push('/register')">Registrovať</button>
        <button class="login-button" @click="$router.push('/login')">Prihlásiť sa</button>
      </div>
    </div>
  </nav>
  <Teleport to="body">
    <Transition name="fade">
      <Modal v-if="bookmarksVisible" @close="bookmarksVisible = false">
        <template #modal>
          <aside ref="modal" class="modal user-select-none">
            <header>
              <span class="heading">Záložky</span>
              <CloseButton @click="bookmarksVisible = false" />
            </header>
            <section v-if="store.state.favourites.length !== 0" class="title-holder">
              <div class="search-input-holder">
                <input v-model="searchInput" class="search-input" type="text" placeholder="Hľadaj">
                <button v-if="searchInput!==''" class="clear-search" @click="searchInput = ''">&times;</button>
              </div>
              <ul v-auto-animate>
                <li :class="{'inactive':title.inactive}" class="title" v-for="title in items" :key="title.id">
                  <router-link @click.native="bookmarksVisible = false" :to="{ name: title.type, params: { id: title.id } }">
                    <TypeIcon class="icon" :type="title.type"/>
                    <div class="poster">
                      <img v-if="title.img" :src="`https://image.tmdb.org/t/p/w45_and_h45_face${title.img}`" :alt="title.title" loading="lazy">
                    </div>
                    <span class="text">{{title.title}}</span>
                    <span v-if="title.season!==undefined" class="last-watched" title="Posledná prehraná epizóda">{{title.season}}.{{`${title.episode < 10 ? '0' + title.episode : title.episode}`}}</span>
                  </router-link>
                  <button class="remove-item" @click="store.methods.favourites.toggle({ id: title.id, type: title.type })" title="Odobrať">&#8854;</button>
                </li>
              </ul>
            </section>
            <p v-else class="no-items">
              Neboli pridané žiadne záložky.<br>Záložky sa daju pridať kliknutím na ikonu 
              <span class="material-symbols-outlined" style="font-size:1.25rem;vertical-align:bottom;color:var(--theme-color)">bookmark_add</span>
            </p>
            <div v-if="store.state.favourites.length !==0 " class="bin-holder">
              <button @click="store.methods.favourites.removeAll()">Zmazať všetky</button>
            </div>
          </aside>
        </template>
      </Modal>
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="slide">
      <Sidebar v-if="isMenuOpened" @closeMenu="isMenuOpened = false"/>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, inject, computed, defineAsyncComponent, onMounted, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'

import Logo from './Logo.vue'
import NavButton from './Buttons/NavButton.vue'
const Modal = defineAsyncComponent(() => import('./Modal.vue'))
const Sidebar = defineAsyncComponent(() => import('./Sidebar.vue'))
const SearchForm = defineAsyncComponent(() => import('./Content/SearchForm.vue'))
const TypeIcon = defineAsyncComponent(() => import('./Content/TypeIcon.vue'))
const CloseButton = defineAsyncComponent(() => import('./Buttons/CloseButton.vue'))

const store = inject('store')
const socket = inject('socket')

const isSearchRendered = ref(false)
const isMenuOpened = ref(false)
const modal = ref(null)
const bookmarksVisible = ref(false)
const searchInput = ref('')

const favStyles = {
  display: 'block',
  fontWeight: '700',
  borderRadius: '50%',
  maxWidth: '25px',
  maxHeight: '25px',
  minWidth:'25px',
  minHeight: '25px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: '0.65rem',
  backgroundColor: 'var(--theme-color)'
}

onClickOutside(modal, () => {
  searchInput.value = ''
  bookmarksVisible.value = false 
})

const items = computed(() => {
  let result = []
  for(let title of store.state['favourites']){
    if(title.title.toLowerCase().includes(searchInput.value.toLowerCase())) result.push(title)
    else result.push({ ...title, inactive: true })
  }
  return result
})

const favCount = computed(() => {
  document.getElementById('favCount')?.classList.add('scaleup')
  return store.state.favourites.length
}) 

socket.on('newRecommended', (data) => {
  const { type, id } = data.title.title
  store.methods.notifications.recommended.add({ type, id }) 
})

onMounted(() => { document.getElementById('favCount')?.addEventListener('animationend', e => { e.target.classList.remove('scaleup') }) })
onUnmounted(() => { document.getElementById('favCount')?.removeEventListener('animationend') })
</script>

<style lang="scss" scoped>
nav{
  height:var(--nav-height);
  width:100%;
  display:flex;
  align-items:center;
  position:sticky;
  top:0;
  z-index:100;
  gap:10px;
  background-color:var(--background-color-alpha);
  backdrop-filter:blur(5px);
  div.auth-buttons{
    display:flex;
    gap:0.75rem;
    align-self:center;
    margin-left:0.75rem;
    button{
      font-size:0.75rem;
      &.login-button{
        background-color:var(--theme-color);
        color:var(--font-color-dark);
        padding:6px 8px;
        border-radius:4px;
        font-weight:700;
      }
    }
  }
  div.right-menu{
    display:flex;
    align-items:stretch;
    margin-left:auto;
  }
  div.left-menu{
    display:flex;
    align-items:center;
    gap:20px;
    margin-right:auto;
    a{line-height:1}
  }
}
aside.modal{
  min-width:300px;
  max-width:100%;
  min-height:60vh;
  max-height:60vh;
  background:var(--card-color);
  display:flex;
  flex-direction:column;
  gap:10px;
  border-radius:12px;
  box-shadow: 0px 0px 33px 7px rgba(0, 0, 0, 0.156);
  overflow:hidden;
  padding-bottom:10px;
  header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:10px 10px 10px 15px;
    background-color:var(--card-color-hover);
    span.heading{ 
      font-size:1.15rem;
      font-weight:900;
    }
    button{
      height:30px;
      min-width:30px;
      display:flex;
      justify-content:center;
      align-items:center;
      border-radius:50%;
      transition:0.2s ease background-color;
      color:crimson;
      font-size:1.25rem;
      line-height:1;
      padding-bottom:3px;
      &:active{background-color:#dc143c40;}
    } 
  }
  section.title-holder{
    overflow:auto;
    padding:0 10px;
    div.search-input-holder{
      display:flex;
      align-items:center;
      gap:5px;
      background:var(--card-color-hover);
      padding:0 10px 0 10px;
      border-radius:20px;
      overflow:hidden;
      margin:0 5px 10px;
      input.search-input{
        color:inherit;
        width:100%;
        padding:10px 5px;
        background:transparent;
      }
      button.clear-search{
        font-size:1.5rem;
        line-height:1;
      }
    }
    li.title{
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:15px;
      padding:6px 10px 6px;
      transition:0.2s ease background;
      position:relative;
      margin-bottom:5px;
      border-radius:60px;
      a{
        display:flex;
        align-items:center;
        gap:8px;
        width:100%;
        span.icon{
          background:var(--theme-color);
          justify-content:center;
          align-items:center;
          border-radius:15px;
          display:inline-flex;
          min-width:24px;
          height:24px;
          i{font-size:0.7rem;}
        }
        div.poster{
          outline:2px solid var(--theme-color);
          min-width:24px;
          max-width:24px;
          min-height:24px;
          max-height:24px;
          border-radius:4px;
          overflow:hidden;
          img{width:100%;height:100%;}
        }
        span.text{font-size:0.8rem;font-weight:700;}
        span.last-watched{
          font-weight:bold;
          color:var(--theme-color);
          font-size:0.8rem;
        }
      }
      button.remove-item{
        font-size:1rem;
        color:crimson;
        font-weight:900;
        padding-bottom:4px;
      }
      &.inactive{ opacity:0.25 }
      &:last-of-type{ margin-bottom:0 }
      &:active{ background:var(--card-color-hover) }
    }
  }
  div.bin-holder{
    display:flex;
    justify-content:flex-end;
    padding:0 10px;
    button{
      background:crimson;
      padding:5px 8px;
      border-radius:6px;
      transition:0.2s ease background;
      font-size:0.7rem;
      font-weight:700;
      margin-bottom:2px;
      color:white;
    }
  }
  p.no-items{
    padding:0 15px;
    font-size:0.8rem;
  }
}
.scaleup{
  animation-name:scaleup;
  animation-duration:0.4s;
}
@media screen and (max-width: 600px) {
  .icon-hide{
    display:none!important;    
  }
}
@keyframes scaleup{
  0%, 100% {transform:scale(1);}
  50% {transform:scale(1.25);}
}
</style>