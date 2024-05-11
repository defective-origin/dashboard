import React from 'react'
import MuiCheckboxField from '@mui/material/Checkbox'

// ---| core |---
import { cn } from 'tools'
import { FormOptions, useForm, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| self |---
import css from './CheckboxField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

const toValue = (checked?: boolean, value?: string | boolean | number) => {
  // if value passed
  if (value) {
    return checked ? value : undefined
  }

  // if value is not passed
  return checked
}

export type CheckboxFieldProps = FormOptions<string | boolean | number> & BaseFieldProps & {
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
  const field = useForm({ name, value: toValue(checked, value), onChange })

  const handleChange = useFunc((event: React.ChangeEvent<HTMLInputElement>) => {
    field.set(toValue(event.target.checked, value))
  })

  return (
    <BaseField className={_className} errors={field.errors()} aligns='start' {...otherProps}>
      <MuiCheckboxField name={field.name} size='small' value={field.value()} checked={!!field.value()} onChange={handleChange} />
    </BaseField>
  )
}

CheckboxField.displayName = 'CheckboxField'

export default CheckboxField
