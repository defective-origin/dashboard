import React from 'react'
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './TextField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

export type TextFieldProps = BaseFieldProps<MuiTextFieldProps>

/**
 * Component description.
 *
 * How to use
 * @example
 * <TextField />
 */
export function TextField(props: TextFieldProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.TextField, className)

  return <BaseField className={_className} as={MuiTextField} {...otherProps} />
}

TextField.displayName = 'TextField'

export default TextField
