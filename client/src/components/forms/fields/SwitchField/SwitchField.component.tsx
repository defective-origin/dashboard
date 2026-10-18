import React, { useCallback } from 'react'

// ---| core |---
import { cn } from 'tools'

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

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) =>
    onChange?.(event.target.checked, event)
  , [onChange])

  return (
    <label className={cn(css.SwitchField, className)} {...otherProps}>
      <input
        type='checkbox'
        value={value?.toString()}
        checked={checked}
        onChange={handleChange}
      />
      <span className={css.slider} />
    </label>
  )
}

SwitchField.displayName = 'SwitchField'

export default formField(SwitchField)
