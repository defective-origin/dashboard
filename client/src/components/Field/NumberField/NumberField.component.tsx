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
import BaseField, { BaseFieldProps } from '../BaseField'

export type NumberFieldProps = FormOptions<number> & BaseFieldProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <NumberField />
 */
export function NumberField(props: NumberFieldProps): JSX.Element {
  const { name, value, onChange, className, ...otherProps } = props
  const _className = cn(css.NumberField, className)
  const field = useForm({ name, value, onChange })
  const onBlur = useFunc(() => field.validate())
  const handleChange = useFunc((event: React.ChangeEvent<HTMLInputElement>) => field.set(Number(event.target.value)))

  return (
    <BaseField className={_className} errors={field.errors()} {...otherProps}>
      <MuiTextField name={field.name} size='small' type='number' value={field.value()} onBlur={onBlur} onChange={handleChange} />
    </BaseField>
  )
}

NumberField.displayName = 'NumberField'

export default NumberField
