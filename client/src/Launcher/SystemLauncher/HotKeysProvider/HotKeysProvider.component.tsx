import React, { useMemo, useState } from 'react'

// ---| self |---
import { HotKeysProviderContext, HotKeysProviderOptions, HotKeysProviderState } from './HotKeysProvider.context'

export type HotKeysProviderProps = React.PropsWithChildren

export function HotKeysProvider(props: HotKeysProviderProps): JSX.Element {
  const [current, setCurrent] = useState<HotKeysProviderState>(null)

  const options = useMemo<HotKeysProviderOptions>(() => ({
    current,
    change: (patch) => setCurrent((state) => state && { ...state, ...patch }),
    isLoaded: !!current,
  }), [current])

  return <HotKeysProviderContext.Provider value={options} {...props} />
}

HotKeysProvider.displayName = 'HotKeysProvider'

export default HotKeysProvider
