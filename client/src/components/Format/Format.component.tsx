import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { Text, TextProps } from 'components/Text'

// ---| self |---
import css from './Format.module.scss'
import { FORMAT_MAP, FormatValue, isNil } from './Format.tool'

export type FormatVariant = keyof typeof FORMAT_MAP

export type FormatProps = Omit<TextProps, 'content' | 'children' | 'v'> & {
  className?: string
  v?: FormatVariant
  placeholder?: boolean | React.ReactNode
  value?: FormatValue
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Format />
 */
export function Format(props: FormatProps): JSX.Element {
  const { v = 'default', placeholder, value, className, ...otherProps } = props
  const _className = cn(css.Format, className)
  const placeholderValue = typeof placeholder === 'boolean' ? 'N/A' : placeholder
  const showPlaceholder = isNil(value) && placeholder

  return (
    <Text className={_className} {...otherProps}>
      {showPlaceholder ? placeholderValue : FORMAT_MAP[v](value as string)}
    </Text>
  )
}

Format.displayName = 'Format'

export default Format
