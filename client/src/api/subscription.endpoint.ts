import { Id } from './api.type'
import api from './api.endpoint'


const ENDPOINT = 'subscriptions'

export type SubscriptionRole = 'EDITOR' | 'VIEWER'

export type Subscription = {
  id: Id
  user: Id
  active: boolean
  role: SubscriptionRole
}

export const SUBSCRIPTIONS: Subscription[] = Array.from({length: 10}, (_, id) => ({
  id,
  user: id,
  active: id % 2 === 0,
  role: id % 2 === 0 ? 'VIEWER' : 'EDITOR',
}))

api.reg(ENDPOINT, SUBSCRIPTIONS)

export const useSubscription = (id: Id) => api.useOptionsEndpoint<Subscription>(ENDPOINT, id)
