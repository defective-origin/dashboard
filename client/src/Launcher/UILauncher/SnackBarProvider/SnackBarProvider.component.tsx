import React, { useMemo, useState } from 'react'

// ---| self |---
import { SnackBarProviderContext, SnackBarProviderOptions, SnackBarProviderState } from './SnackBarProvider.context'

export type SnackBarProviderProps = React.PropsWithChildren

export function SnackBarProvider(props: SnackBarProviderProps): JSX.Element {
  const [current, setCurrent] = useState<SnackBarProviderState>(null)

  const options = useMemo<SnackBarProviderOptions>(() => ({
    current,
    change: (patch) => setCurrent((state) => state && { ...state, ...patch }),
    isLoaded: !!current,
  }), [current])

  return <SnackBarProviderContext.Provider value={options} {...props} />
}

SnackBarProvider.displayName = 'SnackBarProvider'

export default SnackBarProvider
