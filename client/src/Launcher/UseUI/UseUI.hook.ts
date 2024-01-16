import { useMemo } from 'react'

// ---| common |---
import { useBreakpoints, useMode } from 'common/hooks'

// ---| components |---
import { UseToastReturnOptions, useToast } from 'components/Toast'

// ---| self |---
import { UseThemeReturnOptions, useTheme } from './UseTheme'

export type UseUIReturnOptions = {
  theme: UseThemeReturnOptions
  toast: UseToastReturnOptions
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

export const useUI = (): UseUIReturnOptions => {
  const theme = useTheme()
  const toast = useToast()
  const breakpoints = useBreakpoints()

  useMode(theme.theme)
  useMode(breakpoints.names)

  return useMemo(() => ({ theme, toast }), [theme, toast])
}

export default useUI
