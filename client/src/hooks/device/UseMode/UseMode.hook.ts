import { useEffect } from 'react'
import useElement, { ElementOptions, ElementRef } from '../../dom/UseElement'

const isMode = (arg: unknown) => Array.isArray(arg) || typeof arg === 'string'

export type ModeOption = undefined | string
export type ModeSelector<E extends Element> = (element: E) => ModeOption | ModeOption[]
export type ModeOptions<E extends Element> = (ModeOption | ModeSelector<E> | ModeOption[])[]

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
 * useMode(ref, theme, [media.name, 'a'], 'b', (element) => 'c', (element) => ['d', 'm'])
 */
export function useMode<E extends Element>(...args: ModeOptions<E>): ModeReturnOptions<E>;
export function useMode<E extends Element>(ref: ElementOptions<E>, ...args: ModeOptions<E>): ModeReturnOptions<E>;
export function useMode(refOrOption: unknown, ...args: unknown[]) {
  const ref = useElement(isMode(refOrOption) ? document.body : refOrOption as Element, document.body)

  useEffect(() => {
    const element = ref.current
    const flattedOptions = [isMode(refOrOption) ? refOrOption : undefined, ...args].flat()
    const modes = flattedOptions.map((option) => typeof option === 'function' ? option(ref.current) : option).flat().filter(Boolean)

    element?.classList.add(...modes)

    return () => element?.classList.remove(...modes)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refOrOption?.toString(), args.toString()])

  return ref
}

export default useMode
