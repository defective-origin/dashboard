import React from 'react'
import MuiAlert from '@mui/material/Alert'
import MuiAlertTitle from '@mui/material/AlertTitle'

// ---| core |---
import { cn, react } from 'tools'
import { Color } from 'theme'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'

// ---| self |---
import css from './Alert.module.scss'


export type AlertColor = Exclude<Color, 'primary' | 'secondary' | 'bg' | 'contrast'>

export type AlertProps = {
  title?: React.ReactNode
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  color?: AlertColor
}

/**
 * A notification in order to show some message.
 *
 * How to use
 * @example
 * <Alert />
 */
export function Alert(props: AlertProps) {
  const { title, color, content, children = content, className, ...otherProps } = props
  const _className = cn(css.Alert, className)

  return (
    <MuiAlert className={_className} severity={color} {...otherProps}>
      {title && <MuiAlertTitle><Text.H4 size='sm' content={title} /></MuiAlertTitle>}
      <Text.Caption content={children} />
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
