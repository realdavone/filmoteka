<template>
  <div class="search" >
    <form class="search-form" @submit.prevent="submitQuery" autocomplete="off">
      <div class="select user-select-none">
        <div class="selected-option" @click.prevent="isOptionsMenuOpened = !isOptionsMenuOpened">
          <span class="material-icons" style="font-size:1.5rem;">menu</span>      
        </div>
        <Transition name="fade">
          <div ref="optionsMenu" v-if="isOptionsMenuOpened" class="options">
            <div class="option" v-for="(option, key) in options" :key="option.value" :data-active="searchType.value === option.value" @click="searchType = option; isOptionsMenuOpened = false;">
              <div class="icon-holder">
                <span class="material-icons" style="font-size:1.25rem">{{option.icon}}</span>
              </div>
              <span>{{key}}</span>
            </div>
          </div>
        </Transition>
      </div>
      <input id="search-input" ref="input" v-model="searchQuery"  type="text" placeholder="Vyhľadávanie" required @focus="isInputFocused = true" @focusout="isInputFocused = false">
    </form>
    <div v-show="isInputFocused" class="context">
      <div v-show="searchQuery.length" class="search-current" @mousedown.prevent="null" @click="submitQuery">
        <span class="material-icons" style="font-size:1.25rem">{{ searchType.icon }}</span>
        Vyhľadávať "{{ searchQuery }}"
      </div>
      <RecentSearch @handleRecentItem="handleRecentItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import RecentSearch from './RecentSearch.vue'

interface Options {
  value: string
  icon: string
}

const options: Record<'Všetko' | 'Filmy' | 'Seriály' | 'Osoby', Options> = {
  Všetko: {
    value: '',
    icon: 'search'
  },
  Filmy: {
    value: '/movie',
    icon: 'movie'
  },
  Seriály: {
    value: '/tv',
    icon: 'tv'
  },
  Osoby: {
    value: '/person',
    icon: 'person'
  }
}

const router = useRouter()
const searchQuery = ref('')
const input = ref<null | HTMLInputElement>(null)
const isInputFocused = ref(false)

const isOptionsMenuOpened = ref(false)
const optionsMenu = ref<null | HTMLDivElement>(null)

const searchType = ref(options['Všetko'])

const handleRecentItem = (item: string) => {
  searchQuery.value = item
  submitQuery()
}

onClickOutside(optionsMenu, () => isOptionsMenuOpened.value = false)

const submitQuery = () => {
  if(searchQuery.value !== ''){
    router.push(`/search${searchType.value.value}?q=${searchQuery.value}`)
    input.value!.blur()
  }
}

onMounted(() => input.value!.focus())
</script>

<style lang="scss" scoped>
div.context{
  position:absolute;
  left:0;
  top:calc(100% + 1px);
  width:100%;
  background-color:var(--card-color);
  border-bottom-left-radius:1.75rem;
  border-bottom-right-radius:1.75rem;
  div.search-current{
    display:flex;
    align-items:center;
    gap:0.75rem;
    font-size:0.85rem;
    padding:0.75rem 1rem;
    transition:0.2s ease background-color;
    &:hover{
      background-color:var(--card-color-hover);
      cursor:pointer;
    }
  }
}
div.select{
  position:relative;
  isolation:isolate;
  div.options{
    position:absolute;
    background:var(--card-color);
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    border-radius:8px;
    overflow:hidden;
    top:calc(100% + 5px);
  }
  div.selected-option, div.option{
    height:36px;
    display:flex;
    align-items:center;
    padding:0 10px;
    cursor:pointer;
    gap:1rem;
    span{font-size:0.8rem;}
    div.icon-holder{
      width:20px;
      text-align:center;
      padding-top:5px;
    }
    &[data-active=true]{
      background:var(--theme-color);
      color:white;
    }
  }
  div.option{padding-right:50px;}
  div.option:not([data-active=true]):hover{background:var(--card-color-hover);}
}
div.search{
  display:flex;
  flex-direction:column;
  position:relative;
  width:100%;
}
form.search-form{
  display:flex;
  border-radius:1.75rem;
  background:var(--card-color-hover);
  width:100%;
  transition:0.2s ease all;
  padding:5px;
  margin-left:auto;
  height:46px;
  position:relative;
  input{
    padding:0 8px;
    background:transparent;
    width:100%; 
    font-size:0.95rem;
    color:inherit;
  }
  &:focus-within{
    outline:1px solid var(--theme-color);
    border-bottom-left-radius:0;
    border-bottom-right-radius:0;
  } 
}
</style>