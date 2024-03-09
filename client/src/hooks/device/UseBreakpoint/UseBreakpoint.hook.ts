import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

export type Breakpoint = {
  /** End size of breakpoint. */
  size: number
}

export type BreakpointOptions<E extends HTMLElement> = {
  ref?: React.MutableRefObject<E>
  direction?: 'x' | 'y'
}

export type BreakpointReturnOptions<E extends HTMLElement, B extends Breakpoint> = B & {
  ref?: React.MutableRefObject<E>
}

/**
 * Detect container size breakpoint.
 * By default observe document.body size.
 *
 * @example
 * // screen size
 * export class MediaBreakpoint implements Breakpoint {
 *   constructor(
 *     public names: string[],
 *     public size = Number.MAX_SAFE_INTEGER,
 *   ) {}
 * }
 *
 * // related to breakpoint documentation https://zeroheight.com/3f9f837f9/p/71b709-layout/b/56984a
 * export const MEDIA_BREAKPOINTS = [
 *   // Mobile platforms
 *   new MediaBreakpoint(['mobile', 'vertical'], 480),
 *   new MediaBreakpoint(['mobile', 'horizontal'], 768),
 *
 *   // Tablet or Low resolution Desktops
 *   new MediaBreakpoint(['tablet', 'vertical'], 1024),
 *   new MediaBreakpoint(['tablet', 'horizontal'], 1280),
 *
 *   // Low resolutions Desktop or High resolution Desktops with 150% system zoom
 *   new MediaBreakpoint(['desktop'], 1536),
 *
 *   // Tv or High resolution Desktops
 *   new MediaBreakpoint(['tv']),
 * ]
 *
 * const options = useBreakpoint(MEDIA_BREAKPOINTS)
 * <div ref={options.ref}>{some render of options.items}</div>
 *
 * // Observe vertical size with known element ref
 * const options = useBreakpoint(MEDIA_BREAKPOINTS, { direction: 'y', ref: elementRef })
 */
export const useBreakpoint = <E extends HTMLElement, B extends Breakpoint>(
  breakpoints: B[],
  options: BreakpointOptions<E> = {},
): BreakpointReturnOptions<E, B> => {
  const ref = useRef<E>(options.ref?.current as E ?? document.body)

  const getBreakpoint = useCallback(() => {
    const size = options.direction === 'y' ? ref.current.clientHeight : ref.current.clientWidth

    return breakpoints.find((breakpoint) => size <= breakpoint.size) as B
  }, [breakpoints, options.direction])

  const [current, setCurrent] = useState(() => getBreakpoint())

  useEffect(() => {
    const updateBreakpoint = () => setCurrent(getBreakpoint())

    const observer = new ResizeObserver(updateBreakpoint)

    observer.observe(ref.current)

    return () => observer.unobserve(ref.current)
  }, [getBreakpoint])

  return useMemo(() => ({ ref, ...current as B }), [ref, current])
}

export default useBreakpoint
