import React from 'react'
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert'
import MuiAlertTitle from '@mui/material/AlertTitle'

// ---| core |---
import { cn, react } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/Text'

// ---| self |---
import css from './Alert.module.scss'


export type AlertColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'disable'

export type AlertProps = Omit<MuiAlertProps, 'severity' | 'content'> & {
  title?: string
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  color?: AlertColor
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Alert />
 */
export function Alert(props: AlertProps): JSX.Element | null {
  const { title, color, content, children = content, className, ...otherProps } = props
  const _className = cn(css.Alert, className)

  if (!children) {
    return null
  }

  return (
    <MuiAlert className={_className} severity={color} {...otherProps}>
      {title && <MuiAlertTitle><Text.H4 size='sm' content={title} /></MuiAlertTitle>}
      <Text.Caption size='xs' content={children} />
    </MuiAlert>
  )
}

Alert.displayName = 'Alert'

export default react.attachOverrides(Alert, {
  Error: { color: 'error' },
  Warning: { color: 'warning' },
  Info: { color: 'info' },
  Success: { color: 'success' },
}, {
  memoize: true,
})
