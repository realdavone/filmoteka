<template>
  <aside ref="menu">
    <header class="user-select-none">
      <div class="left-col">
        <button
        v-font:large  
          @click="closeMenu"
          style="width:45px;"
        >&times;</button>
      </div>
      <div v-if="store.state.credentials.loggedIn" class="right-col">
        <BasicButton
          type="transparent"
          @handleClick="() => {
            logout()
            closeMenu()
          }"
          title="Odhlásiť"
        >Odhlásiť</BasicButton>
      </div>
    </header>
    <section v-if="store.state.credentials.loggedIn" class="user-select-none user">
        <div class="user-info">
          <div class="username">
            <Avatar :id="store.state.credentials.user._id" />
            <span v-font:small>{{ store.state.credentials.user.email }}</span>
            <Verified v-if="store.state.credentials.user.isVerified" />
          </div>
        </div>
      </section>
    <main class="menu-content">
      <section class="menu">
        <MenuItem
        v-for="item in menuItems"
        :key="item.label"
        :item="{
          label: item.label,
          icon: item.icon,
          route: item.route,
          isVisible: item.isVisible
        }"
        @handleClick="menuClickHandler(item?.onclick || closeMenu)" />
      </section>
      <Transition name="fade">
        <VisualSettingsModal v-if="isVisualMenuOpened" @close="isVisualMenuOpened = false" />
      </Transition>
    </main>
    <Footer :style="{ marginLeft: '10px' }" />
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
import MenuItem from './Sidebar/MenuItem.vue'
import { notify } from "@kyvg/vue3-notification"
import { onClickOutside } from '@vueuse/core'
import { ref, inject, onMounted, onUnmounted } from 'vue'
import Auth from '../auth/main'
import _ from '../utils/main'
import useEvent from '../composables/event'
import Verified from './Content/Verified.vue'

const store = inject<any>('store')
const menu = ref<null | HTMLDivElement>(null)
const emit = defineEmits(['closeMenu','menu'])

const isVisualMenuOpened = ref(false)

const menuItems = [
  {
    label: 'Domov',
    icon: 'home',
    route: '/',
    isVisible: true
  },
  {
    label: 'Knižnica',
    icon: 'video_library',
    route: '/library',
    isVisible: true
  },
  {
    label: 'Odporúčane',
    icon: 'recommend',
    route: '/recommended',
    isVisible: true
  },
  {
    label: 'Admin',
    icon: 'admin_panel_settings',
    route: '/admin',
    isVisible: store.state.credentials.user?.isAdmin
  },
  {
    label: 'DMCA',
    icon: 'lock',
    route: '/dmca',
    isVisible: true
  },
  {
    label: 'Vizuálne nastavenia',
    icon: 'palette',
    onclick: () => {
      isVisualMenuOpened.value = true
    },
    isVisible: true
  }
]

const logout = () => Auth.logout().then(res => notify({ type: 'success', text: res.message }))

useEvent({
  target: document,
  event: 'keydown',
  callback: (e: KeyboardEvent) => { e.code === 'Escape' && closeMenu() }
})

onClickOutside(menu, () => closeMenu())

const closeMenu = () => {
  emit('closeMenu')
}

function menuClickHandler(callback?: () => void) {
  callback?.()
}

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
    gap: 15px;
    padding:0 8px 0 24px;
    transition: 0.2s ease background;

    div.left-col{
      margin-right:auto;
      display:flex;
      align-items:center;
      gap: 15px;
    }
    div.right-col{
      margin-left:auto;
      display:flex;
      align-items:center;
      gap: 15px;
    }
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
      gap: 8px;
      padding: 10px;
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