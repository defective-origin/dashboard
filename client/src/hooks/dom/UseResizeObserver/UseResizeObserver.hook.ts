import { useLayoutEffect } from 'react'
import useFunc from '../../states/UseFunc'
import { react } from 'tools'


export type ResizeObserverOptions = globalThis.ResizeObserverOptions & {
  ref?: react.ElementSelector
  disable?: boolean
  deps?: unknown[]
}

/**
 * Allows to observe element changes.
 * By default observe body change.
 * @example
 * const ref = useResizeObserver(() => console.log('RESIZED'), { direction: 'y', ref: elementRef, ...resizeObserverOptions })
 */
export function useResizeObserver(
  listener: ResizeObserverCallback,
  options?: ResizeObserverOptions,
) {
  const func = useFunc(listener)

  useLayoutEffect(() => {
    const elem = react.getElement(options?.ref, document.body)
    if (elem && !options?.disable) {
      const observer = new ResizeObserver(func)

      // resize event don't call event on init
      func([], observer)

      observer.observe(elem, options)

      return () => observer.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [func, options?.disable, ...options?.deps ?? []])
}

export default useResizeObserver
