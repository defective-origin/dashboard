import React, { useCallback } from 'react'
import MuiRadioField from '@mui/material/Radio'
import { FormControlLabel } from '@mui/material'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './RadioField.module.scss'

export type RadioFieldProps = FieldProps & {
  checked?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <RadioField />
 */
export function RadioField(props: RadioFieldProps) {
  const { value, checked, label, required, disabled, onChange, className, ...otherProps } = props
  const _className = cn(css.RadioField, className)

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
    checked && onChange?.(value, event)
  , [onChange, value])

  return (
    <FormControlLabel
      label={label}
      required={required}
      disabled={disabled}
      control={
        <MuiRadioField
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

RadioField.displayName = 'RadioField'

export default formField(RadioField, {
  toInit: (init, props) => props.checked || props.init === init ? props.init : init,
  toProps: (value, props) => ({ value: props.init, checked: props.init === value }),
})
