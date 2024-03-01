import { useState, useEffect, useCallback } from 'react'

export class Breakpoint<T extends string> {
  constructor(
    public name: T,
    public from: number,
    public to: number,
  ) {}
}

export type Breakpoints<T extends string = string> = Breakpoint<T>[];

// related to breakpoint documentation https://zeroheight.com/3f9f837f9/p/71b709-layout/b/56984a
export const BREAKPOINTS = [
// Tv or High resolution Desktops
  new Breakpoint('tv', 1536, Number.MAX_SAFE_INTEGER),

  // Low resolutions Desktop or High resolution Desktops with 150% system zoom
  new Breakpoint('desktop', 1280, 1536),

  // Tablet or Low resolution Desktops
  new Breakpoint('tablet', 768, 1280),
  new Breakpoint('tablet-horizontal', 1024, 1280),
  new Breakpoint('tablet-vertical', 768, 1024),

  // Mobile platforms
  new Breakpoint('mobile', 0, 768),
  new Breakpoint('mobile-horizontal', 480, 768),
  new Breakpoint('mobile-vertical', 0, 480),
]

const initNames = <T extends string>(width: number, breakpoints: Breakpoints<T>) => {
  return breakpoints
    .filter((breakpoint) => width >= breakpoint.from && width < breakpoint.to)
    .map((breakpoint) => breakpoint.name)
}

export type BreakpointsOptions<T extends string> = Breakpoints<T>

export type BreakpointsReturnOptions<T extends string> = {
  names: T[]
  isActive: (breakpoint: T) => boolean
}

/**
 * Detect media breakpoints.
 *
 * @example
 * const options = useBreakpoints()
 */
export const useBreakpoints = <T extends string = typeof BREAKPOINTS[number]['name']>(options = BREAKPOINTS as BreakpointsOptions<T>): BreakpointsReturnOptions<T> => {
  const [names, setNames] = useState(() => initNames(window.innerWidth, options))
  const isActive = useCallback((name: T) => names.includes(name), [names])

  useEffect(() => {
    const handleResize = () => setNames(initNames(window.innerWidth, options))

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [options])

  return { names, isActive }
}

export default useBreakpoints
