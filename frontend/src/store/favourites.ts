import { ref } from 'vue'
import { defineStore } from 'pinia'

type FavouriteTitle = {
  id: string
  img: string
  title: string
  type: 'Movie' | 'Tv' 
  episode?: number
  season?: number
}

export const useFavouritesStore = defineStore('favourites', () => {
  const favourites = ref<FavouriteTitle[]>(JSON.parse(localStorage.getItem('favourites') ?? '[]'))

  function toggle({ id, img, type, title }: {
    id: string
    img: string
    type: 'Movie' | 'Tv'
    title: string
  }) {
    const doesExist = exists({ type, id })

    if(doesExist) favourites.value = favourites.value.filter(title => title.id !== id)
    else favourites.value = [...favourites.value, { id, type, title, img }]

    localStorage.setItem('favourites', JSON.stringify(favourites.value))
  }
  function update(id: string, season: number, episode: number) {
    favourites.value = favourites.value.map(title => {
      if(title.id === id && title.type === 'Tv') return { ...title, episode, season }
      return title
    })
    localStorage.setItem('favourites', JSON.stringify(favourites.value))
  }
  function removeAll() {
    favourites.value = []
    localStorage.setItem('favourites', JSON.stringify(favourites.value))
  }
  function exists(title: Pick<FavouriteTitle, 'type' | 'id'>) {
    return favourites.value.some(item => item['type'] === title.type && item['id'] === title.id)
  }

  return {
    favourites,
    toggle,
    update,
    removeAll,
    exists
  }
})