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
 *
 * How to use
 * @example
 * <Tab />
 */
export function Tab(props: TabProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.Tab, className)

  return <MuiTab className={_className} {...otherProps} />
}

Tab.displayName = 'Tab'

export default Tab
