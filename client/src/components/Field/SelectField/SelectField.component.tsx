import React from 'react'
import MuiSelectField, { SelectProps as MuiSelectProps } from '@mui/material/Select'
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Repeat from 'components/Repeat'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './SelectField.module.scss'
import BaseField, { BaseFieldProps } from '../BaseField'

const SELECT_FIELD_OPTIONS = {
  // // disable scroll lock
  // disableScrollLock: true,
  // // allow the menu to go outside the window
  // marginThreshold: 0,
}

export type SelectFieldProps = BaseFieldProps<MuiSelectProps> & {
  items?: MuiMenuItemProps[] // TODO: replace by MenuItem component from components
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <SelectField />
 */
export function SelectField(props: SelectFieldProps): JSX.Element {
  const { items = [], children, className, ...otherProps } = props
  const _className = cn(css.SelectField, className)
  const menuItems = Repeat({ className: css.Option, cmp: MuiMenuItem, items })

  return (
    <BaseField
      className={_className}
      as={MuiSelectField}
      MenuProps={SELECT_FIELD_OPTIONS}
      size='small'
      grow={2}
      {...otherProps}
    >
      {menuItems}
      {children}
    </BaseField>
  )
}

SelectField.displayName = 'SelectField'

export default SelectField
