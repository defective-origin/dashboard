import React from 'react'
import MuiTextField from '@mui/material/TextField'

// ---| core |---
import { cn } from 'tools'
import { FormOptions, useForm, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| self |---
import css from './TextField.module.scss'

export type TextFieldProps = Pick<FormOptions<string>, 'value' | 'name' | 'onChange'> & {
  message?: React.ReactNode
  label?: React.ReactNode
  multiline?: boolean
  className?: string
  required?: boolean
  disabled?: boolean
}

// TODO: add throttle for input onChange event?

/**
 * Component description.
 *
 * How to use
 * @example
 * <TextField />
 */
export function TextField(props: TextFieldProps): JSX.Element {
  const { message, name, value, onChange, className, ...otherProps } = props
  const _className = cn(css.TextField, className)
  const field = useForm({ name, value, onChange })
  const onBlur = useFunc(() => field.validate())
  const handleChange = useFunc((event: React.ChangeEvent<HTMLInputElement>) => field.set(event.target.value))

  // TODO: add Help icon near label which show tooltip on hover
  return (
    <MuiTextField
      className={_className}
      name={field.name}
      size='small'
      value={field.value()}
      rows={otherProps.multiline ? 5 : undefined}
      onBlur={onBlur}
      onChange={handleChange}
      helperText={field.errors()?.[0] ?? message}
      error={!!field.errors()}
      {...otherProps}
    />
  )
}

TextField.displayName = 'TextField'

export default TextField
