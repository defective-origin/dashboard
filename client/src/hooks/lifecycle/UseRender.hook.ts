import { useEffect } from 'react'
import useMount, { MountReturnOptions } from './UseMount.hook'

export type RenderHandler = (isMountedRef: MountReturnOptions) => any

export type RenderHandlers = {
  up?: RenderHandler
  clear?: (isMountedRef: MountReturnOptions, value?: any) => any
}

export type RenderOptions = RenderHandler | RenderHandlers

/**
 * Trigger callback functions when component renders and clears
 *
 * @example
 * const isMountedRef = useRender({
 *  up: (isMountedRef) => console.log('rendered'),
 *  clear: () => console.log('cleared'),
 * })
 *
 * // pass values from mounted functions
 * const isMountedRef = useRender({
 *  up: (isMountedRef) => 'VALUE FROM UP FUNCTION',
 *  clear: (value) => console.log(value),
 * })
 */
export const useRender = (options: RenderOptions, deps?: unknown[]): MountReturnOptions => {
  const isMountedRef = useMount()

  useEffect(() => {
    const handlers: RenderHandlers = typeof options === 'function' ? { up: options } : options

    if (!isMountedRef.current) {
      return
    }

    const value = handlers.up?.(isMountedRef)

    return () => {
      handlers.clear?.(value)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return isMountedRef
}

export default useRender
