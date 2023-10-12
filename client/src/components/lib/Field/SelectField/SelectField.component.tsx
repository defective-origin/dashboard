import React from 'react'
import Select from '@mui/material/Select'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Repeat from 'components/Repeat'
import Menu from 'components/lib/Menu'
import { TextFieldProps } from '../TextField'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './SelectField.module.scss'

export type SelectFieldProps = TextFieldProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <SelectField />
 */
export function SelectField(props: SelectFieldProps): JSX.Element {
  const { label, children, className, ...otherProps } = props
  const _className = cn(css.SelectField, className)

  return (
    <>
      <div className="label">{label}</div>
      <Select className={_className} {...otherProps}>
        <Repeat as={Menu.Item} />
      </Select>
      <div className="messages">{children}</div>
    </>
  )
}

SelectField.displayName = 'SelectField'

export default SelectField
