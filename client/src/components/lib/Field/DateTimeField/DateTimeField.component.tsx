import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import TextField, { TextFieldProps } from '../TextField'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './DateTimeField.module.scss'

export type DateTimeFieldProps = TextFieldProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <DateTimeField />
 */
export function DateTimeField(props: DateTimeFieldProps): JSX.Element {
  const { label, children, className, ...otherProps } = props
  const _className = cn(css.DateTimeField, className)

  return (
    <>
      <div className="label">{label}</div>
      <TextField type="datetime-local" className={_className} {...otherProps} />
      <div className="messages">{children}</div>
    </>
  )
}

DateTimeField.displayName = 'DateTimeField'

export default DateTimeField
