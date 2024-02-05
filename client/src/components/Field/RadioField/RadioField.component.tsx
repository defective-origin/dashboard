import React, { useCallback } from 'react'
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

const toValue = (checked?: boolean, value?: unknown, storedValue?: unknown) => {
  return checked ? value : storedValue
}

export type RadioFieldProps = FormOptions & BaseFieldProps & {
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
  const form = useForm({ name, value: toValue(checked, value), onChange })

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    form.set(toValue(event.target.checked, value, form.get()), event)
  }, [form, value])

  return (
    <BaseField className={_className} errors={form.errors()} align='flex-start' {...otherProps}>
      <MuiRadioField name={form.name} size='small' value={value} checked={value === form.get()} onChange={handleChange} />
    </BaseField>
  )
}

RadioField.displayName = 'RadioField'

export default RadioField
