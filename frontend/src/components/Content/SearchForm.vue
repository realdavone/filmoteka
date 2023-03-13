<template>
  <div class="search" >
    <form class="search-form" @submit.prevent="submitQuery" autocomplete="off">
      <div class="select user-select-none">
        <div class="selected-option" @click.prevent="handleOpenOptions">
          <span class="material-icons-outlined" style="font-size:1.25rem;">menu</span>      
        </div>
        <Transition name="fade">
          <div ref="optionsMenu" v-if="isOptionsMenuOpened" class="options">
            <div class="option"
            v-for="(option, key) in options"
            :key="option.value"
            :data-active="searchType.value === option.value"
            @click="handleSelectOption(option)">
              <div class="icon-holder">
                <span class="material-icons" style="font-size:1.25rem">{{ option.icon }}</span>
              </div>
              <span>{{ key }}</span>
            </div>
          </div>
        </Transition>
      </div>
      <input
      id="search-input"
      ref="input"
      v-model="searchQuery"
      type="text"
      placeholder="Vyhľadávanie"
      required
      @input="handleInput"
      @focus="isInputFocused = true"
      @focusout="isInputFocused = false">
    </form>
    <div v-show="isInputFocused" class="context">
      <div v-show="searchQuery.length" class="search-current" @mousedown.prevent="null" @click="submitQuery">
        <span class="material-icons" style="font-size:1.25rem">{{ searchType.icon }}</span> Vyhľadávať "{{ searchQuery }}"
      </div>
      <div @mousedown.prevent="null">
        <Loader v-if="loadingSearch" type="inline" style="display: block; margin:10px auto 0" />
        <AutoSearchResults
        v-else
        :movies="autoSearchResults.movies"
        :tvs="autoSearchResults.tvs"
        :people="autoSearchResults.people"
        :recent="store.state.recentSearch">
          <template v-slot="{ people, movies, tvs, recent }">
            <router-link v-for="movie in movies" :key="movie.id" :to="`/movie/${movie.id}`" @click="input!.blur()">
              <div class="search-result">
                <div class="poster-holder">
                  <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w92${movie.poster_path}`" :alt="movie.title" loading="lazy">
                </div>
                <span class="label">{{ movie.title }}</span>
              </div>
            </router-link>
            <router-link v-for="tv in tvs" :key="tv.id" :to="`/tv/${tv.id}`" @click="input!.blur()">
              <div class="search-result">
                <div class="poster-holder">
                  <img v-if="tv.poster_path" :src="`https://image.tmdb.org/t/p/w92${tv.poster_path}`" :alt="tv.name" loading="lazy">
                </div>
                <span class="label">{{ tv.name }}</span>
              </div>
            </router-link>
            <router-link v-for="person in people" :key="person.id" :to="`/person/${person.id}`" @click="input!.blur()">
              <div class="search-result">
                <div class="poster-holder">
                  <img v-if="person.profile_path" :src="`https://image.tmdb.org/t/p/w92${person.profile_path}`" :alt="person.name" loading="lazy">
                </div>    
                <span class="label">{{ person.name }}</span>
              </div>
            </router-link>
            <div class="search-result" v-for="item in recent" :key="item" role="button" @click="handleRecentItem(item)">
              <div class="poster-holder">
                <span class="material-icons-outlined" style="font-size: 1rem;">history</span>
              </div>
              <span class="label">{{ item }}</span>
            </div>
          </template>
        </AutoSearchResults>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref, onMounted, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import Loader from '../Loader.vue'
import AutoSearchResults from '../Content/AutoSearchResults.vue'
import debounce from '../../utils/debounce'
import makeRequest from '../../api/main'
import { TvTitle, MovieTitle } from '../../types/title'
import { PersonSearchType } from '../../types/person'
import { ApiListResponse } from '../../types/response'

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

const store = inject<any>('store')

const router = useRouter()
const searchQuery = ref('')
const input = ref<null | HTMLInputElement>(null)

const isInputFocused = ref(false)
const loadingSearch = ref(false)
const autoSearchResults = reactive<{
  movies: MovieTitle[] | null
  tvs: TvTitle[] | null
  people: PersonSearchType[] | null
}>({
  movies: null,
  tvs: null,
  people: null
})

