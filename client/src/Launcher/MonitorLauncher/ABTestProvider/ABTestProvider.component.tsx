import React, { useMemo, useState } from 'react'

// ---| self |---
import { ABTestProviderContext, ABTestProviderOptions, ABTestProviderState } from './ABTestProvider.context'

export type ABTestProviderProps = React.PropsWithChildren

export function ABTestProvider(props: ABTestProviderProps): JSX.Element {
  const [current, setCurrent] = useState<ABTestProviderState>(null)

  const options = useMemo<ABTestProviderOptions>(() => ({
    current,
    change: (patch) => setCurrent((state) => state && { ...state, ...patch }),
    isLoaded: !!current,
  }), [current])

  return <ABTestProviderContext.Provider value={options} {...props} />
}

ABTestProvider.displayName = 'ABTestProvider'

export default ABTestProvider
