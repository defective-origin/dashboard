import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import css from './Field.module.scss'
import BaseField, { BaseFieldProps } from './BaseField'
import TextField from './TextField'
import CheckboxField from './CheckboxField'
import NumberField from './NumberField'
import RadioField from './RadioField'
import SelectField from './SelectField'
import SliderField from './SliderField'
import SwitchField from './SwitchField'

export type FieldProps = BaseFieldProps<JSX.IntrinsicElements['input']>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Field />
 */
export function Field(props: FieldProps): JSX.Element | null {
  const { className, ...otherProps } = props
  const _className = cn(css.Field, className)

  return <BaseField className={_className} as='input' {...otherProps} />
}

Field.displayName = 'Field'

export default react.attachComponents(Field, {
  Text: TextField,
  Number: NumberField,
  Slider: SliderField,
  Radio: RadioField,
  Switch: SwitchField,
  Checkbox: CheckboxField,
  // Time: TimeField,
  // Date: DateField,
  // DateTime: DateTimeField,
  // DateRange: DateRangeField,
  Select: SelectField,
})
