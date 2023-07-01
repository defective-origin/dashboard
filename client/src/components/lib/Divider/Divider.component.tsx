import React from 'react'
import MuiDivider, { DividerProps as MuiDividerProps } from '@mui/material/Divider'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Divider.module.scss'

export type DividerProps = MuiDividerProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <Divider />
 */
export function Divider(props: DividerProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.Divider, className)

  return <MuiDivider className={_className} {...otherProps}>{children}</MuiDivider>
}

Divider.displayName = 'Divider'

export default Divider
