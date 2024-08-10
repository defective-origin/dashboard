import React, { useCallback } from 'react'
import MuiSelectField, { SelectChangeEvent } from '@mui/material/Select'
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FieldProps, formField } from 'components/Form'
import Repeat, { PropsWithItems } from 'components/Repeat'

// ---| self |---
import css from './SelectField.module.scss'

export type SelectFieldItem = MuiMenuItemProps // TODO: replace by MenuItem component from components

export type SelectFieldProps = FieldProps & PropsWithItems<SelectFieldItem>

/**
 * Component description.
 *
 * How to use
 * @example
 * <SelectField />
 */
export function SelectField(props: SelectFieldProps): JSX.Element {
  const { value = '', name, onChange, items = [], className, ...otherProps } = props
  const _className = cn(css.SelectField, className)
  const menuItems = Repeat({ className: css.Option, cmp: MuiMenuItem, items })
  const handleChange = useCallback((event: SelectChangeEvent<unknown>) =>
    onChange?.(event.target.value, event)
  , [onChange])

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
      {menuItems}
    </MuiSelectField>
  )
}

SelectField.displayName = 'SelectField'

export default formField(SelectField)
