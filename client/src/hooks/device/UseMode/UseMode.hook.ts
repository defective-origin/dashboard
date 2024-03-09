import { useEffect, useMemo, useRef } from 'react'

export type ModeOption = undefined | string
export type ModeOptions = (ModeOption | ModeOption[])[]

export type ModeReturnOptions = void

/**
 * Add class names to body tag.
 *
 * @example
 * const theme = useTheme()
 * const media = useBreakpoint(MEDIA_BREAKPOINTS)
 *
 * useMode(theme, media)
 */
export const useMode = (...args: ModeOptions): ModeReturnOptions => {
  const prevRef = useRef<string[]>([])
  const value = useMemo(() => args.flat().filter(Boolean) as string[], args)

  useEffect(() => {
    const prevValue = prevRef.current
    prevRef.current = value

    document.body.classList.remove(...prevValue)
    document.body.classList.add(...value)

    return () => document.body.classList.remove(...prevValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args.toString()])
}

export default useMode
