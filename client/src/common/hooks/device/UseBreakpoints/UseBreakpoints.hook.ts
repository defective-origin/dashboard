import { useState, useEffect } from 'react'

export class Breakpoint {
  constructor(
    public from: number,
    public to: number,
  ) {}
}

// related to breakpoint documentation https://zeroheight.com/3f9f837f9/p/71b709-layout/b/56984a
export const BREAKPOINTS = {
// Tv or High resolution Desktops
  tv: new Breakpoint(1536, Number.MAX_SAFE_INTEGER),

  // Low resolutions Desktop or High resolution Desktops with 150% system zoom
  desktop: new Breakpoint(1280, 1536),

  // Tablet or Low resolution Desktops
  tablet: new Breakpoint(768, 1280),
  'tablet-horizontal': new Breakpoint(1024, 1280),
  'tablet-vertical': new Breakpoint(768, 1024),

  // Mobile platforms
  mobile: new Breakpoint(0, 768),
  'mobile-horizontal': new Breakpoint(480, 768),
  'mobile-vertical': new Breakpoint(0, 480),
}

export type Breakpoints = typeof BREAKPOINTS;
export type BreakpointName = keyof Breakpoints;
export const BREAKPOINT_NAMES = Object.keys(BREAKPOINTS) as BreakpointName[]

export const isInSizeRange = (current: number, point: Breakpoint) => current >= point.from && current < point.to

const initOptions = (width: number, breakpoints: Breakpoints) => ({
  names: BREAKPOINT_NAMES.filter((name) => isInSizeRange(width, breakpoints[name])),

  isTv: isInSizeRange(width, breakpoints.tv),
  isDesktop: isInSizeRange(width, breakpoints.desktop),
  isTablet: isInSizeRange(width, breakpoints.tablet),
  isTabletHorizontal: isInSizeRange(width, breakpoints['tablet-horizontal']),
  isTabletVertical: isInSizeRange(width, breakpoints['tablet-vertical']),
  isMobile: isInSizeRange(width, breakpoints.mobile),
  isMobileHorizontal: isInSizeRange(width, breakpoints['mobile-horizontal']),
  isMobileVertical: isInSizeRange(width, breakpoints['mobile-vertical']),
})

export type UseBreakpointsOptions = Breakpoints

export type UseBreakpointsReturnOptions = ReturnType<typeof initOptions>

/**
 * Detect media breakpoints.
 *
 * @example
 * const options = useBreakpoints()
 */
export const useBreakpoints = (options: UseBreakpointsOptions = BREAKPOINTS): UseBreakpointsReturnOptions => {
  const [state, setState] = useState(initOptions(window.innerWidth, options))

  useEffect(() => {
    const handleResize = () => setState(initOptions(window.innerWidth, options))

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [options])

  return state
}

export default useBreakpoints
