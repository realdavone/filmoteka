<template>
  <form class="search-form" @submit.prevent="submitQuery" autocomplete="off">
    <div class="select user-select-none">
      <div class="selected-option" @click="isOptionsMenuOpened =! isOptionsMenuOpened" :data-opened="isOptionsMenuOpened">
        <span class="material-symbols-outlined" style="font-size:1.25rem">{{searchType['icon']}}</span>        
      </div>
      <Transition name="fade">
        <div ref="optionsMenu" v-if="isOptionsMenuOpened" class="options">
          <div class="option" v-for="option in options" :key="option.value" :data-active="searchType.value===option.value" @click="searchType=option;isOptionsMenuOpened=false;">
            <div class="icon-holder">
              <span class="material-symbols-outlined" style="font-size:1.25rem">{{option.icon}}</span>
            </div>
            <span>{{option.label}}</span>
          </div>
        </div>
      </Transition>
    </div>
    <input id="search-input" ref="input" v-model="searchQuery"  type="text" placeholder="Vyhľadávanie" required>
  </form>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const input = ref(null)

const isOptionsMenuOpened = ref(false)
const optionsMenu = ref(null)
const options = [
  { label:'Všetko', value:'', icon:'search' },
  { label:'Filmy', value:'/movie', icon: 'movie' },
  { label:'Seriály', value:'/tv', icon: 'tv' },
  { label:'Osoby', value:'/person', icon: 'person'}
]

const searchType = ref(options[0])

onClickOutside(optionsMenu, () => isOptionsMenuOpened.value = false)

const submitQuery = () => {
  if(searchQuery.value!==''){
    router.push({ path: `/search${searchType.value.value}`, query: { q: searchQuery.value } })
    input.value.blur()
  }
}

onMounted(() => { input.value.focus() })
</script>

<style lang="scss" scoped>
div.select{
  position:relative;
  isolation:isolate;
  div.options{
    position:absolute;
    background:var(--card-color);
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    border-radius:8px;
    overflow:hidden;
  }
  div.selected-option, div.option{
    height:36px;
    display:flex;
    align-items:center;
    padding:0 10px;
    cursor:pointer;
    gap:10px;
    span{font-size:0.8rem;}
    div.icon-holder{
      width:20px;
      text-align:center;
    }
    &[data-active=true]{
      background:var(--theme-color);
      color:white;
    }
  }
  div.option{padding-right:50px;}
  div.selected-option{
    &::after{
      transition:0.2s ease transform;
      content:'\f0d7';
      font-family: "Font Awesome 5 Free";
      font-weight: 900; 
      font-size:0.8rem;
    }
    &[data-opened=false]::after{transform:rotate(0deg);}
    &[data-opened=true]::after{transform:rotate(180deg);}
  }
  div.option:not([data-active=true]):hover{background:var(--card-color-hover);}
}
form{
  display:flex;
  border-radius:25px;
  background:var(--card-color);
  width:100%;
  transition:0.2s ease all;
  padding:5px;
  input{
    padding:0 8px;
    background:transparent;
    width:100%; 
    font-size:0.95rem;
    color:inherit;
    border-radius:25px;
  }
  button.search-button{
    padding-top:3px;
    min-width:36px;
    min-height:36px;
    span{
      font-size:1.25rem;
      font-weight:900;
      transition:0.2s ease color;
    }
  }
  &:focus-within{
    outline:1px solid var(--theme-color);
    button.search-button span{color:var(--theme-color);}
  } 
}
</style>