import { Id, IsoDate, RichText } from './api.type'
import api from './api.endpoint'

const ENDPOINT = 'reviews'

export type Review = {
  id: Id
  user: Id
  description: RichText
  date: IsoDate
  rate: number
}

export const REVIEWS: Review[] = Array.from({length: 10}, (_, id) => ({
  id,
  user: 1,
  description: 'Comment '.repeat(50),
  date: new Date().toISOString(),
  rate: 4.5,
}))

api.reg(ENDPOINT, REVIEWS)


export const useReviewMutations = (ids?: Id | Id[]) => api.useMutations<Review>(ENDPOINT, ids)

export const useReviews = () => api.useListEndpoint<Review>(ENDPOINT)

export const useReview = (id: Id) => api.useOptionsEndpoint<Review>(ENDPOINT, id)
