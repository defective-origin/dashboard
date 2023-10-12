import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import TextField, { TextFieldProps } from '../TextField'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './NumberField.module.scss'

export type NumberFieldProps = TextFieldProps

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

  return <TextField type="number" className={_className} {...otherProps} />
}

NumberField.displayName = 'NumberField'

export default NumberField
