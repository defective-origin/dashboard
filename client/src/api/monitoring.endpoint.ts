import { useCallback, useMemo } from 'react'

export type LogVariant = 'info' | 'warn' | 'error'
export type EventVariant = 'click' | 'redirect'

export type MonitoringReturnOptions = {
  log: (type: LogVariant, options: Record<string, unknown>) => void
  event: (type: EventVariant, options: Record<string, unknown>) => void
}

export const useMonitoring = () => {
  const log = useCallback((type: LogVariant, options: Record<string, unknown>) => console.log('LOG:', type, options), [])
  const event = useCallback((type: EventVariant, options: Record<string, unknown>) => console.log('EVENT:', type, options), [])

  return useMemo(() => ({ log, event }), [log, event])
}

export default useMonitoring
