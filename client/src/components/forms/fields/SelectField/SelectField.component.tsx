import React, { useCallback } from 'react'
import MuiSelectField, { SelectChangeEvent } from '@mui/material/Select'
import MuiMenuItem from '@mui/material/MenuItem'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './SelectField.module.scss'


export const SelectFieldItem = MuiMenuItem

export type SelectFieldProps = FieldProps & {
  children?: React.ReactNode
}

/**
 * Allows to use Select input
 * @example
 * <SelectField label='Value' value='val1' onChange={console.log}>
 *   <SelectField.Item value='val1' children='Name 1' />
 *   <SelectField.Item value='val2' children='Name 2' />
 * </SelectField>
 */
export function SelectField(props: SelectFieldProps) {
  const { value = '', name, onChange, className, children, ...otherProps } = props

  const handleChange = useCallback((event: SelectChangeEvent<unknown>) =>
    onChange?.(event.target.value, event)
  , [onChange])

  return (
    <MuiSelectField
      labelId={name}
      className={cn(css.SelectField, className)}
      size='small'
      value={value}
      onChange={handleChange}
      disabled={React.Children.toArray(children).length < 2}
      {...otherProps}
    >
      {children}
    </MuiSelectField>
  )
}

SelectField.Item = SelectFieldItem

SelectField.displayName = 'SelectField'

export default formField(SelectField)
