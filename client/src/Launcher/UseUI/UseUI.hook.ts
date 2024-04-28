import { useMemo } from 'react'

// ---| components |---
import { ToastReturnOptions, useToast } from 'components/Toast'

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

  return useMemo(() => ({ toast }), [toast])
}

export default useUI
