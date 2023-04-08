<template>
  <nav ref="navbar" v-auto-animate class="container">
    <div v-if="!isSearchRendered" class="left-menu">
      <NavButton
      @handleClick="isMenuOpened = !isMenuOpened"
      ><span class="material-icons" style="padding-top:5px;">menu</span></NavButton>
    </div>
    <div v-if="isSearchRendered" class="middle">
      <SearchForm />
      <button @click="isSearchRendered = false" v-font:large>&times;</button>
    </div>
    <div v-if="!isSearchRendered" class="right-menu">
      <NavButton
        title="Vyhľadávanie"
        @handleClick="isSearchRendered = true"
      ><span class="material-icons" style="padding-top:5px;font-weight:700;">search</span></NavButton>
      <template v-if="authStore.isLoggedIn">
        <NavButton
          title="Knižnica"
          @handleClick="$router.push('/library')"
        ><span class="material-icons-outlined icon" style="padding-top:5px">video_library</span></NavButton>
        <NavButton
          title="Odporúčané"
          @handleClick="$router.push('/recommended')"
          v-bind="{ ...(notificationsStore.notifications.recommended.length > 0 && { ['data-notification']: '' }) }"
        ><span class="material-icons-outlined" style="padding-top:5px">recommend</span></NavButton>
        <NavButton
          title="Záložky"
          @handleClick="bookmarksVisible = true"
          v-bind="{ ...(favouritesStore.favourites.length > 0 && {['data-count']: favouritesStore.favourites.length}) }"
        ><span class="material-icons-outlined" style="padding-top:5px">bookmarks</span></NavButton>
      </template>
      <div v-if="!isSearchRendered && !authStore.isLoggedIn" class="auth-buttons">
        <button
          class="register"
          v-if="globalConfigStore.globalConfig?.allowRegistration"
          @click="$router.push('/register')"
        >Registrovať</button>
        <button
          class="login"
          @click="$router.push('/login')"
        >Prihlásiť sa</button>
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
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { useFavouritesStore } from '../store/favourites'
import { useNotificationStore } from '../store/notifications'
import { useAuthStore } from '../store/auth';
import { useGlobalConfigStore } from '../store/global-config';
const BookmarksModal = defineAsyncComponent(() => import('./Modal/BookmarksModal.vue'))
const Sidebar = defineAsyncComponent(() => import('./Sidebar.vue'))
const SearchForm = defineAsyncComponent(() => import('./Content/SearchForm.vue'))

const notificationsStore = useNotificationStore()
const authStore = useAuthStore()
const globalConfigStore = useGlobalConfigStore()

const favouritesStore = useFavouritesStore()
const socket = inject<DefaultEventsMap>('socket')

const navbar = ref<HTMLDivElement | null>(null)
const isSearchRendered = ref(false)
const isMenuOpened = ref(false)
const bookmarksVisible = ref(false)

socket!.on('newRecommended', (data: any) => {
  const { type, id } = data.title.title
  notificationsStore.addNotification('recommended', { type, id })
})

onMounted(() => { 
  const observer = new IntersectionObserver(([entry]) => {
    entry.target.classList.toggle('scroll', entry.intersectionRatio < 1)
  }, {
    threshold: 1
  })
  observer.observe(navbar.value!)
})
</script>

<style lang="scss" scoped>
nav{
  height:var(--nav-height);
  width:100%;
  display:flex;
  align-items:center;
  position:sticky;
  top:-1px;
  z-index:100;
  gap:10px;
  transition:0.3s ease background-color;
  isolation:isolate;
  &.scroll{
    height:calc(var(--nav-height) + 1px);
    background-color:var(--background-color);
  }
  div.auth-buttons{
    display:flex;
    gap:10px;
    align-self:center;
    margin-left:5px;

    button{
      &.login {
        background-color: var(--theme-color);
        padding: 5px 10px;
        border-radius: 4px;
        color: white;
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

    a{
      line-height:1
    }
  }
  div.middle{
    margin:0 auto;
    display:flex;
    gap:15px;
    width:100%;
    max-width:500px;
  }
}
@media screen and (max-width: 600px) {
  .icon-hide{
    display:none!important
  }
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