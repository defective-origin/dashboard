import { Id, IsoDate, RichText } from './api.type'
import api from './api.endpoint'

const ENDPOINT = 'support'

export type SupportType = 'BUG' | 'QUESTION' | 'OTHER'
export type SupportStatus = 'OPENED' | 'PENDING' | 'IN PROGRESS' | 'RESOLVED'

export type Support = {
  id: Id
  user: Id,
  date: IsoDate
  type: SupportType
  status: SupportStatus
  description: RichText
}

export const SUPPORTS: Support[] = Array.from({length: 10}, (_, id) => ({
  id,
  user: 1,
  type: id % 2 === 1 ? 'BUG' : 'QUESTION',
  status: id % 2 === 1 ? 'OPENED' : 'IN PROGRESS',
  date: new Date().toISOString(),
  description: 'description '.repeat(25),
}))

api.reg(ENDPOINT, SUPPORTS)

export const useSupports = () => api.useListEndpoint<Support>(ENDPOINT)
