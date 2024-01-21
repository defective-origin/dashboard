import { useLayoutEffect, useRef } from 'react'

export type MountReturnOptions = React.MutableRefObject<boolean>

/**
 * Trigger callback functions when component mounts
 *
 * @example
 * const isMountedRef = useMount(() => console.log('mounted'))
 *
 * // get mount status
 * const isMountedRef = useMount()
 */
export const useMount = (handler?: () => void): MountReturnOptions => {
  const isMountedRef = useRef(false)

  useLayoutEffect(() => {
    isMountedRef.current = true

    handler?.()

    return () => {
      isMountedRef.current = false
    }
  }, [])

  return isMountedRef
}

export default useMount
