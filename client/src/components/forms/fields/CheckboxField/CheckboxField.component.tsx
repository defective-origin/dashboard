import React, { useCallback } from 'react'
import { FormControlLabel } from '@mui/material'
import MuiCheckboxField from '@mui/material/Checkbox'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './CheckboxField.module.scss'

export type CheckboxValue = string | boolean | number | undefined

const toValue = (checked?: boolean, value?: CheckboxValue) => {
  // if value passed
  // then value should be saved as string
  if (value) {
    return checked ? value : undefined
  }

  // if value is not passed then
  // value should be saved as boolean
  return !!checked
}

export type CheckboxFieldProps = FieldProps<CheckboxValue> & {
  checked?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <CheckboxField />
 */
export function CheckboxField(props: CheckboxFieldProps) {
  const { value, checked, label, required, disabled, onChange, className, ...otherProps } = props
  const _className = cn(css.CheckboxField, className)

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
    onChange?.(toValue(checked, value), event)
  , [value, onChange])

  return (
    <FormControlLabel
      label={label}
      required={required}
      disabled={disabled}
      control={
        <MuiCheckboxField
          className={_className}
          size='small'
          value={value}
          checked={checked}
          onChange={handleChange}
          {...otherProps}
        />
      }
    />
  )
}

CheckboxField.displayName = 'CheckboxField'

export default formField(CheckboxField, {
  toInit: (init, props) => toValue(props.checked ?? !!init, props.init),
  toProps: (value, props) => ({ value: props.init, checked: !!value }),
})
