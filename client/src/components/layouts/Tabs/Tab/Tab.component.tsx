import React from 'react'
import { Tab as MuiTab, TabProps as MuiTabProps } from '@mui/material'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './Tab.module.scss'

export type TabProps = MuiTabProps & {
  className?: string
}

/**
 * Component description.
 * @example
 * <Tab />
 */
export function Tab(props: TabProps) {
  const { className, ...otherProps } = props

  return <MuiTab className={cn(css.Tab, className)} {...otherProps} />
}

Tab.displayName = 'Tab'

export default Tab
