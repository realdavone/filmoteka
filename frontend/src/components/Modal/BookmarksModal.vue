<template>
  <Modal @close="$emit('close')">
    <template #modal>
      <aside ref="modal" class="modal user-select-none">
        <header>
          <span v-font:large class="heading">Záložky</span>
        </header>
        <section v-if="favouritesStore.favourites.length !== 0" class="title-holder">
          <div class="search-input-holder">
            <span class="material-icons-outlined">search</span>
            <input v-model="searchInput" class="search-input" type="text" placeholder="Vyhľadávanie v záložkách">
            <button v-if="searchInput.length" class="clear-search" @click="searchInput = ''">&times;</button>
          </div>
          <ul v-auto-animate>
            <li
              :class="{ 'inactive': !title.title.toLowerCase().includes(searchInput.toLowerCase()) }"
              class="title"
              v-for="title in favouritesStore.favourites"
              :key="title.id"
            >
              <router-link tabindex="0" @click.native="$emit('close')" :to="{ name: title.type, params: { id: title.id } }">
                <div class="poster">
                  <img v-if="title.img" :src="`https://image.tmdb.org/t/p/w92${title.img}`" onerror="javascript:this.remove()" :alt="title.title" loading="lazy">
                </div>
                <div>
                  <span v-font:small class="text">{{ title.title }}</span>
                  <span
                    v-if="title.episode"
                    class="last-watched"
                  >{{ title.season }}.{{`${title.episode < 10 ? '0' + title.episode : title.episode}`}}</span>
                </div>
              </router-link>
              <button
                v-font:large
                class="remove-item"
                @click="favouritesStore.toggle({ id: title.id, type: title.type, img: title.img, title: title.title })"
                title="Odobrať"
              >&times;</button>
            </li>
          </ul>
        </section>
        <div v-else v-font:medium class="no-items">
          <span class="material-icons-outlined">info</span>
          Neboli pridané žiadne záložky.
        </div>
        <div class="buttons">
          <BasicButton type="close" @handleClick="emit('close')">Zavrieť</BasicButton>
          <BasicButton v-if="favouritesStore.favourites.length !== 0" type="transparent" @handleClick="favouritesStore.removeAll()">Zmazať všetky</BasicButton>
        </div>
      </aside>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { onClickOutside } from '@vueuse/core'
import BasicButton from '../Buttons/BasicButton.vue'
import { useFavouritesStore } from '../../store/favourites'
const Modal = defineAsyncComponent(() => import('./Modal.vue'))

const modal = ref<null | HTMLElement>(null)
const searchInput = ref('')
const favouritesStore = useFavouritesStore()
const emit = defineEmits(['close'])

onClickOutside(modal, () => {
  searchInput.value = ''
  emit('close')
})
</script>

<style lang="scss" scoped>
aside.modal{
  min-width:300px;
  max-width:100%;
  min-height:60vh;
  max-height:60vh;
  background:var(--background-color);
  display:flex;
  flex-direction:column;
  gap:10px;
  border-radius:12px;
  box-shadow: var(--modal-box-shadow);
  overflow:hidden;
  padding-bottom:10px;
  header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:10px 10px 10px 15px;
    span.heading{ 
      font-weight:900;
    }
  }
  section.title-holder{
    overflow-x:hidden;
    overflow-y:scroll;
    padding:0 8px 0 15px;
    &::-webkit-scrollbar{width:15px;height:15px;}
    &::-webkit-scrollbar-thumb{background:var(--card-color-hover);border:4px solid transparent;border-radius:10px;background-clip:content-box;}
    div.search-input-holder{
      display:flex;
      align-items:center;
      gap:4px;
      outline:2px solid var(--card-color);
      padding:0 10px;
      border-radius: 4px;
      overflow:hidden;
      margin:2px 0 8px;
      span:first-of-type{
        opacity:0.5;
      }
      input.search-input{
        color:inherit;
        width:100%;
        padding:10px 8px;
        background:transparent;
      }
      button.clear-search{
        line-height:1;
        opacity:0.5;
      }
      &:focus-within{
        outline-color:var(--theme-color);
      }
    }
    li.title{
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:10px;
      padding: 8px;
      position:relative;
      a{
        display:flex;
        align-items:center;
        gap: 10px;
        width:100%;
        span.icon{
          background:var(--theme-color);
          justify-content:center;
          align-items:center;
          border-radius:15px;
          display:inline-flex;
          min-width:24px;
          height:24px;
        }
        div.poster{
          aspect-ratio:1;
          height:45px;
          overflow:hidden;
          border-radius:4px;
          background-color:var(--card-color-hover);
          img{
            width:100%;
            height:100%;
            object-fit:cover;
          }
        }
        span.text{
          font-weight:700;
        }
        span.last-watched{
          display:block;
          font-weight:bold;
          color:var(--theme-color);
        }
      }
      button.remove-item{     
        font-weight: 700;
        color: crimson;
      }
      &.inactive{
        opacity:0.25
      }
      &:last-of-type{
        border-bottom:none;
      }
      &:hover{
        background-color: var(--card-color-hover);
        border-radius: 4px;
      }
    }
  }
  div.buttons{
    display: flex;
    justify-content: end;
    gap:8px;
    padding: 0 10px;
    margin-top: auto;
  }
  div.no-items{
    padding:0 15px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
</style>