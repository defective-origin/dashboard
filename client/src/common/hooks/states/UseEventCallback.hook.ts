import { useCallback } from 'react'

// ---| common |---
import useStateful from './UseStateful.hook'

/**
 * Allows to create callback function only once Even if callback functions recreates all time
 *
 * @example
 * const eventCallback = useEventCallback(() => newValue)
 */
export function useEventCallback<T extends (...args: any[]) => any>(handler: T): T {
  const handlerRef = useStateful<T>(handler, [handler])
  const callback = useCallback<any>((...args: any[]) => handlerRef.current?.(...args), [])

  return callback
}

export default useEventCallback
