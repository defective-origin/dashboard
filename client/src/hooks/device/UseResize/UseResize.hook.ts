import { useState } from 'react'
import useResizeObserver from '../UseResizeObserver'
import { useElement } from 'hooks'

const getOptions = <E extends Element>(ref: React.MutableRefObject<E | null>) => {
  const clientRect = ref.current?.getBoundingClientRect()

  return {
    ref,
    width: clientRect?.width ?? 0,
    height: clientRect?.height ?? 0,
    left: clientRect?.left ?? 0,
    right: clientRect?.right ?? 0,
    top: clientRect?.top ?? 0,
    bottom: clientRect?.bottom ?? 0,
  }
}

export type ResizeOptions<E extends Element> = {
  ref?: React.MutableRefObject<E | null>,
  onResize?: (options: ResizeReturnOptions<E>) => void;
}

export type ResizeReturnOptions<E extends Element> = {
  ref: React.MutableRefObject<E | null>,
  width: number,
  height: number,
  left: number,
  right: number,
  top: number,
  bottom: number,
}

/**
 * Observe element resize and return element size, position options.
 * By default observe body change.
 *
 * @example
 * const state = useResize(options)
 */
export const useResize = <E extends Element>(options?: ResizeOptions<E>): ResizeReturnOptions<E> => {
  const ref = useElement<E>(options?.ref)
  const [result, setResult] = useState(() => getOptions<E>(ref))

  useResizeObserver(() => {
    const opt = getOptions<E>(ref)

    options?.onResize?.(opt)
    setResult(opt)
  }, { ref })

  return result
}

export default useResize
