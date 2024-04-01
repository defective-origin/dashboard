import { useRef, useState, useCallback, useEffect } from 'react'

export type ResizeOptions<E extends Element> = {
  ref?: React.MutableRefObject<E | null>,
  onResize?: (options: ResizeReturnOptions<E>) => void;
}

export type ResizeReturnOptions<TElement extends Element> = {
  ref: React.MutableRefObject<TElement | null>,
  width: number,
  height: number,
  left: number,
  right: number,
  top: number,
  bottom: number,
}

export function useResize<E extends Element>(options: ResizeOptions<E> = {}): ResizeReturnOptions<E> {
  const { onResize, ref: elementRef } = options
  const ref = useRef<E | null>(elementRef?.current ?? null)
  const [result, setResult] = useState<ResizeReturnOptions<E>>({
    ref,
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  })

  const resize = useCallback(() => {
    if (ref.current) {
      const clientRect = ref.current.getBoundingClientRect()
      const opt = {
        ref,
        width: clientRect.width,
        height: clientRect.height,
        left: clientRect.left,
        right: clientRect.right,
        top: clientRect.top,
        bottom: clientRect.bottom,
      }

      onResize?.(opt)
      setResult(opt)
    }
  }, [onResize])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(resize)

    resizeObserver.observe(ref.current as Element)

    return () => resizeObserver.disconnect()
  }, [resize, ref])

  return result
}

export default useResize
