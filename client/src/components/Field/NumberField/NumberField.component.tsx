import React from 'react'
import MuiTextField from '@mui/material/TextField'

// ---| core |---
import { cn } from 'tools'
import { FormOptions, useForm, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| self |---
import css from './NumberField.module.scss'

export type NumberFieldProps = Pick<FormOptions<number>, 'value' | 'name' | 'onChange'> & {
  message?: React.ReactNode
  label?: React.ReactNode
  className?: string
  required?: boolean
  disabled?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <NumberField />
 */
export function NumberField(props: NumberFieldProps): JSX.Element {
  const { message, name, value, onChange, className, ...otherProps } = props
  const _className = cn(css.NumberField, className)
  const field = useForm({ name, value, onChange })
  const onBlur = useFunc(() => field.validate())
  const handleChange = useFunc((event: React.ChangeEvent<HTMLInputElement>) => field.set(Number(event.target.value)))

  return (
    <MuiTextField
      className={_className}
      name={field.name}
      type='number'
      size='small'
      value={field.value()}
      onBlur={onBlur}
      onChange={handleChange}
      helperText={field.errors()?.[0] ?? message}
      error={!!field.errors()}
      {...otherProps}
    />
  )
}

NumberField.displayName = 'NumberField'

export default NumberField
