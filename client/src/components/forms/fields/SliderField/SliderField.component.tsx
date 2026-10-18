import React, { useCallback } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './SliderField.module.scss'

export type SliderFieldProps = FieldProps<number> & {
  min?: number
  max?: number
  step?: number
}

/**
 * Component description.
 * @example
 * <SliderField />
 */
export function SliderField(props: SliderFieldProps) {
  const { value = 0, onChange, className, ...otherProps } = props

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) =>
    onChange?.(Number(event.target?.value), event)
  , [onChange])

  return (
    <input
      className={cn(css.SliderField, className)}
      type='range'
      value={value}
      onChange={handleChange}
      {...otherProps}
    />
  )
}

SliderField.displayName = 'SliderField'

export default formField(SliderField)
