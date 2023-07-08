import { useRef, useState, useCallback, useEffect, useMemo } from 'react'

export type RectOptions = {
  width: number,
  height: number,
  left: number,
  right: number,
  top: number,
  bottom: number,
}

export function useResize<TElement extends Element = HTMLDivElement>(
  ref: React.MutableRefObject<TElement | null>,
): RectOptions {
  const [options, setOptions] = useState<RectOptions>({
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
      const newOptions: RectOptions = {
        width: clientRect.width,
        height: clientRect.height,
        left: clientRect.left,
        right: clientRect.right,
        top: clientRect.top,
        bottom: clientRect.bottom,
      }

      setOptions(newOptions)
    }
  }, [ref])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(onResize)

    resizeObserver.observe(ref.current as Element)

    return () => resizeObserver.disconnect()
  }, [onResize, ref])

  return options
}

export function useResizeWithRef<TElement extends Element = HTMLDivElement>()
: RectOptions & { ref: React.MutableRefObject<TElement | null> } {
  const ref = useRef(null)
  const options = useResize<TElement>(ref)

  return useMemo(() => ({ ref, ...options }), [ref, options])
}

export default useResizeWithRef
