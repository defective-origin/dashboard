import React, { useCallback } from 'react'
import MuiTextField from '@mui/material/TextField'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FieldProps, formField } from 'components/Form'

// ---| self |---
import css from './NumberField.module.scss'

export type NumberFieldProps = FieldProps<number>

/**
 * Component description.
 *
 * How to use
 * @example
 * <NumberField />
 */
export function NumberField(props: NumberFieldProps): JSX.Element {
  const { value = 0, onChange, className, ...otherProps } = props
  const _className = cn(css.NumberField, className)
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) =>
    onChange?.(Number(event.target.value), event)
  , [onChange])

  return (
    <MuiTextField
      className={_className}
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
