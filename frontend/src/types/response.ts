export interface ApiListResponse<T> {
  page: number
  results: T
  total_pages: number
  total_results: number
}

export type WorkingPlayerResponse = { success: boolean, isPlayerWorking: boolean }

export type RecommendedResponse = { success: true, isRecommended: boolean } | { success: false, message: string }