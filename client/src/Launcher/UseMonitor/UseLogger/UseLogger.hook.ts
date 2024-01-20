import { useCallback, useMemo } from 'react'

export type UseLoggerState = 'info' | 'warn' | 'error'

export type UseLoggerReturnOptions = {
  log: (type: UseLoggerState, options: Record<string, unknown>) => void
  event: (type: string, options: Record<string, unknown>) => void
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useLogger(conf)
 */
export const useLogger = (): UseLoggerReturnOptions => {
  const log = useCallback((type: UseLoggerState, options: Record<string, unknown>)=> console.log('LOG:', type, options), [])
  const event = useCallback((type: string, options: Record<string, unknown>) => console.log('EVENT:', type, options), [])

  return useMemo(() => ({ log, event }), [log, event])
}

export default useLogger
