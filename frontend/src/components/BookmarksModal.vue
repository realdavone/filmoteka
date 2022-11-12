<template>
  <Modal @close="$emit('close')">
    <template #modal>
      <aside ref="modal" class="modal user-select-none">
        <header>
          <span class="heading">Záložky</span>
          <CloseButton @click="$emit('close')" />
        </header>
        <section v-if="store.state.favourites.length !== 0" class="title-holder">
          <div class="search-input-holder">
            <input v-model="searchInput" class="search-input" type="text" placeholder="Vyhľadávanie">
            <button v-if="searchInput !== ''" class="clear-search" @click="searchInput = ''">&times;</button>
          </div>
          <ul v-auto-animate>
            <li :class="{ 'inactive' : title.inactive }" class="title" v-for="title in items" :key="title.id">
              <router-link tabindex="0" @click.native="$emit('close')" :to="{ name: title.type, params: { id: title.id } }">
                <div class="poster">
                  <img v-if="title.img" :src="`https://image.tmdb.org/t/p/w45_and_h45_face${title.img}`" :alt="title.title" loading="lazy">
                </div>
                <TypeIcon class="icon" :type="title.type"/>
                <div>
                  <span class="text">{{title.title}}</span>
                  <span v-if="title.season !== undefined" class="last-watched" title="Posledná prehraná epizóda">{{title.season}}.{{`${title.episode < 10 ? '0' + title.episode : title.episode}`}}</span>
                </div>
              </router-link>
              <button class="remove-item" @click="store.methods.favourites.toggle({ id: title.id, type: title.type })" title="Odobrať">&times;</button>
            </li>
          </ul>
        </section>
        <span v-else class="no-items">Neboli pridané žiadne záložky.</span>
        <div v-if="store.state.favourites.length !== 0" class="bin-holder">
          <button @click="store.methods.favourites.removeAll()">Zmazať všetky</button>
        </div>
      </aside>
    </template>
  </Modal>
</template>

<script setup>
import { inject, computed, ref, defineAsyncComponent } from 'vue'
import { onClickOutside } from '@vueuse/core'

const Modal = defineAsyncComponent(() => import('./Modal.vue'))
const TypeIcon = defineAsyncComponent(() => import('./Content/TypeIcon.vue'))
const CloseButton = defineAsyncComponent(() => import('./Buttons/CloseButton.vue'))

const store = inject('store')

const modal = ref(null)
const searchInput = ref('')

const emit = defineEmits(['close'])

onClickOutside(modal, () => {
  searchInput.value = ''
  emit('close')
})

const items = computed(() => {
  let result = []
  for(let title of store.state['favourites']){
    if(title.title.toLowerCase().includes(searchInput.value.toLowerCase())) result.push(title)
    else result.push({ ...title, inactive: true })
  }
  return result
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
  box-shadow: 0px 0px 33px 7px rgba(0, 0, 0, 0.156);
  overflow:hidden;
  padding-bottom:10px;
  header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:10px 10px 10px 15px;
    span.heading{ 
      font-size:1rem;
      font-weight:900;
    }
  }
  section.title-holder{
    overflow-x:hidden;
    overflow-y:scroll;
    padding:0 10px;
    &::-webkit-scrollbar{width:15px;height:15px;}
    &::-webkit-scrollbar-thumb{background:var(--card-color-hover);border:4px solid transparent;border-radius:10px;background-clip:content-box;}
    div.search-input-holder{
      display:flex;
      align-items:center;
      gap:5px;
      background:var(--card-color-hover);
      padding:0 10px;
      border-radius:20px;
      overflow:hidden;
      margin:0 5px 10px;
      input.search-input{
        color:inherit;
        width:100%;
        padding:6px 5px;
        background:transparent;
      }
      button.clear-search{
        font-size:1rem;
        line-height:1;
        opacity:0.5;
      }
    }
    li.title{
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:1rem;
      padding:0.75rem;
      transition:0.2s ease background;
      position:relative;
      margin-bottom:0.5rem;
      border-radius:1rem;
      background-color:var(--card-color);
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
          aspect-ratio:1;
          width:2rem;
          border-radius:0.5rem;
          overflow:hidden;
          img{width:100%;height:100%;}
        }
        span.text{font-size:0.8rem;font-weight:700;}
        span.last-watched{
          font-family:monospace;
          display:block;
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
      padding:3px 5px;
      border-radius:0.5rem;
      transition:0.2s ease background;
      font-size:0.65rem;
      font-weight:700;
      margin-bottom:2px;
      color:var(--font-color-dark);
    }
  }
  span.no-items{
    padding:0 1rem;
    font-size:0.8rem;
  }
}
</style>