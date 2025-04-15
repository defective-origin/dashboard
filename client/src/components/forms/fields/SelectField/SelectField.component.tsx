import React, { useCallback } from 'react'
import MuiSelectField, { SelectChangeEvent } from '@mui/material/Select'
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './SelectField.module.scss'

export type SelectFieldItem = MuiMenuItemProps // TODO: replace by MenuItem component from components

export type SelectFieldProps = FieldProps & {
  items?: SelectFieldItem[];
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <SelectField />
 */
export function SelectField(props: SelectFieldProps) {
  const { value = '', name, onChange, items = [], className, ...otherProps } = props
  const _className = cn(css.SelectField, className)

  const handleChange = useCallback((event: SelectChangeEvent<unknown>) =>
    onChange?.(event.target.value, event)
  , [onChange])

  // TODO: Select should allows to get simple items and convert them [1,2] => [{ value: 1, children: 1 }, { value: 2, children: 2 }]
  return (
    <MuiSelectField
      labelId={name}
      className={_className}
      size='small'
      value={value}
      onChange={handleChange}
      disabled={items.length < 2 ? true : undefined}
      {...otherProps}
    >
      {items.map(item => <MuiMenuItem className={css.Option} {...item} />)}
    </MuiSelectField>
  )
}

SelectField.displayName = 'SelectField'

export default formField(SelectField)
