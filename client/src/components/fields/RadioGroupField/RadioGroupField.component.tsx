import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout from 'components/Layout'
import { FieldProps, formField } from 'components/Form'
import { RadioField, RadioFieldProps } from '../RadioField'


// ---| self |---
import css from './RadioGroupField.module.scss'

export type RadioGroupFieldProps = FieldProps & {
  items?: RadioFieldProps[]
  columns?: number
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <RadioGroupField />
 */
export function RadioGroupField(props: RadioGroupFieldProps): JSX.Element {
  const { columns, value, items = [], id, name, className, ...otherProps } = props
  const _className = cn(css.RadioGroupField, className)

  return (
    <Layout className={_className} columns={columns}>
      {items.map((item, idx) => <RadioField
        key={idx}
        id={`${id}.${idx}`}
        name={name}
        {...item}
        checked={item.value === value}
        {...otherProps} />,
      )}
    </Layout>
  )
}

RadioGroupField.displayName = 'RadioGroupField'

export default formField(RadioGroupField)
