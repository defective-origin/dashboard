import React, { useCallback } from 'react'
import MuiTextField from '@mui/material/TextField'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FormOptions, useForm } from 'components/Form'

// ---| self |---
import css from './TextField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

export type TextFieldProps = FormOptions<string> & BaseFieldProps

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
  const { name, value, onChange, className, ...otherProps } = props
  const _className = cn(css.TextField, className)
  const field = useForm({ name, value, onChange })

  const onBlur = useCallback(() => field.validate(), [field])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    field.set(event.target.value)
  }, [field])

  return (
    <BaseField className={_className} errors={field.errors()} {...otherProps}>
      <MuiTextField name={field.name} size='small' value={field.value()} onBlur={onBlur} onChange={handleChange} />
    </BaseField>
  )
}

TextField.displayName = 'TextField'

export default TextField
