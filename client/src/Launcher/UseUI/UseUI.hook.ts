import { useMemo } from 'react'

// ---| core |---
import { Breakpoint, useBreakpoint, useMode } from 'hooks'

// ---| components |---
import { ToastReturnOptions, useToast } from 'components/Toast'

export class ContainerBreakpoint implements Breakpoint {
  constructor(
    public names: string[],
    public size = Number.MAX_SAFE_INTEGER,
  ) {}
}

// related to breakpoint documentation https://zeroheight.com/3f9f837f9/p/71b709-layout/b/56984a
export const MEDIA_BREAKPOINTS = [
  // Mobile platforms
  new ContainerBreakpoint(['mobile', 'vertical'], 480),
  new ContainerBreakpoint(['mobile', 'horizontal'], 768),

  // Tablet or Low resolution Desktops
  new ContainerBreakpoint(['tablet', 'vertical'], 1024),
  new ContainerBreakpoint(['tablet', 'horizontal'], 1280),

  // Low resolutions Desktop or High resolution Desktops with 150% system zoom
  new ContainerBreakpoint(['desktop'], 1536),

  // Tv or High resolution Desktops
  new ContainerBreakpoint(['tv']),
]

export type UIReturnOptions = {
  toast: ToastReturnOptions
}

/**
 * Hook descriptions
 *
 * Map for style overrides
 * https://mui.com/material-ui/customization/default-theme/
 *
 * @example
 * const options = useUI(conf)
 */

export const useUI = (): UIReturnOptions => {
  const toast = useToast()
  const breakpoint = useBreakpoint(MEDIA_BREAKPOINTS)

  useMode(breakpoint.names)

  return useMemo(() => ({ toast }), [toast])
}

export default useUI
