import api from './api.endpoint'
import { Id } from './api.type'


const ENDPOINT = 'counters'

export type CounterType = 'FAVORITE' | 'USAGE'
export type CounterVariant = 'dashboard' | 'widget'
export type Counter = {
  id: Id
  type: CounterType
  value: number
}

export const COUNTERS: Counter[] = [
  { id: 1, type: 'USAGE', value: 50000 },
  { id: 1, type: 'FAVORITE', value: 1000 },
]

api.reg(ENDPOINT, COUNTERS)

export const useCounters = (id?: Id, variant?: CounterVariant) => {
  return api.useListEndpoint<Counter>(ENDPOINT)
}

export const useCounter = (id?: Id, variant?: CounterVariant) => {
  return api.useOptionsEndpoint<Counter>(ENDPOINT, id)
}
