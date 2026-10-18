import React, { useCallback } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import { FieldProps, formField } from 'components/forms/Form'
import { TextField } from 'components/forms/fields/TextField'

// ---| self |---
import css from './NumberField.module.scss'


export type NumberFieldProps = FieldProps<number>

/**
 * Component description.
 * @example
 * <NumberField />
 */
export function NumberField(props: NumberFieldProps) {
  const { value = 0, onChange, className, ...otherProps } = props
  const handleChange = useCallback((val: string, event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(val), event)
  }, [onChange])

  return (
    <TextField
      className={cn(css.NumberField, className)}
      type='number'
      value={value?.toString()}
      onChange={handleChange}
      {...otherProps}
    />
  )
}

NumberField.displayName = 'NumberField'

export default formField(NumberField)
