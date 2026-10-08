import React, { useCallback } from 'react'

// ---| core |---
import { cn, react } from 'tools'

// ---| components |---
import Block from 'components/layouts/Block'
import { FieldProps, formField } from 'components/forms/Form'
import CheckboxFormField, { CheckboxField, CheckboxFieldProps, CheckboxValue } from '../CheckboxField'

// ---| self |---
import css from './CheckboxListField.module.scss'


export type CheckboxListFieldProps = FieldProps<CheckboxValue[]> & {
  columns?: number
  children?: React.ReactNode
}

/**
 * Component description.
 * @example
 * <CheckboxListField path='radio-group' label='Radio Group' init={['b']} columns={2}>
 *   <CheckboxField label='a' value='a' />
 *   <CheckboxField label='b' value='b' />
 * </CheckboxListField>
 */
export function CheckboxListField(props: CheckboxListFieldProps) {
  const { columns, value, id, name, onChange, className, children, ...otherProps } = props

  const handleChange = useCallback((v: CheckboxValue, event: React.ChangeEvent<HTMLInputElement>) => {
    if (v) {
      onChange?.([...value ?? [], v])
    } else {
      onChange?.(value?.filter(i => i !== v) ?? [])
    }
  }, [value, onChange])

  return (
    <Block id={id} className={cn(css.CheckboxListField, className)} v='grid' columns={columns}>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement<CheckboxFieldProps>(child) || !react.isExemplar(child, [CheckboxField, CheckboxFormField])) {
          return child
        }

        return React.cloneElement(child, {
          ...otherProps,
          id: `${id}.${idx}`,
          name: `${name}[]`,
          checked: !!value?.includes(child.props.value),
          onChange: handleChange,
        })
      })}
    </Block>
  )
}

CheckboxListField.displayName = 'CheckboxListField'

export default formField(CheckboxListField)
