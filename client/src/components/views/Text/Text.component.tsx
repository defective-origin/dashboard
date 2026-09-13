import React, { useMemo } from 'react'
import MuiTypography from '@mui/material/Typography'

// ---| core |---
import { cn, nil } from 'tools'
import { Color, Size } from 'theme'

// ---| components |---
import { withSkeleton } from 'components/views/Skeleton'

// ---| self |---
import './Text.module.scss'
import { TEXT_FORMAT_MAP } from './Text.constants'

const TEXT_SIZE_MAP: Record<TextVariant, TextSize> = {
  h1: 'xl',
  h2: 'lg',
  h3: 'md',
  h4: 'sm',
  h5: 'xs',
  h6: 'xs',
  body1: 'md',
  body2: 'sm',
  subtitle1: 'sm',
  subtitle2: 'sm',
  button: 'md',
  caption: 'sm',
  overline: 'xs',
}


export type TextFormat = keyof typeof TEXT_FORMAT_MAP
export type TextVariant = 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'overline'
export type TextAlign = 'justify' | 'left' | 'right' | 'center' | 'inherit'
export type TextColor = Color
export type TextSize = Size

export type TextProps = {
  format?: TextFormat
  placeholder?: boolean | React.ReactNode
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  size?: TextSize // TODO: remove and render only by tag?
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
export const Text = withSkeleton((props: TextProps) => { // FIXME: extend with useItem and rename to Typo
  const {
    v = 'body2',
    size = TEXT_SIZE_MAP[v],
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
  const styles = {
    ...style,
    lineHeight: height,
    fontWeight: bold ? 'bold' : undefined,
    WebkitLineClamp: typeof ellipsis === 'number' ? ellipsis : undefined,
  }

  const formatted = useMemo(() => {
    if (nil.isNil(content) && placeholder) {
      return typeof placeholder === 'boolean' ? 'unknown' : placeholder
    } else if (nil.isNil(content) || !format) {
      return content
    }

    return TEXT_FORMAT_MAP[format](content as string)
  }, [content, format, placeholder])

  return (
    <MuiTypography
      className={cn('text', {
        nowrap,
        ellipsis,
        [`t-${size}`]: size,
        [`c-${color}`]: color,
      }, className)}
      variant={v}
      align={align}
      style={styles}
      {...otherProps}
    >
      {formatted}
      {children}
    </MuiTypography>
  )
}, props => ({ v: 'text', children: props.children || props.content }))

Text.displayName = 'Text'

export default Text
