export interface Comment {
  author: {
    _id: string
    email: string
  }
  content: string
  createdAt:string
  id: number
  type: 'movie' | 'tv'
  __v: number
  _id: string
}