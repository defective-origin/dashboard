import React, { useMemo, useState } from 'react'

// ---| self |---
import { ModalWindowProviderContext, ModalWindowProviderOptions, ModalWindowProviderState } from './ModalWindowProvider.context'

export type ModalWindowProviderProps = React.PropsWithChildren

export function ModalWindowProvider(props: ModalWindowProviderProps): JSX.Element {
  const [current, setCurrent] = useState<ModalWindowProviderState>(null)

  const options = useMemo<ModalWindowProviderOptions>(() => ({
    current,
    change: (patch) => setCurrent((state) => state && { ...state, ...patch }),
    isLoaded: !!current,
  }), [current])

  return <ModalWindowProviderContext.Provider value={options} {...props} />
}

ModalWindowProvider.displayName = 'ModalWindowProvider'

export default ModalWindowProvider
