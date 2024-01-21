import { useMemo } from 'react'

// ---| common |---
import { BreakpointsReturnOptions, useBreakpoints, useMode } from 'common/hooks'

// ---| components |---
import { ToastReturnOptions, useToast } from 'components/Toast'

export type UIReturnOptions = {
  toast: ToastReturnOptions
  breakpoints: BreakpointsReturnOptions
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
  const breakpoints = useBreakpoints()

  useMode(breakpoints.names)

  return useMemo(() => ({ toast, breakpoints }), [breakpoints, toast])
}

export default useUI
