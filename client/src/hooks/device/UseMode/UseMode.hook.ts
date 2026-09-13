import { useEffect } from 'react'
import { react } from 'tools'

const isMode = (arg: unknown) => Array.isArray(arg) || typeof arg === 'string'

export type ModeOption = undefined | string
export type ModeSelector = (element: Element) => ModeOption | ModeOption[]
export type ModeOptions = (ModeOption | ModeSelector | ModeOption[])[]

/**
 * Add class names to elements.
 * Set on document body by default.
 * @example
 * const theme = useTheme()
 * const media = useBreakpoint(MEDIA_BREAKPOINTS)
 *
 * useMode(theme, [media.name, 'a'], 'b')
 * useMode(ref, theme, [media.name, 'a'], 'b', element => 'c', element => ['d', 'm'])
 */
export function useMode(...args: ModeOptions): void
export function useMode(ref: react.ElementSelector, ...args: ModeOptions): void
export function useMode(refOrOption: unknown, ...args: unknown[]) {
  useEffect(() => {
    const element = react.getElement(isMode(refOrOption) ? document.body : refOrOption as Element, document.body)
    const flattedOptions = [isMode(refOrOption) ? refOrOption : undefined, ...args].flat()
    const modes = flattedOptions.map(option => typeof option === 'function' ? option(element) : option).flat().filter(Boolean)

    element?.classList.add(...modes)

    return () => element?.classList.remove(...modes)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refOrOption?.toString(), args.toString()])
}

export default useMode
