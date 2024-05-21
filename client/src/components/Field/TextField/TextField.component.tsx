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
import BaseField, { BaseFieldProps } from '../BaseField'

export type TextFieldProps = FormOptions<string> & BaseFieldProps & {
  multiline?: boolean
}

// TODO: add throttle for input onChange event?
// TODO: add validate onBlur event?

/**
 * Component description.
 *
 * How to use
 * @example
 * <TextField />
 */
export function TextField(props: TextFieldProps): JSX.Element {
  const { name, value, multiline, onChange, className, ...otherProps } = props
  const _className = cn(css.TextField, className)
  const field = useForm({ name, value, onChange })
  const onBlur = useFunc(() => field.validate())
  const handleChange = useFunc((event: React.ChangeEvent<HTMLInputElement>) => field.set(event.target.value))

  return (
    <BaseField className={_className} errors={field.errors()} {...otherProps}>
      <MuiTextField
        name={field.name}
        size='small'
        value={field.value()}
        multiline={multiline}
        rows={multiline ? 3 : undefined}
        onBlur={onBlur}
        onChange={handleChange}
      />
    </BaseField>
  )
}

TextField.displayName = 'TextField'

export default TextField
