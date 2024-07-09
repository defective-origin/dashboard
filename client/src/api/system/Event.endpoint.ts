import { useCallback } from 'react'
import { TimeStamps } from '../api.type'
import api from '../api.endpoint'

const PATHNAME = 'system/events'

export type EventName = string
export type Event = TimeStamps & {
  id: string
  name: EventName
}

export type EventReturnOptions = (name: EventName) => Promise<void>

export const useEvent = (): EventReturnOptions => {
  const create = api.useRestCreateEndpoint<Event>(PATHNAME)

  return useCallback((name: EventName) => create.mutateAsync({ name }), [create])
}
