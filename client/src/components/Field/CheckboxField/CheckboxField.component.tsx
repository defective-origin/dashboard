import React, { useCallback } from 'react'
import MuiCheckboxField from '@mui/material/Checkbox'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FormOptions, useForm } from 'components/Form'

// ---| self |---
import css from './CheckboxField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

const toValue = (checked?: boolean, value?: any) => {
  // if value passed
  if (value) {
    return checked ? value : undefined
  }

  // if value is not passed
  return checked
}

export type CheckboxFieldProps = FormOptions & BaseFieldProps & {
  checked?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <CheckboxField />
 */
export function CheckboxField(props: CheckboxFieldProps): JSX.Element {
  const { name, value, checked, onChange, className, ...otherProps } = props
  const _className = cn(css.CheckboxField, className)
  const form = useForm({ name, value: toValue(checked, value), onChange })

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    form.set(toValue(event.target.checked, value), event)
  }, [form, value])

  return (
    <BaseField className={_className} errors={form.errors()} align='start' {...otherProps}>
      <MuiCheckboxField name={form.name} size='small' value={form.get()} checked={!!form.get()} onChange={handleChange} />
    </BaseField>
  )
}

CheckboxField.displayName = 'CheckboxField'

export default CheckboxField
