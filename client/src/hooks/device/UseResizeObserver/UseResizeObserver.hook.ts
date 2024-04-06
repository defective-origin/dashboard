import { useEffect, useRef } from 'react'
import { ElementOptions, ElementReturnOptions, useElement } from 'hooks'

export type ResizeObserverOptions<E extends Element> = globalThis.ResizeObserverOptions & {
  ref?: ElementOptions<E>
}

export type ResizeObserverReturnOptions<E extends Element> = ElementReturnOptions<E>

/**
 * Allows to observe element changes.
 * By default observe body change.
 *
 * @example
 * const state = useResizeObserver(() => console.log('RESIZED'), options)
 */
export const useResizeObserver = <E extends Element>(
  cb: ResizeObserverCallback,
  options?: ResizeObserverOptions<E>,
): ResizeObserverReturnOptions<E> => {
  const ref = useElement<E>(options?.ref, document.body)
  const cbRef = useRef(cb)

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver(cbRef.current)

      observer.observe(ref.current, options)

      return () => observer.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  return ref
}

export default useResizeObserver
