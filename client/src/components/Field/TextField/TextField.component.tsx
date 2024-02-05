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

export type TextFieldProps = FormOptions & BaseFieldProps

// TODO: implement throttle for input onChange event?

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
  const form = useForm({ name, value, onChange })

  const onBlur = useCallback(() => form.validate(), [form])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    form.set(event.target.value, event)
  }, [form])

  return (
    <BaseField className={_className} errors={form.errors()} {...otherProps}>
      <MuiTextField name={form.name} size='small' value={form.get()} onBlur={onBlur} onChange={handleChange} />
    </BaseField>
  )
}

TextField.displayName = 'TextField'

export default TextField
