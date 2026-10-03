import React, { useMemo } from 'react'

// ---| core |---
import { cn, jss, nil } from 'tools'
import { Color, Size, toColor, toSize } from 'theme'

// ---| components |---
import { withSkeleton } from 'components/views/Skeleton'

// ---| self |---
import './Text.module.scss'
import { TEXT_FORMAT_MAP } from './Text.constants'


export type TextFormat = keyof typeof TEXT_FORMAT_MAP
export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
export type TextAlign = 'justify' | 'left' | 'right' | 'center' | 'inherit'
export type TextColor = Color
export type TextSize = Size

export type TextProps = {
  format?: TextFormat
  placeholder?: boolean | React.ReactNode
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  size?: TextSize
  color?: TextColor
  v?: TextVariant
  align?: TextAlign
  ellipsis?: boolean | number
  bold?: boolean
  nowrap?: boolean
  style?: React.CSSProperties
  height?: string | number
}

/**
 * Displaying text.
 *
 * @example
 * <Text
 *    v='overline'
 *    size='xs'
 *    loading
 *    content='12345'
 *    format='currency'
 *    ellipsis={3}
 * />
 */
export const Text = withSkeleton((props: TextProps) => { // FIXME: rename to Typo
  const {
    v: Tag = 'p',
    size,
    height,
    bold, // TODO: rename to b()bold, i(italic) and so on
    color,
    ellipsis,
    format,
    align = 'left',
    nowrap,
    placeholder,
    style,
    content,
    children,
    className,
    ...otherProps
  } = props
  // TODO: add fixing number formats: units, millions, ... (fix: "M", by, to)
  // TODO: text animation on resize add by default on Text component

  const formatted = useMemo(() => {
    if (nil.isNil(content) && placeholder) {
      return typeof placeholder === 'boolean' ? 'unknown' : placeholder
    } else if (nil.isNil(content) || !format) {
      return content
    }

    return TEXT_FORMAT_MAP[format](content as string)
  }, [content, format, placeholder])

  return (
    <Tag
      className={cn('text', {
        nowrap,
        ellipsis,
      }, jss({
        ...style,
        lineHeight: height,
        fontWeight: bold ? 'bold' : undefined,
        WebkitLineClamp: typeof ellipsis === 'number' ? ellipsis : undefined,
        textAlign: align,
        fontSize: size && toSize('text', size),
        color: color && toColor(color),
      }), className)}
      {...otherProps}
    >
      {children ?? formatted}
    </Tag>
  )
}, props => ({ v: 'text', children: props.children || props.content }))

Text.displayName = 'Text'

export default Text
