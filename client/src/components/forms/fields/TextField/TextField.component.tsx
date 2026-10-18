import React, { useCallback } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './TextField.module.scss'

export type TextFieldProps = FieldProps<string> & {
  start?: React.ReactNode
  end?: React.ReactNode
  multiline?: boolean
  placeholder?: string
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
}

/**
 * Allows input short and long text.
 * @example
 * <TextField placeholder='input text' />
 * <TextField multiline />
 */
export function TextField(props: TextFieldProps) {
  const { start, end, multiline, placeholder, value = '', onChange, className, ...otherProps } = props

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange?.(event.target.value, event)
  , [onChange])


  return (
    <label className={cn(css.TextField, className)}>
      {start}
      {multiline
        ? <textarea className={css.input} rows={5} value={value} placeholder={placeholder} onChange={handleChange} {...otherProps} />
        : <input className={css.input} type='text' value={value} placeholder={placeholder} onChange={handleChange} {...otherProps} />
      }
      {end}
    </label>
  )
}

TextField.displayName = 'TextField'

export default formField(TextField)
