import React, { useCallback } from 'react'
import MuiSliderField from '@mui/material/Slider'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FormOptions, useForm } from 'components/Form'

// ---| self |---
import css from './SliderField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

export type SliderFieldProps = FormOptions & BaseFieldProps

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
  const form = useForm({ name, value, onChange })

  const handleChange = useCallback((event: Event) => {
    form.set(Number((event.target as HTMLInputElement).value), event)
  }, [form])

  return (
    <BaseField className={_className} errors={form.errors()} {...otherProps}>
      <MuiSliderField name={form.name} size='small' value={form.get()} onChange={handleChange} />
    </BaseField>
  )
}

SliderField.displayName = 'SliderField'

export default SliderField
