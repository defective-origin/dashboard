import api from './api.endpoint'
import { Id } from './api.type'


const ENDPOINT = 'analytics'

export type AnalyticsCounterField = 'price' | 'rate' | 'usage'
export type AnalyticsCounterType = 'dashboard' | 'widget'
export type AnalyticsCounter = Record<AnalyticsCounterField, number>

export const COUNTERS: AnalyticsCounter[] = [
  { usage: 50000, rate: 4.5, price: 50000 },
]

api.reg(ENDPOINT, COUNTERS)

export const useAnalyticsCounter = (id?: Id, type?: AnalyticsCounterType) => {
  return api.useOptionsEndpoint<AnalyticsCounter>(ENDPOINT, id)
}
