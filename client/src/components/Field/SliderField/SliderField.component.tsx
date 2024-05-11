import React from 'react'
import MuiSliderField from '@mui/material/Slider'

// ---| core |---
import { cn } from 'tools'
import { FormOptions, useForm, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './SliderField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

export type SliderFieldProps = FormOptions<number> & BaseFieldProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <SliderField />
 */
export function SliderField(props: SliderFieldProps): JSX.Element {
  const { name, value, onChange, className, ...otherProps } = props
  const _className = cn(css.SliderField, className)
  const field = useForm({ name, value, onChange })
  const handleChange = useFunc((event: Event) => field.set(Number((event.target as HTMLInputElement).value)))

  return (
    <BaseField className={_className} errors={field.errors()} {...otherProps}>
      <MuiSliderField name={field.name} size='small' value={field.value()} onChange={handleChange} />
    </BaseField>
  )
}

SliderField.displayName = 'SliderField'

export default SliderField
