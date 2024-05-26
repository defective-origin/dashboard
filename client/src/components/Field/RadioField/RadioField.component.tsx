import React, { useEffect } from 'react'
import MuiRadioField from '@mui/material/Radio'
import { FormControlLabel } from '@mui/material'

// ---| core |---
import { cn } from 'tools'
import { FormOptions, useForm, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| self |---
import css from './RadioField.module.scss'

export type RadioFieldProps = Pick<FormOptions<string | boolean | number>, 'value' | 'name' | 'onChange'> & {
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
 * <RadioField />
 */
export function RadioField(props: RadioFieldProps): JSX.Element {
  const { v, label, name, value, checked, onChange, className, ...otherProps } = props
  const _className = cn(css.RadioField, className)
  const field = useForm({ name, value, dependency: true, onChange })

  useEffect(() => {
    if (checked && value !== field.value()) {
      field.set(value as string)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = useFunc((event: React.ChangeEvent<HTMLInputElement>) => {
    field.set((event.target.checked ? value : field.value()) as string)
  })

  return (
    <FormControlLabel
      labelPlacement={v}
      label={label}
      control={
        <MuiRadioField
          className={_className}
          name={field.name}
          size='small'
          value={value}
          checked={value === field.value()}
          onChange={handleChange}
          {...otherProps}
        />
      }
    />
  )
}

RadioField.displayName = 'RadioField'

export default RadioField
