import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRecentSearchStore = defineStore('recentSearch', () => {
  const recentSearch = ref<Array<string>>(JSON.parse(localStorage.getItem('recentSearch') ?? '[]'))

  function addSearchQuery(item: string){
    if(recentSearch.value.indexOf(item) !== -1)
      recentSearch.value.splice(recentSearch.value.indexOf(item), 1)
    
    recentSearch.value = [item, ...recentSearch.value]
    if(recentSearch.value.length > 6)
      recentSearch.value = recentSearch.value.splice(0,6)
    
    localStorage.setItem('recentSearch', JSON.stringify(recentSearch.value))
  }

  function removeSearchQuery(item: string){
    recentSearch.value = recentSearch.value.filter(recentItem => recentItem !== item)
    localStorage.setItem('recentSearch', JSON.stringify(recentSearch.value))
  }
  function clear(){
    recentSearch.value = []
    localStorage.removeItem('recentSearch')
  }

  return {
    recentSearch,
    addSearchQuery,
    removeSearchQuery,
    clear
  }
})