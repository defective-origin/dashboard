import { useMemo } from 'react'

// ---| core |---
import { useFunc } from 'hooks'

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
  const log = useFunc((type: LoggerState, options: Record<string, unknown>)=> console.log('LOG:', type, options))
  const event = useFunc((type: string, options: Record<string, unknown>) => console.log('EVENT:', type, options))

  return useMemo(() => ({ log, event }), [log, event])
}

export default useLogger
