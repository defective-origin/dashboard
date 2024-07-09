import { Id, IsoDate, RichText } from './api.type'
import api from './api.endpoint'

const ENDPOINT = 'support'

export type SupportRequestType = 'BUG' | 'QUESTION' | 'OTHER'
export type SupportRequestStatus = 'OPENED' | 'PENDING' | 'IN PROGRESS' | 'RESOLVED'

export type SupportRequestChange = {
  user: Id,
  date: IsoDate
  status: SupportRequestStatus
  description: RichText
  attach: string[]
}

export type SupportRequest = {
  id: Id
  user: Id,
  type: SupportRequestType
  status: SupportRequestStatus
  created: IsoDate
  closed?: IsoDate
  changes: SupportRequestChange[]
}

export const SUPPORT_REQUESTS: SupportRequest[] = Array.from({length: 10}, (_, id) => ({
  id,
  user: id,
  type: id % 2 === 1 ? 'BUG' : 'QUESTION',
  status: id % 2 === 1 ? 'OPENED' : 'IN PROGRESS',
  created: new Date().toISOString(),
  closed: new Date().toISOString(),
  changes: [
    {
      user: id,
      date: new Date().toISOString(),
      status: 'OPENED',
      description: 'description '.repeat(25),
      attach: [],
    },
  ],
}))

api.reg(ENDPOINT, SUPPORT_REQUESTS)

export const useSupportRequests = () => api.useListEndpoint<SupportRequest>(ENDPOINT)

export const useSupportRequest = () => api.useOptionsEndpoint<SupportRequest>(ENDPOINT)
