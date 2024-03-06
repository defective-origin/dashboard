import React, { useCallback } from 'react'
import MuiSelectField, { SelectChangeEvent } from '@mui/material/Select'
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Repeat, { ComponentWithItems } from 'components/Repeat'

// ---| self |---
import css from './SelectField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'
import { FormOptions, useForm } from 'components/Form'

const SELECT_FIELD_OPTIONS = {
  // // disable scroll lock
  // disableScrollLock: true,
  // // allow the menu to go outside the window
  // marginThreshold: 0,
}

export type SelectFieldItem = MuiMenuItemProps // TODO: replace by MenuItem component from components

export type SelectFieldProps = FormOptions<string | number> & ComponentWithItems<BaseFieldProps, SelectFieldItem>

/**
 * Component description.
 *
 * How to use
 * @example
 * <SelectField />
 */
export function SelectField(props: SelectFieldProps): JSX.Element {
  const { name, value, onChange, items = [], children, className, ...otherProps } = props
  const _className = cn(css.SelectField, className)
  const menuItems = Repeat({ className: css.Option, cmp: MuiMenuItem, items })
  const field = useForm({ name, value, onChange })

  const onBlur = useCallback(() => field.validate(), [field])

  const handleChange = useCallback((event: SelectChangeEvent<unknown>) => {
    field.set(event.target.value as string)
  }, [field])

  return (
    <BaseField className={_className} errors={field.errors()} {...otherProps}>
      <MuiSelectField
        name={field.name}
        size='small'
        MenuProps={SELECT_FIELD_OPTIONS}
        value={field.value()}
        onBlur={onBlur}
        onChange={handleChange}
      >
        {menuItems}
        {children}
      </MuiSelectField>
    </BaseField>
  )
}

SelectField.displayName = 'SelectField'

export default SelectField
