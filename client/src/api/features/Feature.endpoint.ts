import { ChangeStamps } from 'api/api.types'

export type FeatureReview = ChangeStamps & {
  rate: number
  content: string
}

export type Feature = ChangeStamps & {
  id: string
  name: string
  price: number
  rate: number
  content: string
  public: boolean
  tags: string[]
  options: object
  reviews: FeatureReview[]
  snapshot: string
}


// export const useFeatureReviews = (pathname: string, id?: Id) => api.useRestReadEndpoint<FeatureReview>(`${pathname}/${id}/reviews`)
