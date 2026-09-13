import { useState } from 'react'
import useResizeObserver, { ResizeObserverOptions } from '../UseResizeObserver'
import { react } from 'tools'

const getOptions = (ref: react.ElementSelector): ResizeReturnOptions => {
  const elem = react.getElement<Element>(ref, document.body)
  const rect = elem?.getBoundingClientRect()

  return {
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

export type ResizeOptions = ResizeObserverOptions & {
  onResize?: (options: ResizeReturnOptions) => void
}

export type ResizeReturnOptions = Omit<DOMRect, 'toJSON'>

/**
 * Observe element resize and return element size, position options.
 * By default observe body change.
 * @example
 * const state = useResize({ direction: 'y', ref: elementRef, ...resizeObserverOptions })
 */
export function useResize(options?: ResizeOptions): ResizeReturnOptions {
  const [result, setResult] = useState(() => getOptions(options?.ref))

  useResizeObserver(() => {
    const opt = getOptions(options?.ref)

    options?.onResize?.(opt)
    setResult(opt)
  }, options)

  return result
}

export default useResize
