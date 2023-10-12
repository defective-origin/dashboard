import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import { TextField as MuiTextField } from '@mui/material'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './TextField.module.scss'

export type TextFieldProps = {
  name?: string
  label?: string
  value?: string
  type?: string
  default?: boolean
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <TextField />
 */
export function TextField(props: TextFieldProps): JSX.Element {
  const { name, label, type, value, className, ...otherProps } = props
  const _className = cn(css.TextField, className)

  return (
    <MuiTextField
      name={name}
      label={label}
      type={type}
      value={value}
      className={_className}
      {...otherProps}
    />
  )
}

TextField.displayName = 'TextField'

export default TextField
