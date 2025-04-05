import React, { useCallback } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout from 'components/layouts/Layout'
import { FieldProps, formField } from 'components/forms/Form'
import { CheckboxField, CheckboxFieldProps, CheckboxValue } from '../CheckboxField'

// ---| self |---
import css from './CheckboxListField.module.scss'

export type CheckboxListFieldProps = FieldProps<CheckboxValue[]> & {
  items?: CheckboxFieldProps[]
  columns?: number
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <CheckboxListField />
 */
export function CheckboxListField(props: CheckboxListFieldProps): JSX.Element {
  const { columns, value, items = [], id, name, onChange, className, ...otherProps } = props
  const _className = cn(css.CheckboxListField, className)

  const handleChange = useCallback((v: CheckboxValue, event: React.ChangeEvent<HTMLInputElement>) => {
    if (v) {
      onChange?.([...value ?? [], v])
    } else {
      onChange?.(value?.filter(i => i !== event.target.value) ?? [])
    }
  }, [value, onChange])

  return (
    <Layout id={id} className={_className} columns={columns}>
      {items.map((item, idx) =>
        <CheckboxField
          key={idx}
          id={`${id}.${idx}`}
          name={`${name}[]`}
          {...item}
          checked={!!value?.includes(item.value)}
          onChange={handleChange}
          {...otherProps}
        />,
      )}
    </Layout>
  )
}

CheckboxListField.displayName = 'CheckboxListField'

export default formField(CheckboxListField)
