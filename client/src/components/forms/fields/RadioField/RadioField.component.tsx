import React, { useCallback } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './RadioField.module.scss'

export type RadioFieldProps = FieldProps & {
  checked?: boolean
}

/**
 * Component description.
 * @example
 * <RadioField />
 */
export function RadioField(props: RadioFieldProps) {
  const { value, checked = false, label, required, disabled, onChange, className, ...otherProps } = props

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) =>
    event.target.checked && onChange?.(value, event)
  , [onChange, value])

  return (
    <input
      className={cn(css.RadioField, className)}
      type='radio'
      value={value?.toString()}
      checked={checked}
      onChange={handleChange}
      {...otherProps}
    />
  )
}

RadioField.displayName = 'RadioField'

export default formField(RadioField, {
  toInit: (init, props) => props.checked || props.init === init ? props.init : init,
  toProps: (value, props) => ({ value: props.init, checked: props.init === value }),
})
