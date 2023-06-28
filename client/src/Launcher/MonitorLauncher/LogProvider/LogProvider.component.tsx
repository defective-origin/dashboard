import React, { useMemo, useState } from 'react'

// ---| self |---
import { LogProviderContext, LogProviderOptions, LogProviderState } from './LogProvider.context'

export type LogProviderProps = React.PropsWithChildren

export function LogProvider(props: LogProviderProps): JSX.Element {
  const [current, setCurrent] = useState<LogProviderState>(null)

  const options = useMemo<LogProviderOptions>(() => ({
    current,
    change: (patch) => setCurrent((state) => state && { ...state, ...patch }),
    isLoaded: !!current,
  }), [current])

  return <LogProviderContext.Provider value={options} {...props} />
}

LogProvider.displayName = 'LogProvider'

export default LogProvider
