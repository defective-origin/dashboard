import React, { createContext, useContext } from 'react'

// ---| common |---
import { CounterReturnOptions, useCounter } from 'common/hooks'

export const DrawerContext = createContext<CounterReturnOptions | null>(null)

export const useDrawerContext = (): CounterReturnOptions | null => useContext(DrawerContext)

export const DrawerContextProvider = (props: React.PropsWithChildren): JSX.Element => {
  const asideCounter = useCounter()

  return <DrawerContext.Provider value={asideCounter} {...props} />
}
