import { useEffect } from 'react'
import useElement, { ElementOptions, ElementRef } from '../UseElement'
import useFunc from '../../states/UseFunc'


export type ResizeObserverOptions<E extends Element> = globalThis.ResizeObserverOptions & {
  ref?: ElementOptions<E>
}

export type ResizeObserverReturnOptions<E extends Element> = ElementRef<E>

/**
 * Allows to observe element changes.
 * By default observe body change.
 *
 * @example
 * const ref = useResizeObserver(() => console.log('RESIZED'), options)
 */
export const useResizeObserver = <E extends Element>(
  listener: ResizeObserverCallback,
  options?: ResizeObserverOptions<E>,
): ResizeObserverReturnOptions<E> => {
  const ref = useElement<E>(options?.ref, document.body)
  const func = useFunc(listener)

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver(func)

      observer.observe(ref.current, options)

      return () => observer.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  return ref
}

export default useResizeObserver
