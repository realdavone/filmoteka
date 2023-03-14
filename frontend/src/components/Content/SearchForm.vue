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
      v-focus="(isFocused: boolean) => isInputFocused = isFocused"
      id="search-input"
      ref="input"
      type="text"
      placeholder="Vyhľadávanie"
      required
      autocomplete="off"
      autocapitalize="off"
      autocorrect="off"
      @input="handleInput" />
    </form>
    <div v-show="isInputFocused" class="context" @mousedown.prevent="null">
      <div v-show="searchQuery.length" class="search-current" @click="submitQuery">
        <span class="material-icons" style="font-size:1.25rem">{{ searchType.icon }}</span>
        Vyhľadávať<span class="quotation-marks">{{ searchQuery }}</span>
      </div>
      <div>
        <Loader v-if="loadingSearch" type="inline" style="display: block; margin:10px auto 0" />
        <AutoSearchResults
        v-else
        :movies="autoSearchResults.movies"
        :tvs="autoSearchResults.tvs"
        :people="autoSearchResults.people"
        :recent="store.state.recentSearch">
          <template v-slot="{ people, movies, tvs, recent }">
            <span v-if="movies?.length" class="label">Filmy</span>
            <router-link v-for="movie in movies" :key="movie.id" :to="`/movie/${movie.id}`" @click="input!.blur()">
              <AutoSearchResult :label="movie.title" :img="movie.poster_path" />
            </router-link>
            <span v-if="tvs?.length" class="label">TV</span>
            <router-link v-for="tv in tvs" :key="tv.id" :to="`/tv/${tv.id}`" @click="input!.blur()">
              <AutoSearchResult :label="tv.name" :img="tv.poster_path" />
            </router-link>
            <span v-if="people?.length" class="label">Osoby</span>
            <router-link v-for="person in people" :key="person.id" :to="`/person/${person.id}`" @click="input!.blur()">
              <AutoSearchResult :label="person.name" :img="person.profile_path" />
            </router-link>
            <AutoSearchResult v-for="item in recent" :key="item" role="button" @click="handleRecentItem(item)" :label="item" />
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
import AutoSearchResult from '../Content/AutoSearchResult.vue'
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

const getAutoResults = debounce(async string => {
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
  const event = e as Event & {
    isComposing: boolean
    data: string
  }
  const data = event.isComposing ? event.data : input.value
  loadingSearch.value = true
  getAutoResults(data)
  searchQuery.value = data
}

onClickOutside(optionsMenu, () => isOptionsMenuOpened.value = false)

onMounted(() => input.value!.focus())
</script>

<style lang="scss" scoped>
span.label{
  padding:0 10px;
  color: gray;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
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
    padding:0.5rem 0.75rem;
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