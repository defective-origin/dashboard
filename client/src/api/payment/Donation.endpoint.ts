import { ChangeStamps, Ref } from '../api.type'
import api from '../api.endpoint'

const PATHNAME = 'payment/donation'

export type Donation = ChangeStamps & {
  id: string
  content: string
  meta: string
  value: number
  reason: Ref
}

export const useDonations = () => api.useRestReadEndpoint<Donation[]>(PATHNAME)
