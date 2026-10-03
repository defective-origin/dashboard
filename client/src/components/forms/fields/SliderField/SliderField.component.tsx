import React, { useCallback } from 'react'
import MuiSliderField, { SliderProps as MuiSliderFieldProps } from '@mui/material/Slider'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './SliderField.module.scss'

export type SliderFieldProps = FieldProps<number | number[]> & {
  marks?: MuiSliderFieldProps['marks']
}

/**
 * Component description.
 * @example
 * <SliderField />
 */
export function SliderField(props: SliderFieldProps) {
  const { value = 0, marks, onChange, className, ...otherProps } = props

  const handleChange = useCallback((event: Event, value: number | number[]) =>
    onChange?.(value, event)
  , [onChange])

  return (
    <MuiSliderField
      size='small'
      className={cn(css.SliderField, className)}
      value={value}
      marks={marks}
      onChange={handleChange}
      {...otherProps}
    />
  )
}

SliderField.displayName = 'SliderField'

export default formField(SliderField)
