import { useRef } from 'react'
import useFunc from '../states/UseFunc'

/**
 * Hook descriptions
 *
 * @example
 * const state = useThrottle(options)
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const useThrottle = <F extends Function>(cb: F, limit = 300): F => {
  const lastRun = useRef(Date.now())

  return useFunc((...args: unknown[]) => {
    if (Date.now() - lastRun.current >= limit) {
      cb(...args) // Execute the callback
      lastRun.current = Date.now() // Update last execution time
    }
  }) as never
}

export default useThrottle
