import { useRef, useState, useCallback, useEffect, useMemo } from 'react'

export type RectOptions<TElement extends Element> = {
  ref: React.MutableRefObject<TElement | null>,
  width: number,
  height: number,
  left: number,
  right: number,
  top: number,
  bottom: number,
}

export function useResize<TElement extends Element>(
  elRef?: React.MutableRefObject<TElement | null>,
): RectOptions<TElement> {
  const ref = useRef<TElement | null>(elRef?.current ?? null)
  const [options, setOptions] = useState<RectOptions<TElement>>({
    ref,
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  })

  const onResize = useCallback(() => {
    if (ref.current) {
      const clientRect = ref.current.getBoundingClientRect()

      setOptions({
        ref,
        width: clientRect.width,
        height: clientRect.height,
        left: clientRect.left,
        right: clientRect.right,
        top: clientRect.top,
        bottom: clientRect.bottom,
      })
    }
  }, [ref])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(onResize)

    resizeObserver.observe(ref.current as Element)

    return () => resizeObserver.disconnect()
  }, [onResize, ref])

  return options
}

export default useResize
