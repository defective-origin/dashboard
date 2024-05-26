import React from 'react'
import MuiSliderField, { SliderProps as MuiSliderFieldProps } from '@mui/material/Slider'
import { FormControlLabel } from '@mui/material'

// ---| core |---
import { cn } from 'tools'
import { FormOptions, useForm, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './SliderField.module.scss'

export type SliderFieldProps = Pick<FormOptions<number>, 'value' | 'name' | 'onChange'> & {
  v?: 'end' | 'start' | 'top' | 'bottom'
  label?: React.ReactNode
  className?: string
  disabled?: boolean
  marks?: MuiSliderFieldProps['marks']
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <SliderField />
 */
export function SliderField(props: SliderFieldProps): JSX.Element {
  const { v = 'top', marks, label, disabled, name, value, onChange, className, ...otherProps } = props
  const _className = cn(css.SliderField, className)
  const field = useForm({ name, value, onChange })
  const handleChange = useFunc((event: Event) => field.set(Number((event.target as HTMLInputElement).value)))

  return (
    <FormControlLabel
      labelPlacement={v}
      label={label}
      className={_className}
      control={
        <MuiSliderField
          name={field.name}
          size='small'
          value={field.value()}
          onChange={handleChange}
          disabled={disabled}
          marks={marks}
          {...otherProps}
        />
      }
    />
  )
}

SliderField.displayName = 'SliderField'

export default SliderField
