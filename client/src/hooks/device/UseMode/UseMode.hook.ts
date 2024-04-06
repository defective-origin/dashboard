import { useEffect, useRef } from 'react'
import { ElementOptions, ElementReturnOptions, useElement } from 'hooks'

const isModes = (args: unknown[]) => args.every((arg) => Array.isArray(arg) || typeof arg === 'string')

export type ModeOption = undefined | string
export type ModeOptions = (ModeOption | ModeOption[])[]

export type ModeReturnOptions<E extends Element> = ElementReturnOptions<E>

/**
 * Add class names to body tag.
 *
 * @example
 * const theme = useTheme()
 * const media = useBreakpoint(MEDIA_BREAKPOINTS)
 *
 * useMode(theme, media, 'a', 'b')
 * useMode(ref, theme, media, 'a', 'b')
 */
export function useMode<E extends Element>(...args: ModeOptions): ModeReturnOptions<E>;
export function useMode<E extends Element>(ref: ElementOptions<E>, ...args: ModeOptions): ModeReturnOptions<E>;
export function useMode(...args: unknown[]) {
  const isOnlyModes = isModes(args)
  const modes = isOnlyModes ? args : args.slice(1)
  const ref = useElement(isOnlyModes ? document.body : args[0] as Element, document.body)
  const prevRef = useRef<string[]>([])

  useEffect(() => {
    const element = ref.current
    const prevValue = prevRef.current
    prevRef.current = modes.flat().filter(Boolean) as string[]

    element?.classList.remove(...prevValue)
    element?.classList.add(...prevRef.current)

    return () => element?.classList.remove(...prevValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modes.toString()])

  return ref
}

export default useMode
