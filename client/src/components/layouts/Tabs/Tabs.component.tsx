import React from 'react'
import { Tabs as MuiTabs, TabsProps as MuiTabsProps } from '@mui/material'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './Tabs.module.scss'
import Tab from './Tab'

export type TabsProps = MuiTabsProps & {
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
export function Tabs(props: TabsProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.Tabs, className)

  return (
    <MuiTabs className={_className} {...otherProps}>
      {children}
    </MuiTabs>
  )
}

Tabs.displayName = 'Tabs'

Tabs.Tab = Tab

export default Tabs
