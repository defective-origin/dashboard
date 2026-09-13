import React, { useCallback } from 'react'
import MuiSwitchField from '@mui/material/Switch'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './SwitchField.module.scss'


export type SwitchFieldProps = FieldProps<boolean> & {
  checked?: boolean
}

/**
 * Component description.
 * @example
 * <SwitchField />
 */
export function SwitchField(props: SwitchFieldProps) {
  const { value, checked = !!value, onChange, className, ...otherProps } = props

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
    onChange?.(checked, event)
  , [onChange])

  return (
    <MuiSwitchField
      className={cn(css.SwitchField, className)}
      size='small'
      checked={checked}
      onChange={handleChange}
      {...otherProps}
    />
  )
}

SwitchField.displayName = 'SwitchField'

export default formField(SwitchField)
