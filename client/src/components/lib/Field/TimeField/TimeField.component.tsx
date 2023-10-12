import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import TextField, { TextFieldProps } from '../TextField'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './TimeField.module.scss'

export type TimeFieldProps = TextFieldProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <TimeField />
 */
export function TimeField(props: TimeFieldProps): JSX.Element {
  const { label, className, children, ...otherProps } = props
  const _className = cn(css.TimeField, className)

  return (
    <>
      <div className="label">{label}</div>
      <TextField type="time" className={_className} {...otherProps} />
      <div className="messages">{children}</div>
    </>
  )
}

TimeField.displayName = 'TimeField'

export default TimeField
