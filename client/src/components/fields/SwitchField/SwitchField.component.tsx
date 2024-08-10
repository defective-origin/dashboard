import React, { useCallback } from 'react'
import MuiSwitchField from '@mui/material/Switch'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FieldProps, formField } from 'components/Form'

// ---| self |---
import css from './SwitchField.module.scss'


export type SwitchFieldProps = FieldProps<boolean> & {
  checked?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <SwitchField />
 */
export function SwitchField(props: SwitchFieldProps): JSX.Element {
  const { value, checked = !!value, onChange, className, ...otherProps } = props
  const _className = cn(css.SwitchField, className)
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
    onChange?.(checked, event)
  , [onChange])

  return (
    <MuiSwitchField
      className={_className}
      size='small'
      checked={checked}
      onChange={handleChange}
      {...otherProps}
    />
  )
}

SwitchField.displayName = 'SwitchField'

export default formField(SwitchField)
