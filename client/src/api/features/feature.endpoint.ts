import { ChangeStamps } from 'api/api.type'

export type FeatureReview = ChangeStamps & {
  rate: number
  content?: string
}

export type FeatureAccess = 'PRIVATE' | 'PUBLIC'
export type Feature = ChangeStamps & {
  id: string
  name: string
  price: number
  rate: number
  content?: string
  access: FeatureAccess
  tags: string[]
  options: object
  reviews: FeatureReview[]
}


// export const useFeatureReviews = (pathname: string, id?: Id) => api.useRestReadEndpoint<FeatureReview>(`${pathname}/${id}/reviews`)
