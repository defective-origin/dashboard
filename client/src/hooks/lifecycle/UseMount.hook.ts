import { useEffect, useRef } from 'react'

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
export const useMount = (handler?: (isMountedRef: MountReturnOptions) => void): MountReturnOptions => {
  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true

    handler?.(isMountedRef)

    return () => {
      isMountedRef.current = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isMountedRef
}

export default useMount
