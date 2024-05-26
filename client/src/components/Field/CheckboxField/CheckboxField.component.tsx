import React from 'react'
import MuiCheckboxField from '@mui/material/Checkbox'
import { FormControlLabel } from '@mui/material'

// ---| core |---
import { cn } from 'tools'
import { FormOptions, useForm, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| self |---
import css from './CheckboxField.module.scss'

const toValue = (checked?: boolean, value?: string | boolean | number) => {
  // if value passed
  if (value) {
    return checked ? value : undefined
  }

  // if value is not passed
  return checked
}

export type CheckboxFieldProps = Pick<FormOptions<string | boolean | number>, 'value' | 'name' | 'onChange'> & {
  v?: 'end' | 'start' | 'top' | 'bottom'
  checked?: boolean
  label?: React.ReactNode
  className?: string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <CheckboxField />
 */
export function CheckboxField(props: CheckboxFieldProps): JSX.Element {
  const { v, label, name, value, checked, onChange, className, ...otherProps } = props
  const _className = cn(css.CheckboxField, className)
  const field = useForm({ name, value: toValue(checked, value), onChange })

  const handleChange = useFunc((event: React.ChangeEvent<HTMLInputElement>) => {
    field.set(toValue(event.target.checked, value))
  })

  return (
    <FormControlLabel
      labelPlacement={v}
      label={label}
      control={
        <MuiCheckboxField
          className={_className}
          name={field.name}
          size='small'
          value={field.value()}
          checked={!!field.value()}
          onChange={handleChange}
          {...otherProps}
        />
      }
    />
  )
}

CheckboxField.displayName = 'CheckboxField'

export default CheckboxField
