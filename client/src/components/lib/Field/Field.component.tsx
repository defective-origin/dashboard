import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import TextField from './TextField'
import NumberField from './NumberField'
import SwitchField from './SwitchField'
import SliderField from './SliderField'
import RadioField from './RadioField'
import SelectField from './SelectField'
import TimeField from './TimeField'
import DateTimeField from './DateTimeField'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Field.module.scss'

export type FieldProps = {
  name?: string
  label?: string
  type?: string
  value?: string | number | readonly string[]
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Field />
 */
export function Field(props: FieldProps): JSX.Element {
  const { name, value, type, label, className, children, ...otherProps } = props
  const _className = cn(css.Field, className)

  return (
    <div className={_className} {...otherProps}>
      <div className="label">{label}</div>
      <input type={type} name={name} value={value} />
      <div className="messages">{children}</div>
    </div>
  )
}

Field.Text = TextField
Field.Number = NumberField
Field.Switch = SwitchField
Field.Slider = SliderField
Field.Radio = RadioField
Field.Select = SelectField
Field.Time = TimeField
Field.DateTime = DateTimeField

Field.displayName = 'Field'

export default Field
