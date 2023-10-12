import React from 'react'
import Radio from '@mui/material/Radio'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import { TextFieldProps } from '../TextField'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './RadioField.module.scss'

export type RadioFieldProps = TextFieldProps
/**
 * Component description.
 *
 * How to use
 * @example
 * <RadioField />
 */
export function RadioField(props: RadioFieldProps): JSX.Element {
  const { label, className, children, ...otherProps } = props
  const _className = cn(css.RadioField, className)

  return (
    <>
      <div className="label">{label}</div>
      <Radio className={_className} {...otherProps} />
      <div className="messages">{children}</div>
    </>
  )
}

RadioField.displayName = 'RadioField'

export default RadioField
