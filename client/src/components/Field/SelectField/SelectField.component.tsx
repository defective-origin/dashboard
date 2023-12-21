import React, { useMemo } from 'react'
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

export type SelectFieldProps = BaseFieldProps<MuiSelectProps> & {
  items?: MuiMenuItemProps[] // FIXME: replace by MenuItem component from components
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

  console.log(items, otherProps.value)

  return (
    <BaseField className={_className} as={MuiSelectField} {...otherProps}>
      <Repeat className={css.Option} as={MuiMenuItem} items={items} />
      {children}
    </BaseField>
  )
}

SelectField.displayName = 'SelectField'

export default SelectField
