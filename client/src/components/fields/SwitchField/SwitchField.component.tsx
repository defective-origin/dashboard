import React from 'react'
import MuiSwitchField from '@mui/material/Switch'
import { FormControlLabel } from '@mui/material'

// ---| core |---
import { cn } from 'tools'
import { FormOptions, useForm, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| self |---
import css from './SwitchField.module.scss'

export type SwitchFieldProps = Pick<FormOptions<boolean>, 'value' | 'name' | 'onChange'> & {
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
 * <SwitchField />
 */
export function SwitchField(props: SwitchFieldProps): JSX.Element {
  const { v, label, name, checked, onChange, className, ...otherProps } = props
  const _className = cn(css.SwitchField, className)
  const field = useForm({ name, value: !!checked, onChange })
  const handleChange = useFunc((event: React.ChangeEvent<HTMLInputElement>) => field.set(event.target.checked))

  return (
    <FormControlLabel
      labelPlacement={v}
      label={label}
      control={
        <MuiSwitchField
          className={_className}
          name={field.name}
          size='small'
          checked={!!field.value()}
          onChange={handleChange}
          {...otherProps}
        />
      }
    />
  )
}

SwitchField.displayName = 'SwitchField'

export default SwitchField
