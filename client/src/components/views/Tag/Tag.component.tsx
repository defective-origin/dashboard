import React from 'react'
import Text, { TextProps } from 'components/views/Text'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './Tag.module.scss'

export type TagProps = TextProps & {
  outline?: boolean
}

/**
 * Component description.
 * @example
 * <Tag />
 */
export function Tag(props: TagProps) {
  const { outline, color = 'primary', children, className, ...otherProps } = props

  return (
    <Text
      className={cn(css.Tag, !outline && css.fill, className)}
      v='caption'
      color={color}
      {...otherProps}
    >
      {children}
    </Text>
  )
}

Tag.displayName = 'Tag'

export default Tag
