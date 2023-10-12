import React from 'react'
import Switch from '@mui/material/Switch'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import { TextFieldProps } from '../TextField'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './SwitchField.module.scss'

export type SwitchFieldProps = TextFieldProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <SwitchField />
 */
export function SwitchField(props: SwitchFieldProps): JSX.Element {
  const { label, className, children, ...otherProps } = props
  const _className = cn(css.SwitchField, className)

  return (
    <>
      <div className="label">{label}</div>
      <Switch className={_className} {...otherProps} />
      <div className="messages">{children}</div>
    </>
  )
}

SwitchField.displayName = 'SwitchField'

export default SwitchField
