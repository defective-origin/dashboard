import React, { useContext, useMemo, useState } from 'react'


export type TabsManager = {
  value?: any
  setValue?: any
}

export const TabsContext = React.createContext<TabsManager | null>(null)
TabsContext.displayName = 'TabsContext'

export const useTabs = () => useContext(TabsContext as React.Context<TabsManager | null>)


export type TabsProviderProps = {
  value?: any
  children?: React.ReactNode
}

export function TabsProvider(props: TabsProviderProps) {
  const [value, setValue] = useState<any>(props.value)
  const contextValue = useMemo(() => ({ value, setValue }), [value])

  return (
    <TabsContext.Provider value={contextValue}>
      {props.children}
    </TabsContext.Provider>
  )
}

TabsProvider.displayName = 'TabsProvider'

export default TabsProvider
