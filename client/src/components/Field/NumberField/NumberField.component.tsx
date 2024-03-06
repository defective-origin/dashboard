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

  const onBlur = useCallback(() => field.validate(), [field])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    field.set(Number(event.target.value))
  }, [field])

  return (
    <BaseField className={_className} errors={field.errors()} {...otherProps}>
      <MuiTextField name={field.name} size='small' type='number' value={field.value()} onBlur={onBlur} onChange={handleChange} />
    </BaseField>
  )
}

NumberField.displayName = 'NumberField'

export default NumberField
