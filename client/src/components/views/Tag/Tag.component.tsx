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
 *
 * How to use
 * @example
 * <Tag />
 */
export function Tag(props: TagProps) {
  const { outline, color = 'primary', children, className, ...otherProps } = props
  const _className = cn(css.Tag, !outline && css.fill, className)

  return <Text v='caption' className={_className} color={color} {...otherProps}>{children}</Text>
}

Tag.displayName = 'Tag'

export default Tag
