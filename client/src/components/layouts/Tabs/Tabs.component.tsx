import React from 'react'
import { Tabs as MuiTabs, TabsProps as MuiTabsProps } from '@mui/material'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { useItem, ItemProps } from 'components/layouts/Item'

// ---| self |---
import css from './Tabs.module.scss'
import Tab from './Tab'
import { TabsProvider, useTabs } from './Tabs.context'
import TabContent from './TabContent'

export type TabsProps = Pick<MuiTabsProps, 'value'> & ItemProps & {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Tabs />
 */
export function Tabs(props: TabsProps) {
  const { value, children, className, ...otherProps } = useItem(props)
  const _className = cn(css.Tabs, className)
  const tabs = useTabs()

  return (
    <MuiTabs
      className={_className}
      value={tabs?.value ?? value}
      onChange={(_, val) => tabs?.setValue(val)}
      {...otherProps}
    >
      {children}
    </MuiTabs>
  )
}

Tabs.displayName = 'Tabs'

Tabs.Tab = Tab
Tabs.TabContent = TabContent
Tabs.Provider = TabsProvider

export default Tabs
