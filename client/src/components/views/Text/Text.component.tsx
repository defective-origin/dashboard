import React from 'react'
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography'

// ---| core |---
import { cn, react } from 'tools'
import { Color, Size, THEME } from 'theme'
import { FormatOptions, useFormat } from 'hooks'

// ---| components |---
import { withSkeleton } from 'components/views/Skeleton'

// ---| self |---
import './Text.module.scss'
import { TEXT_FORMAT_MAP } from './Text.tools'

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
export type TextAlign = MuiTypographyProps['align']
export type TextColor = Color
export type TextSize = Size

export type TextProps = FormatOptions<TextFormat> & {
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
 * How to use
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
export function Text(props: TextProps) { // FIXME: extend with useItem
  const {
    v = 'body2',
    size = TEXT_SIZE_MAP[v],
    height,
    bold,
    color = 'primary',
    ellipsis,
    format,
    nowrap,
    placeholder,
    style,
    content,
    children,
    className,
    ...otherProps
  } = props
  const _className = cn('text', {
    nowrap,
    ellipsis,
    [`text--${size}`]: size, // FIXME: doesn't work - fix on line 92
  }, className)
  // TODO: add fixing number formats: units, millions, ... (fix: "M", by, to)
  // TODO: text animation on resize add by default on Text component
  const _content = useFormat(content, TEXT_FORMAT_MAP, { format, placeholder })
  const styles = {
    ...style,
    lineHeight: height,
    fontWeight: bold ? 'bold' : undefined,
    fontSize: THEME.components.text.size[size],
    WebkitLineClamp: typeof ellipsis === 'number' ? ellipsis : undefined,
  }

  return (
    <MuiTypography
      className={_className}
      variant={v}
      align='left'
      color={color && THEME.palette[color]}
      style={styles}
      fontFamily='Montserrat'
      {...otherProps}
    >
      {_content}
      {children}
    </MuiTypography>
  )
}

Text.displayName = 'Text'


export default react.attachOverrides(withSkeleton(Text, props => ({ v: 'text', children: props.children || props.content })), {
  H1: { v: 'h1' },
  H2: { v: 'h2' },
  H3: { v: 'h3' },
  H4: { v: 'h4' },
  H5: { v: 'h5' },
  H6: { v: 'h6' },
  Body1: { v: 'body1' },
  Body2: { v: 'body2' },
  Subtitle1: { v: 'subtitle1' },
  Subtitle2: { v: 'subtitle2' },
  Button: { v: 'button' },
  Caption: { v: 'caption' },
  Overline: { v: 'overline' },
}, {
  memoize: true,
})
