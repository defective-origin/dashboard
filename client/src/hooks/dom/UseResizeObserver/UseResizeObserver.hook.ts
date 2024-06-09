import { useEffect } from 'react'
import useElement, { ElementOptions, ElementRef } from '../UseElement'
import useFunc from '../../states/UseFunc'


export type ResizeObserverOptions<E extends Element> = globalThis.ResizeObserverOptions & {
  ref?: ElementOptions<E>
  disable?: boolean
}

export type ResizeObserverReturnOptions<E extends Element> = ElementRef<E>

/**
 * Allows to observe element changes.
 * By default observe body change.
 *
 * @example
 * const ref = useResizeObserver(() => console.log('RESIZED'), { direction: 'y', ref: elementRef, ...resizeObserverOptions })
 */
export const useResizeObserver = <E extends Element>(
  listener: ResizeObserverCallback,
  options?: ResizeObserverOptions<E>,
): ResizeObserverReturnOptions<E> => {
  const ref = useElement<E>(options?.ref, document.body)
  const func = useFunc(listener)

  useEffect(() => {
    if (ref.current && !options?.disable) {
      const observer = new ResizeObserver(func)

      // resize event don't call event on init
      func([], observer)

      observer.observe(ref.current, options)

      return () => observer.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.disable, ref])

  return ref
}

export default useResizeObserver
