import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Block from 'components/layouts/Block'
import { FieldProps, formField } from 'components/forms/Form'
import { RadioField, RadioFieldProps } from '../RadioField'


// ---| self |---
import css from './RadioGroupField.module.scss'

export type RadioGroupFieldProps = FieldProps & {
  items?: RadioFieldProps[] // TODO: replace on common items ReactNode
  columns?: number
}

/**
 * Component description.
 * @example
 * <RadioGroupField />
 */
export function RadioGroupField(props: RadioGroupFieldProps) {
  const { columns, value, items = [], id, name, className, ...otherProps } = props

  return (
    <Block className={cn(css.RadioGroupField, className)} v='grid' columns={columns}>
      {items.map((item, idx) => <RadioField
        key={idx}
        id={`${id}.${idx}`}
        name={name}
        {...item}
        checked={item.value === value}
        {...otherProps} />,
      )}
    </Block>
  )
}

RadioGroupField.displayName = 'RadioGroupField'

export default formField(RadioGroupField)
