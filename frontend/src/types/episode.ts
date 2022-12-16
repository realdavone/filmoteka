export type EpisodeType = {
  air_date: string
  crew: [
    {
      job: string
      department: string
      credit_id: string
      adult: boolean
      gender: number
      id: number
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path: string
    }
  ]
  episode_number: number
  guest_stars: [
    {
      job: string
      credit_id: string
      adult: boolean
      gender: number
      id: number
      known_for_department: string
      name: string
      original_name: string
      popularity: number
      profile_path: string
    }
  ]
  name: string
  overview: string
  id: number
  production_code: number
  runtime: number
  season_number: number
  still_path: string
  vote_average: number
  vote_count: number
  translations: {
    translations: Array<EpisodeTranslation>
  }
}

export type EpisodeTranslation = {
  iso_3166_1: string
  iso_639_1: string
  name: string
  english_name: string
  data: {
      name: string
      overview: string
  }
}