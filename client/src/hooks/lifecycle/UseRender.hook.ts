import { useEffect } from 'react'
import useMount, { MountReturnOptions } from './UseMount.hook'

export type RerenderHandler<T> = (isMountedRef: MountReturnOptions) => T
export type ClearHandler<T> = (isMountedRef: MountReturnOptions, value: T) => void

/**
 * Trigger callback functions when component renders and clears
 *
 * @example
 * const isMountedRef = useRender((isMountedRef) => console.log('rendered'), deps)
 *
 * const isMountedRef = useRender(
 *  (isMountedRef) => console.log('rendered'),
 *  () => console.log('cleared'),
 *  deps,
 * )
 *
 * // pass values from mounted functions
 * const isMountedRef = useRender(
 *  (isMountedRef) => 'VALUE FROM RERENDER FUNCTION',
 *  (isMountedRef, value) => console.log(value),
 * )
 */
export function useRender<T>(rerender: RerenderHandler<T>, deps?: unknown[]): MountReturnOptions;
export function useRender<T>(rerender: RerenderHandler<T>, clear: ClearHandler<T>, deps?: unknown[]): MountReturnOptions;
export function useRender(rerender: RerenderHandler<unknown>, clear_or_deps?: unknown, deps?: unknown[]) {
  const dependencies = Array.isArray(clear_or_deps) ? clear_or_deps : deps
  const isMountedRef = useMount()

  useEffect(() => {
    const clear = typeof clear_or_deps === 'function' ? clear_or_deps : undefined

    if (!isMountedRef.current) {
      return
    }

    const value = rerender(isMountedRef)

    if (clear) {
      return () => clear(isMountedRef, value)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return isMountedRef
}

export default useRender
