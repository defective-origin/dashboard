import React from 'react'
import MuiSelectField, { SelectChangeEvent } from '@mui/material/Select'
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem'
import { FormControl, FormHelperText, InputLabel } from '@mui/material'

// ---| core |---
import { cn } from 'tools'
import { FormOptions, useForm, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Repeat, { PropsWithItems } from 'components/Repeat'

// ---| self |---
import css from './SelectField.module.scss'

export type SelectFieldItem = MuiMenuItemProps // TODO: replace by MenuItem component from components

export type SelectFieldProps = Pick<FormOptions<string | number>, 'value' | 'name' | 'onChange'> & PropsWithItems<SelectFieldItem> & {
  message?: React.ReactNode
  label?: React.ReactNode
  className?: string
  required?: boolean
  disabled?: boolean
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <SelectField />
 */
export function SelectField(props: SelectFieldProps): JSX.Element {
  const { disabled, message, required, label, name, value, onChange, items = [], children, className, ...otherProps } = props
  const _className = cn(css.SelectField, className)
  const menuItems = Repeat({ className: css.Option, cmp: MuiMenuItem, items })
  const field = useForm({ name, value, onChange })
  const onBlur = useFunc(() => field.validate())
  const handleChange = useFunc((event: SelectChangeEvent<unknown>) => field.set(event.target.value as string))

  return (
    <FormControl>
      <InputLabel id={name} required={required}>{label}</InputLabel>
      <MuiSelectField
        labelId={name}
        className={_className}
        name={field.name}
        size='small'
        value={field.value()}
        onBlur={onBlur}
        onChange={handleChange}
        error={!!field.errors()}
        label={label}
        disabled={disabled || items.length < 2}
        {...otherProps}
      >
        {menuItems}
        {children}
      </MuiSelectField>
      {(field.errors()?.[0] || message) && <FormHelperText>{field.errors()?.[0] ?? message}</FormHelperText>}
    </FormControl>
  )
}

SelectField.displayName = 'SelectField'

export default SelectField
