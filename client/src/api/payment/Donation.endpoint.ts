import { ChangeStamps } from '../api.type'
import api from '../api.endpoint'

const PATHNAME = 'payment/donation'

export type Donation = ChangeStamps & {
  id: string
  content: string
  value: number
}

export const useDonations = () => api.useRestReadEndpoint<Donation[]>(PATHNAME)
