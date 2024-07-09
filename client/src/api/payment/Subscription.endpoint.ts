import { ChangeStamps } from '../api.type'
import api from '../api.endpoint'

const PATHNAME = 'payment/subscription'

export type Subscription = ChangeStamps & {
  id: string
  value: number
  expiredAt: string
}

export const useSubscriptions = () => api.useRestReadEndpoint<Subscription[]>(PATHNAME)
