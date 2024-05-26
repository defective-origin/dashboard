import React from 'react'

// ---| core |---
import { cn, react } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './Field.module.scss'
import TextField from './TextField'
import CheckboxField from './CheckboxField'
import NumberField from './NumberField'
import RadioField from './RadioField'
import SelectField from './SelectField'
import SliderField from './SliderField'
import SwitchField from './SwitchField'
import GroupField from './GroupField'


export const FIELD_MAP = {
  text: TextField,
  number: NumberField,
  slider: SliderField,
  radio: RadioField,
  switch: SwitchField,
  checkbox: CheckboxField,
  // Time: TimeField,
  // Date: DateField,
  // DateTime: DateTimeField,
  // DateRange: DateRangeField,
  select: SelectField,
  group: GroupField,
}

export type FieldVariant = keyof typeof FIELD_MAP

export type FieldProps<V extends FieldVariant = 'text'> = React.ComponentProps<(typeof FIELD_MAP)[V]> & {
  v?: V
  className?: string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Field />
 */
export function Field<V extends FieldVariant = 'text'>(props: FieldProps<V>): JSX.Element | null {
  const { v = 'text', className, ...otherProps } = props
  const _className = cn(css.Field, className)
  const Tag = FIELD_MAP[v] as React.FC<any>

  return <Tag className={_className} {...otherProps} />
}

Field.displayName = 'Field'

export default react.attachComponents(Field, {
  Text: TextField,
  Number: NumberField,
  Slider: SliderField,
  Radio: RadioField,
  Switch: SwitchField,
  Checkbox: CheckboxField,
  Select: SelectField,
  Group: GroupField,
})
