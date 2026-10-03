import React, { useCallback } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Block from 'components/layouts/Block'
import { FieldProps, formField } from 'components/forms/Form'
import { CheckboxField, CheckboxFieldProps, CheckboxValue } from '../CheckboxField'

// ---| self |---
import css from './CheckboxListField.module.scss'

export type CheckboxListFieldProps = FieldProps<CheckboxValue[]> & {
  items?: CheckboxFieldProps[] // TODO: replace on common items ReactNode
  columns?: number
}

/**
 * Component description.
 * @example
 * <CheckboxListField />
 */
export function CheckboxListField(props: CheckboxListFieldProps) {
  const { columns, value, items = [], id, name, onChange, className, ...otherProps } = props

  const handleChange = useCallback((v: CheckboxValue, event: React.ChangeEvent<HTMLInputElement>) => {
    if (v) {
      onChange?.([...value ?? [], v])
    } else {
      onChange?.(value?.filter(i => i !== event.target.value) ?? [])
    }
  }, [value, onChange])

  return (
    <Block id={id} className={cn(css.CheckboxListField, className)} v='grid' columns={columns}>
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
    </Block>
  )
}

CheckboxListField.displayName = 'CheckboxListField'

export default formField(CheckboxListField)