const isOptionsMenuOpened = ref(false)
const optionsMenu = ref<null | HTMLDivElement>(null)

const searchType = ref(options['Všetko'])

function resetResults() {
  autoSearchResults.movies = null
  autoSearchResults.tvs = null
  autoSearchResults.people = null
}

function handleRecentItem(item: string){
  searchQuery.value = item
  submitQuery()
}

function submitQuery(){
  if(searchQuery.value !== ''){
    router.push(`/search${searchType.value.value}?q=${searchQuery.value}`)
    input.value!.blur()
  }
}

function handleOpenOptions() {
  isOptionsMenuOpened.value = !isOptionsMenuOpened.value
}

function handleSelectOption(option: Options){
  searchType.value = option
  isOptionsMenuOpened.value = false
}

const logInput = debounce(async string => {
  try {
    if(string === '') {
      loadingSearch.value = false
      resetResults()
      return
    }
    const data = await makeRequest<ApiListResponse<Array<MovieTitle | TvTitle | PersonSearchType>>>({ endpoint: `/search/multi?query=${searchQuery.value}&page=1` })

    autoSearchResults.movies = data.results.filter(movie => movie['media_type'] === 'movie' && movie['poster_path'] !== null).slice(0,2) as MovieTitle[]
    autoSearchResults.tvs = data.results.filter(tv => tv['media_type'] === 'tv' && tv['poster_path'] !== null).slice(0,2) as TvTitle[]
    autoSearchResults.people = data.results.filter(person => person['media_type'] === 'person' && person['profile_path'] !== null).slice(0,2) as PersonSearchType[]

  } catch (error) {
    console.log(error)
  } finally {
    loadingSearch.value = false
  }
})

function handleInput(e: Event){
  const input = e.target as HTMLInputElement
  loadingSearch.value = true
  logInput(input.value)
}

onClickOutside(optionsMenu, () => isOptionsMenuOpened.value = false)

onMounted(() => input.value!.focus())
</script>

<style lang="scss" scoped>
div.search-result{
  display: flex;
  align-items: center;
  padding:5px 10px;
  gap:10px;
  cursor: pointer;

  div.poster-holder{
    width: 30px;
    height: 30px;
    border-radius: 0.25rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img{
      width:100%;
      height: 100%;
      object-fit: cover;
    }
  }

  span.label{
    font-size: 0.8rem;
  }

  &:hover{
    background-color: var(--card-color-hover);
  }
}
div.context{
  position:absolute;
  left:0;
  top:calc(100%);
  width:100%;
  max-height: 80vh;
  background-color:var(--card-color);
  border-bottom-left-radius:1rem;
  border-bottom-right-radius:1rem;
  z-index: 1;
  overflow: auto;
  padding-bottom: 1rem;
  
  div.search-current{
    display:flex;
    align-items:center;
    gap:0.75rem;
    font-size:0.85rem;
    padding:0.75rem 1rem;
    transition:0.2s ease background-color;

    &:hover{
      background-color:var(--theme-color);
      color: white;
      cursor:pointer;
    }
  }
}
div.select{
  position:relative;
  isolation:isolate;
  div.options{
    position: absolute;
    background: var(--background-color);
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    border-radius: 4px;
    overflow: hidden;
    top: calc(100% + 5px);
    padding: 4px 0;
  }
  div.selected-option, div.option{
    height:36px;
    display:flex;
    align-items:center;
    padding:0 10px;
    cursor:pointer;
    gap:1rem;

    span{
      font-size:0.8rem;
    }
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
  div.option{
    padding-right:50px;
  }
  div.option:not([data-active=true]):hover{
    background:var(--card-color-hover);
  }
}
div.search{
  display:flex;
  flex-direction:column;
  position:relative;
  width:100%;
}
form.search-form{
  display:flex;
  border-radius:1rem;
  background:var(--card-color-hover);
  width:100%;
  transition:0.2s ease all;
  padding:5px;
  margin-left:auto;
  height:46px;
  position:relative;
  z-index: 2;

  input{
    padding:0 8px;
    background:transparent;
    width:100%; 
    font-size:0.95rem;
    color:inherit;
  }

  &:focus-within{
    border-bottom-left-radius:0;
    border-bottom-right-radius:0;
  } 
}
</style>