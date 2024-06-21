import { Id, IsoDate, RichText } from './api.type'
import api from './api.endpoint'

const ENDPOINT = 'donation'

export type DonationType = 'PLANS' | 'NEEDS' | 'OTHER'

export type Donation = {
  id: Id
  user: Id
  date: IsoDate
  value: number
  type: DonationType
  description?: RichText
}

export const DONATIONS: Donation[] = Array.from({length: 10}, (_, id) => ({
  id,
  user: 1,
  value: id ** id,
  type: id % 2 === 1 ? 'PLANS' : 'NEEDS',
  date: new Date().toISOString(),
  description: 'description '.repeat(25),
}))

api.reg(ENDPOINT, DONATIONS)

export const useDonations = () => api.useListEndpoint<Donation>(ENDPOINT)
