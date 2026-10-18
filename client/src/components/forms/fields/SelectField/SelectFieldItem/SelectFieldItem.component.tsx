import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Text from 'components/views/Text'

// ---| self |---
import css from './SelectFieldItem.module.scss'


export type SelectFieldItemProps = {
  value?: string | number
  start?: React.ReactNode
  end?: React.ReactNode
  className?: string
  content?: React.ReactNode
  children?: React.ReactNode
}

/**
 * Component description.
 * @example
 * <SelectFieldItem />
 */
export function SelectFieldItem(props: SelectFieldItemProps) {
  const { start, end, content, children, className, ...otherProps } = props

  return (
    <option className={cn(css.SelectFieldItem, className)} {...otherProps}>
      {start}
      <Text className={css.text} v='span' content={content ?? children} />
      {end}
    </option>
  )
}

SelectFieldItem.displayName = 'SelectFieldItem'


export default SelectFieldItem
