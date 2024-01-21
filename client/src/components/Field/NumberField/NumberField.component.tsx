import React, { useCallback } from 'react'
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

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

  const change = useCallback<NonNullable<BaseFieldProps<MuiTextFieldProps>['change']>>((event) => Number(event.target.value), [])

  return <BaseField className={_className} as={MuiTextField} type='number' change={change} size='small' {...otherProps} />
}

NumberField.displayName = 'NumberField'

export default NumberField
