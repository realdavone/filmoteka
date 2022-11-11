<template>
  <nav v-auto-animate class="container">
    <div v-if="!isSearchRendered" class="left-menu">
      <NavButton @handleClick="isMenuOpened = !isMenuOpened">
        <template #icon><span class="material-icons" style="font-size:1.5rem;line-height:1">menu</span></template>
      </NavButton>
    </div>
    <div v-if="isSearchRendered" class="middle">
      <SearchForm />
      <NavButton title="Vyhľadávanie" @handleClick="isSearchRendered = false">
        <template #icon>
          <span style="color:var(--theme-color);font-size:1.5rem">&#10095;</span>
        </template>
      </NavButton>
    </div>
    <div v-if="!isSearchRendered" class="right-menu">
      <NavButton title="Vyhľadávanie" @handleClick="isSearchRendered = true">
        <template #icon><span class="material-icons" style="padding-top:5px;font-weight:700;color:var(--theme-color);">search</span></template>
      </NavButton>
      <template v-if="store.state.credentials.loggedIn">
        <NavButton class="icon-hide" title="Knižnica" @handleClick="$router.push('/library')">
          <template #icon><span class="material-icons icon" style="padding-top:5px">video_library</span></template>
        </NavButton>
        <NavButton class="icon-hide" title="Odporúčané" @handleClick="$router.push('/recommended')">
          <template #icon><span class="material-icons" style="padding-top:5px">recommend</span></template>
          <template #notification><span class="notification" v-if="store.state.notifications.recommended.length > 0"></span></template>
        </NavButton>
        <NavButton title="Záložky" @handleClick="bookmarksVisible = true">
          <template #icon><span :style="favStyles" id="favCount">{{favCount}}</span></template>
        </NavButton>
      </template>
      <div v-if="!isSearchRendered && !store.state.credentials.loggedIn" class="auth-buttons">
        <button v-if="store.state.globalSettings?.allowRegistration" class="register-button" @click="$router.push('/register')">Registrovať</button>
        <BasicButton text="Prihlásiť sa" @handleClick="$router.push('/login')"/>
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

<script setup>
import { ref, inject, computed, defineAsyncComponent, onMounted, onUnmounted } from 'vue'

import NavButton from './Buttons/NavButton.vue'
import BasicButton from './Buttons/BasicButton.vue'
const BookmarksModal = defineAsyncComponent(() => import('./BookmarksModal.vue'))
const Sidebar = defineAsyncComponent(() => import('./Sidebar.vue'))
const SearchForm = defineAsyncComponent(() => import('./Content/SearchForm.vue'))

const store = inject('store')
const socket = inject('socket')

const isSearchRendered = ref(false)
const isMenuOpened = ref(false)
const bookmarksVisible = ref(false)

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
  backgroundColor: 'var(--theme-color)',
  fontFamily: `monospace,'Roboto Mono'`
}

const favCount = computed(() => {
  document.getElementById('favCount')?.classList.add('scaleup')
  return store.state.favourites.length
}) 

socket.on('newRecommended', (data) => {
  const { type, id } = data.title.title
  store.methods.notifications.recommended.add({ type, id }) 
})

onMounted(() => { 
  document.getElementById('favCount')?.addEventListener('animationend', e => e.target.classList.remove('scaleup') ) 

  const el = document.getElementsByTagName('nav')[0]
  const observer = new IntersectionObserver( 
    ([e]) => e.target.classList.toggle('scroll', e.intersectionRatio < 1),
    { threshold: [1] }
  )
  observer.observe(el)
})
onUnmounted(() => { document.getElementById('favCount')?.removeEventListener('animationend') })
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
  transition:0.2s ease background-color;
  isolation:isolate;
  &.scroll{
  background-color:var(--background-color-alpha);
  backdrop-filter:blur(5px);
  }
  div.auth-buttons{
    display:flex;
    gap:0.75rem;
    align-self:center;
    margin-left:0.75rem;
    button{ font-size:0.75rem }
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
.scaleup{
  animation-name:scaleup;
  animation-duration:0.4s;
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
@keyframes scaleup{
  0%, 100% { transform:scale(1) }
  50% { transform:scale(1.25) }
}
</style>