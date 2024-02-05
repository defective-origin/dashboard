import React, { useCallback } from 'react'
import MuiTextField from '@mui/material/TextField'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FormOptions, useForm } from 'components/Form'

// ---| self |---
import css from './NumberField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

export type NumberFieldProps = FormOptions & BaseFieldProps

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
  const form = useForm({ name, value, onChange })

  const onBlur = useCallback(() => form.validate(), [form])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    form.set(Number(event.target.value), event)
  }, [form])

  return (
    <BaseField className={_className} errors={form.errors()} {...otherProps}>
      <MuiTextField name={form.name} size='small' type='number' value={form.get()} onBlur={onBlur} onChange={handleChange} />
    </BaseField>
  )
}

NumberField.displayName = 'NumberField'

export default NumberField
