import React, { useCallback } from 'react'
import MuiTextField from '@mui/material/TextField'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { FieldProps, formField } from 'components/Form'

// ---| self |---
import css from './TextField.module.scss'

export type TextFieldProps = FieldProps<string> & {
  multiline?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <TextField />
 */
export function TextField(props: TextFieldProps): JSX.Element {
  const { value = '', onChange, className, ...otherProps } = props
  const _className = cn(css.TextField, className)
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) =>
    onChange?.(event.target.value, event)
  , [onChange])

  return (
    <MuiTextField
      className={_className}
      size='small'
      value={value}
      rows={otherProps.multiline ? 5 : undefined}
      onChange={handleChange}
      {...otherProps}
    />
  )
}

TextField.displayName = 'TextField'

export default formField(TextField)
