<template>
  <nav v-auto-animate class="container">
    <div v-if="!isSearchRendered" class="left-menu">
      <NavButton @handleClick="isMenuOpened = !isMenuOpened">
        <template #icon><span class="material-icons" style="font-size:1.5rem;padding-top:5px;">menu</span></template>
      </NavButton>
    </div>
    <div v-if="isSearchRendered" class="middle">
      <SearchForm />
      <NavButton title="Zatvoriť vyhľadávanie" @handleClick="isSearchRendered = false">
        <template #icon><span style="color:var(--theme-color);font-size:1.5rem;">&#10095;</span></template>
      </NavButton>
    </div>
    <div v-if="!isSearchRendered" class="right-menu">
      <NavButton title="Vyhľadávanie" @handleClick="isSearchRendered = true">
        <template #icon><span class="material-icons" style="padding-top:5px;font-weight:700;color:var(--theme-color);">search</span></template>
      </NavButton>
      <template v-if="store.state.credentials.loggedIn">
        <NavButton class="icon-hide" title="Knižnica" @handleClick="$router.push('/library')">
          <template #icon><span class="material-icons-outlined icon" style="padding-top:5px">video_library</span></template>
        </NavButton>
        <NavButton class="icon-hide" title="Odporúčané" @handleClick="$router.push('/recommended')">
          <template #icon><span class="material-icons-outlined" style="padding-top:5px">recommend</span></template>
          <template #notification><span class="notification" v-if="store.state.notifications.recommended.length > 0"></span></template>
        </NavButton>
        <div id="fav-count" @click="bookmarksVisible = true">
          <span>Záložky</span>
          <span class="material-icons-outlined" style="font-size:1rem">bookmarks</span>
          <span>{{store.state.favourites.length}}</span>
        </div>
      </template>
      <div v-if="!isSearchRendered && !store.state.credentials.loggedIn" class="auth-buttons">
        <button v-if="store.state.globalSettings?.allowRegistration" class="register-button" @click="$router.push('/register')">Registrovať</button>
        <BasicButton mutation="hover-color-change" text="Prihlásiť sa" @handleClick="$router.push('/login')"/>
      </div>
    </div>
  </nav>
  <Teleport to="body">
    <Transition name="fade">
      <BookmarksModal v-if="bookmarksVisible" @close="bookmarksVisible = false" />
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="slide">
      <Sidebar v-if="isMenuOpened" @closeMenu="isMenuOpened = false"/>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, inject, defineAsyncComponent, onMounted } from 'vue'

import NavButton from './Buttons/NavButton.vue'
import BasicButton from './Buttons/BasicButton.vue'
import { DefaultEventsMap } from '@socket.io/component-emitter'
const BookmarksModal = defineAsyncComponent(() => import('./BookmarksModal.vue'))
const Sidebar = defineAsyncComponent(() => import('./Sidebar.vue'))
const SearchForm = defineAsyncComponent(() => import('./Content/SearchForm.vue'))

const store = inject<any>('store')
const socket = inject<DefaultEventsMap>('socket')

const isSearchRendered = ref(false)
const isMenuOpened = ref(false)
const bookmarksVisible = ref(false)

socket!.on('newRecommended', (data: any) => {
  const { type, id } = data.title.title
  store.methods.notifications.recommended.add({ type, id }) 
})

onMounted(() => { 
  const el = document.getElementsByTagName('nav')[0]
  const observer = new IntersectionObserver( 
    ([e]) => e.target.classList.toggle('scroll', e.intersectionRatio < 1),
    { threshold: [1] }
  )
  observer.observe(el)
})
</script>

<style lang="scss" scoped>
#fav-count{
  color:white;
  background-color:var(--theme-color);
  display:flex;
  align-self:center;
  gap:0.5rem;
  font-size:0.75rem;
  padding:0.35rem 0.75rem;
  border-radius:1rem;
  cursor:pointer;
  font-weight:700;
  margin-left:0.75rem;
  user-select:none;
}

nav{
  height:var(--nav-height);
  width:100%;
  display:flex;
  align-items:center;
  position:sticky;
  top:-1px;
  z-index:100;
  gap:10px;
  transition:0.4s ease background-color;
  isolation:isolate;
  &.scroll{
    height:calc(var(--nav-height) + 1px);
    background-color:var(--background-color);
  }
  div.auth-buttons{
    display:flex;
    gap:0.75rem;
    align-self:center;
    margin-left:0.75rem;
    button{
      font-size:0.75rem;
      &.register-button:hover{
        color:var(--theme-color)
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
  div.middle{
    margin:0 auto;
    display:flex;
    gap:1rem;
    width:100%;
    max-width:500px;
  }
}
@media screen and (max-width: 600px) {
  .icon-hide{ display:none!important }
  aside.modal{
    top:0;
    bottom:0;
    left:0;
    right:0;
    border-radius:0;
    position:fixed;
    min-height:100%;
  }
}
</style>