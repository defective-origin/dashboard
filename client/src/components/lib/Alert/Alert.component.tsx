import React from 'react'
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import css from './Alert.module.scss'

export type AlertProps = MuiAlertProps & {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Alert />
 */
export function Alert(props: AlertProps): JSX.Element | null {
  const { content, children = content, className, ...otherProps } = props
  const _className = cn(css.Alert, className)

  if (!content && !children) {
    return null
  }

  return (
    <MuiAlert className={_className} {...otherProps}>
      {children}
    </MuiAlert>
  )
}

Alert.displayName = 'Alert'

export default react.attachOverrides(Alert, {
  Error: { severity: 'error' },
  Warning: { severity: 'warning' },
  Info: { severity: 'info' },
  Success: { severity: 'success' },
}, {
  memoize: true,
})
