import React, { useCallback } from 'react'

// ---| core |---
import { cn } from 'tools'

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
 * @example
 * <CheckboxField />
 */
export function CheckboxField(props: CheckboxFieldProps) {
  const { value, checked = false, label, required, disabled, onChange, className, ...otherProps } = props

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) =>
    onChange?.(toValue(event.target.checked, value), event)
  , [value, onChange])

  return (
    <input
      className={cn(css.CheckboxField, className)}
      type='checkbox'
      value={value?.toString()}
      checked={checked}
      onChange={handleChange}
      {...otherProps}
    />
  )
}

CheckboxField.displayName = 'CheckboxField'

export default formField(CheckboxField, {
  toInit: (init, props) => toValue(props.checked ?? !!init, props.init),
  toProps: (value, props) => ({ value: props.init, checked: !!value }),
})
