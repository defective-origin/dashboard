import { useMemo } from 'react'

// ---| common |---
import { useObject } from 'common/hooks'

export type MonitorState = Record<string, unknown>

export const DEFAULT_MONITOR_STATE: MonitorState = {}

export type MonitorActions = {
  log: (type: 'info' | 'warn' | 'error', options: Record<string, unknown>) => void
  event: (type: string, options: Record<string, unknown>) => void
}

export type MonitorSelectors = {
  flag: (type: string) => boolean
}

export type UseMonitorReturnOptions = MonitorState & MonitorActions & MonitorSelectors

/**
 * Hook descriptions
 *
 * @example
 * const options = useMonitor(conf)
 */
export const useMonitor = (): UseMonitorReturnOptions | null => {
  const state = useObject(DEFAULT_MONITOR_STATE)

  const actions = useMemo<MonitorActions>(() => ({
    log: (type, options) => { console.log('LOG:', type, options) },
    event: (type, options) => { console.log('EVENT:', type, options) },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  const selectors = useMemo<MonitorSelectors>(() => ({
    flag: (type) => !!new URLSearchParams(window.location.search).get(type),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo<UseMonitorReturnOptions>(() => ({ ...state.current, ...actions, ...selectors }), [state.current])
}

export default useMonitor
