import { useMemo } from 'react'

// ---| common |---

// ---| components |---
import { UseToastReturnOptions, useToast } from 'components/Toast/UseToast'

// ---| self |---
import { UseThemeReturnOptions, useTheme } from './UseTheme'
import { UseModeReturnOptions, useMode } from './UseUIMode'

export type UseUIReturnOptions = {
  mode: UseModeReturnOptions
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
  const mode = useMode()
  const theme = useTheme()
  const toast = useToast()

  return useMemo(() => ({ mode, theme, toast }), [mode, theme, toast])
}

export default useUI
