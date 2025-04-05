import React from 'react'
import Text, { TextProps } from 'components/views/Text'

// ---| core |---
import { cn } from 'tools'
import { THEME } from 'theme'

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
export function Tag(props: TagProps): JSX.Element {
  const { outline, color = 'primary', style, children, className, ...otherProps } = props
  const _className = cn(css.Tag, className)
  const styles: React.CSSProperties = {
    ...style,
    border: `1px solid ${color && THEME.palette[`${color}-6`]}`,
    background: !outline ? color && THEME.palette[`${color}-6`] : undefined,
    borderRadius: 4,
    padding: `0 ${THEME.components.text.size.xxs}`,
  }

  return <Text v='caption' className={_className} color={color} style={styles} {...otherProps}>{children}</Text>
}

Tag.displayName = 'Tag'

export default Tag
