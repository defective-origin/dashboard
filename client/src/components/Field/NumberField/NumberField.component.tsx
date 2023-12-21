import React from 'react'
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './NumberField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

export type NumberFieldProps = BaseFieldProps<MuiTextFieldProps>

/**
 * Component description.
 *
 * How to use
 * @example
 * <NumberField />
 */
export function NumberField(props: NumberFieldProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.NumberField, className)

  return <BaseField className={_className} as={MuiTextField} {...otherProps} />
  // return <BaseField className={_className} as={MuiTextField} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} {...otherProps} />
}

NumberField.displayName = 'NumberField'

export default NumberField
