import React from 'react'
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography'

// ---| core |---
import { cn, react } from 'tools'
import { Color, Size, THEME } from 'theme'
import { FormatOptions, useFormat } from 'hooks'

// ---| components |---
import Skeleton from 'components/Skeleton'

// ---| self |---
import './Text.module.scss'
import { FORMAT_MAP } from './Text.tool'

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


export type TextFormat = keyof typeof FORMAT_MAP
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
  loading?: boolean
  bold?: boolean
  style?: React.CSSProperties
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
export function Text(props: TextProps): JSX.Element { // FIXME: extend with useItem
  const {
    v = 'body1',
    size = TEXT_SIZE_MAP[v],
    bold,
    color,
    ellipsis,
    loading,
    format,
    placeholder,
    style,
    content,
    children,
    className,
    ...otherProps
  } = props
  const _className = cn('text', {
    [`text--${size}`]: size, // FIXME: doesn't work - fix on line 92
    ellipsis,
  }, className)
  const _content = useFormat(content, FORMAT_MAP, { format, placeholder })
  const styles = {
    ...style,
    fontWeight: bold ? 'bold' : undefined,
    fontSize: THEME.components.text.size[size],
    WebkitLineClamp: typeof ellipsis === 'number' ? ellipsis : undefined,
  }

  return (
    <MuiTypography
      className={_className}
      variant={loading ? 'body1' : v}
      align='left'
      color={color && THEME.palette[color]}
      style={styles}
      fontFamily='Montserrat'
      {...otherProps}
    >
      {!loading && _content}
      {!loading && children}
      {loading && <Skeleton className={_className} v='text' content={_content} />}
    </MuiTypography>
  )
}

Text.displayName = 'Text'

export default react.attachOverrides(Text, {
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
