import React from 'react'

// ---| core |---
import { cn, nil, react } from 'tools'

// ---| components |---
import Block from 'components/layouts/Block'
import { FieldProps, formField } from 'components/forms/Form'
import RadioFormField, { RadioField, RadioFieldProps } from '../RadioField'

// ---| self |---
import css from './RadioGroupField.module.scss'


export type RadioGroupFieldProps = FieldProps & {
  columns?: number
  children?: React.ReactNode
}

/**
 * Component description.
 * @example
 * <RadioGroupField path='radio-group' label='Radio Group' init='b' columns={2}>
 *   <RadioField label='a' value='a' />
 *   <RadioField label='b' value='b' />
 * </RadioGroupField>
 */
export function RadioGroupField(props: RadioGroupFieldProps) {
  const { columns, value, id, name, className, children, ...otherProps } = props

  return (
    <Block className={cn(css.RadioGroupField, className)} v='grid' columns={columns}>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement<RadioFieldProps>(child) || !react.isExemplar(child, [RadioField, RadioFormField])) {
          return child
        }

        return React.cloneElement(child, {
          ...otherProps,
          name,
          id: `${id}.${idx}`,
          checked: !nil.isNil(value) && child.props.value === value,
        })
      })}
    </Block>
  )
}

RadioGroupField.displayName = 'RadioGroupField'

export default formField(RadioGroupField)
