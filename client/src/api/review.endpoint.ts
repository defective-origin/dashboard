import { Id, IsoDate, RichText } from './api.type'
import api from './api.endpoint'

const ENDPOINT = 'comments'

export type Review = {
  id: Id
  author: Id
  value: RichText
  likes: number
  dislike: number
  date: IsoDate
}

export const REVIEWS: Review[] = Array.from({length: 10}, (_, id) => ({
  id,
  author: 1,
  value: 'Comment '.repeat(50),
  likes: id ** 3,
  dislike: id ** 2,
  date: new Date().toISOString(),
}))

api.reg(ENDPOINT, REVIEWS)


// TODO: sort reviews by value = likes - dislikes
export const useReviewMutations = (ids?: Id | Id[]) => {
  return api.useMutations<Review>(ENDPOINT, ids)
}

export const useReviews = (id?: Id) => {
  const response = api.useListEndpoint<Review>(ENDPOINT)
  const mutations = useReviewMutations()

  return Object.assign(response, mutations)
}

export const useReview = (id: Id) => {
  const response = api.useOptionsEndpoint<Review>(ENDPOINT, id)
  const mutations = useReviewMutations(id)

  return { ...response, ...mutations }
}
