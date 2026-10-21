import React, { useCallback } from 'react'

// ---| core |---
import { cn, str } from 'tools'

// ---| components |---
import { FieldProps, formField } from 'components/forms/Form'

// ---| self |---
import css from './SelectField.module.scss'
import { SelectFieldItem } from './SelectFieldItem'


export type SelectFieldProps = FieldProps & {
  sub?: boolean
  /** return array on change if true otherwise return single value */
  multiple?: boolean
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
  const { multiple, sub, value, name, onChange, className, children, ...otherProps } = props

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = [...event.target.selectedOptions]
    const values = options.map(option => str.toValue(option.value))

    onChange?.(multiple ? values : values[0], event)
  }, [multiple, onChange])

  // TODO: add based on floating-ui
  return (
    <select
      className={cn(css.SelectField, sub && css.sub, className)}
      value={value}
      onChange={handleChange}
      disabled={React.Children.toArray(children).length < 2}
      size={multiple ? 1 : undefined}
      multiple={multiple}
      {...otherProps}
    >
      <button>
        <selectedcontent className={css.selectedContent} />
      </button>

      {children}
    </select>
  )
}

SelectField.Item = SelectFieldItem

SelectField.displayName = 'SelectField'

export default formField(SelectField)
