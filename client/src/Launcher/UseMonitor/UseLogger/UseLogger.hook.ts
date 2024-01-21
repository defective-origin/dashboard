import { useCallback, useMemo } from 'react'

export type LoggerState = 'info' | 'warn' | 'error'

export type LoggerReturnOptions = {
  log: (type: LoggerState, options: Record<string, unknown>) => void
  event: (type: string, options: Record<string, unknown>) => void
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useLogger(conf)
 */
export const useLogger = (): LoggerReturnOptions => {
  const log = useCallback((type: LoggerState, options: Record<string, unknown>)=> console.log('LOG:', type, options), [])
  const event = useCallback((type: string, options: Record<string, unknown>) => console.log('EVENT:', type, options), [])

  return useMemo(() => ({ log, event }), [log, event])
}

export default useLogger
