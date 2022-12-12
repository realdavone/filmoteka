interface BaseTitle {
  poster_path: string | null
  adult: boolean
  overview: string
  genre_ids: number[]
  id: number
  original_language: string
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface TvTitle extends BaseTitle {
  media_type: 'tv'
  name: string
  original_name: string
  first_air_date: string
}

export interface MovieTitle extends BaseTitle {
  media_type: 'movie'
  title: string
  original_title: string
  release_date: string
}

export type TitleFromDB = {
  dislikes: string[]
  id: string
  img: string
  isPlayerWorking: boolean
  likes: string[]
  type: 'movie' | 'tv'
  __v: string
  _id: string
}

export type Title = TvTitle | MovieTitle