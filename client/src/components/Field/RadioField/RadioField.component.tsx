import React, { useCallback, useEffect } from 'react'
import MuiRadioField from '@mui/material/Radio'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FormOptions, useForm } from 'components/Form'

// ---| self |---
import css from './RadioField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

export type RadioFieldProps = FormOptions<string | number | boolean> & BaseFieldProps & {
  checked?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <RadioField />
 */
export function RadioField(props: RadioFieldProps): JSX.Element {
  const { name, value, checked, onChange, className, ...otherProps } = props
  const _className = cn(css.RadioField, className)
  const field = useForm({ name, value, dependency: true, onChange })

  useEffect(() => {
    if (checked && value !== field.value()) {
      field.set(value as string)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    field.set((event.target.checked ? value : field.value()) as string)
  }, [field, value])

  return (
    <BaseField className={_className} errors={field.errors()} align='flex-start' {...otherProps}>
      <MuiRadioField name={field.name} size='small' value={value} checked={value === field.value()} onChange={handleChange} />
    </BaseField>
  )
}

RadioField.displayName = 'RadioField'

export default RadioField
