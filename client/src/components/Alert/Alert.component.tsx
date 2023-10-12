import React from 'react'
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert'
import MuiAlertTitle from '@mui/material/AlertTitle'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/Text'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import css from './Alert.module.scss'


export type AlertStatus = 'success' | 'info' | 'warning' | 'error'

export type AlertProps = Omit<MuiAlertProps, 'severity' | 'content'> & {
  title?: string
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  status?: AlertStatus
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Alert />
 */
export function Alert(props: AlertProps): JSX.Element | null {
  const { title, status, content, children = content, className, ...otherProps } = props
  const _className = cn(css.Alert, className)

  if (!content && !children) {
    return null
  }

  return (
    <MuiAlert className={_className} severity={status} {...otherProps}>
      {title && <MuiAlertTitle><Text.H4 size='sm' content={title} /></MuiAlertTitle>}
      <Text.Caption size='xs' content={children ?? content} />
    </MuiAlert>
  )
}

Alert.displayName = 'Alert'

export default react.attachOverrides(Alert, {
  Error: { status: 'error' },
  Warning: { status: 'warning' },
  Info: { status: 'info' },
  Success: { status: 'success' },
}, {
  memoize: true,
})
