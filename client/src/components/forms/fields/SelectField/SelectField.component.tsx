import React, { useCallback } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './SelectField.module.scss'
import { SelectFieldItem } from './SelectFieldItem'


export type SelectFieldProps = FieldProps & {
  children?: React.ReactNode
}

/**
 * Allows to use Select input
 * @example
 * <SelectField label='Value' value='val1' onChange={console.log}>
 *   <SelectField.Item value='val1' content='Name 1' />
 *   <SelectField.Item value='val2' content='Name 2' />
 * </SelectField>
 */
export function SelectField(props: SelectFieldProps) {
  const { value, name, onChange, className, children, ...otherProps } = props

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) =>
    onChange?.(event.target.value, event)
  , [onChange])

  // TODO: base on dropdown
  return (
    <select
      className={cn(css.SelectField, className)}
      value={value}
      onChange={handleChange}
      disabled={React.Children.toArray(children).length < 2}
      {...otherProps}
    > <button>
        <selectedcontent className={css.selectedContent}></selectedcontent>
      </button>
      {children}
    </select>
  )
}

SelectField.Item = SelectFieldItem

SelectField.displayName = 'SelectField'

export default formField(SelectField)
