import { useCallback, useMemo } from 'react'
import api from './api.endpoint'
import { ShortText } from './api.type'

export type EventType = 'click' | 'redirect'
export type AppEvent = {
  type: EventType
  description: ShortText
  // date: IsoDate
}

export type LogType = 'info' | 'warn' | 'error'
export type AppLog = {
  type: LogType
  description: ShortText
  // date: IsoDate
}

export type FeatureType = 'A' | 'B' | 'C'
export type AppFeature = {
  type: FeatureType
  description?: ShortText
  active: boolean
}


api.reg('features', [{ type: 'A', active: true }])
api.reg('logs', [])
api.reg('events', [])

export type MonitoringReturnOptions = {
  log: (type: LogType, description: ShortText) => void
  event: (type: EventType, description: ShortText) => void
  feature: (type: FeatureType) => boolean
}

export const useMonitoring = () => {
  const features = api.useListEndpoint<AppFeature>('features')
  const logMutation = api.useCreateEndpoint<AppLog>('logs')
  const eventMutation = api.useCreateEndpoint<AppEvent>('events')

  const log = useCallback((type: LogType, description: ShortText) => logMutation({ type, description }), [logMutation])
  const event = useCallback((type: EventType, description: ShortText) => eventMutation({ type, description }), [eventMutation])
  const feature = useCallback((type: FeatureType) =>
    features.some((feature) => feature.type === type) || !!new URLSearchParams(window.location.search).get(type)
  , [features])

  return useMemo(() => ({ log, event, feature }), [log, event, feature])
}

export default useMonitoring
