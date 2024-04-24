import { useState } from 'react'
import useResizeObserver, { ResizeObserverOptions } from '../UseResizeObserver'
import useElement, { ElementRef } from '../UseElement'

const getOptions = <E extends Element>(ref: React.MutableRefObject<E | null>): ResizeReturnOptions<E> => {
  const rect = ref.current?.getBoundingClientRect()

  return {
    ref,
    bottom: rect?.bottom ?? 0,
    height: rect?.height ?? 0,
    left: rect?.left ?? 0,
    right: rect?.right ?? 0,
    top: rect?.top ?? 0,
    width: rect?.width ?? 0,
    x: rect?.x ?? 0,
    y: rect?.y ?? 0,
  }
}

export type ResizeOptions<E extends Element> = ResizeObserverOptions<E> & {
  onResize?: (options: ResizeReturnOptions<E>) => void;
}

export type ResizeReturnOptions<E extends Element> = Omit<DOMRect, 'toJSON'> & {
  ref: ElementRef<E>,
}

/**
 * Observe element resize and return element size, position options.
 * By default observe body change.
 *
 * @example
 * const state = useResize({ direction: 'y', ref: elementRef, ...resizeObserverOptions })
 */
export const useResize = <E extends Element>(options?: ResizeOptions<E>): ResizeReturnOptions<E> => {
  const ref = useElement<E>(options?.ref, document.body)
  const [result, setResult] = useState(() => getOptions<E>(ref))

  useResizeObserver(() => {
    const opt = getOptions<E>(ref)

    options?.onResize?.(opt)
    setResult(opt)
  }, options)

  return result
}

export default useResize
