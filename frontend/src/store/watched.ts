import { ref } from 'vue'
import { defineStore } from 'pinia'

type WatchedTitle = {
  id: string
  title: string
  type: 'Movie' | 'Tv' | 'movie' | 'tv'
  episode?: number
  season?: number
}

export const useWatchedStore = defineStore('watched', () => {
  const watched = ref<WatchedTitle[]>(JSON.parse(localStorage.getItem('watched') ?? '[]'))

  function toggle({ id, type, title }: WatchedTitle){
    const doesExist = exists({ type, id })

    if(doesExist) watched.value = watched.value.filter(title => title.id !== id)
    else watched.value.push({ id, type, title })
    localStorage.setItem('watched', JSON.stringify(watched.value))
  }
  function exists({ type, id }: Omit<WatchedTitle, 'title'>){ 
    return watched.value.some(item => item['type'].toLowerCase() === type?.toLowerCase() && item['id'].toString() === id?.toString())
  }

  return {
    watched,
    toggle,
    exists
  }
})