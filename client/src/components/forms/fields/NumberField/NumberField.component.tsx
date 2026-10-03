import React, { useCallback } from 'react'
import MuiTextField from '@mui/material/TextField'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import { FieldProps, formField } from 'components/forms/Form'

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
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(event.target.value), event)
  }, [onChange])

  return (
    <MuiTextField
      className={cn(css.NumberField, className)}
      type='number'
      size='small'
      value={value}
      onChange={handleChange}
      {...otherProps}
    />
  )
}

NumberField.displayName = 'NumberField'

export default formField(NumberField)
