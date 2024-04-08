import { useEffect } from 'react'
import useElement, { ElementOptions, ElementRef } from '../../dom/UseElement'

const isMode = (arg: unknown) => Array.isArray(arg) || typeof arg === 'string'

export type ModeOption = undefined | string
export type ModeOptions = (ModeOption | ModeOption[])[]

export type ModeReturnOptions<E extends Element> = ElementRef<E>

/**
 * Add class names to elements.
 * Set on document body by default.
 *
 * @example
 * const theme = useTheme()
 * const media = useBreakpoint(MEDIA_BREAKPOINTS)
 *
 * useMode(theme, [media.name, 'a'], 'b')
 * useMode(ref, theme, [media.name, 'a'], 'b')
 */
export function useMode<E extends Element>(...args: ModeOptions): ModeReturnOptions<E>;
export function useMode<E extends Element>(ref: ElementOptions<E>, ...args: ModeOptions): ModeReturnOptions<E>;
export function useMode(refOrMode: unknown, ...args: unknown[]) {
  const ref = useElement(isMode(refOrMode) ? document.body : refOrMode as Element, document.body)

  useEffect(() => {
    const element = ref.current
    const modes = [isMode(refOrMode) ? refOrMode : undefined, ...args].flat().filter(Boolean) as string[]

    element?.classList.add(...modes)

    return () => element?.classList.remove(...modes)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refOrMode, args.toString()])

  return ref
}

export default useMode
