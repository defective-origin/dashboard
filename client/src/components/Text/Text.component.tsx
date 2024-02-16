import React from 'react'
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography'

// ---| core |---
import { cn, react } from 'tools'
import { Color, Size } from 'theme'

// ---| components |---
import Skeleton from 'components/Skeleton'

// ---| self |---
import './Text.module.scss'


export type TextVariant = MuiTypographyProps['variant']
export type TextAlign = MuiTypographyProps['align']
export type TextColor = Color
export type TextSize = Size

export type TextProps = {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  size?: TextSize
  color?: TextColor
  v?: TextVariant
  align?: TextAlign
  multiline?: boolean
  ellipsis?: boolean
  loading?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Text />
 */
export function Text(props: TextProps): JSX.Element {
  const {
    v = 'body1',
    size = 'md',
    color,
    multiline,
    ellipsis,
    loading,
    content,
    children = content,
    className,
    ...otherProps
  } = props
  const _className = cn('text', {
    [`text--${size}`]: size,
    ellipsis,
    multiline,
  }, className)

  if (loading) {
    return <Skeleton className={_className} v='text' content={children} />
  }

  return (
    <MuiTypography className={_className} variant={loading ? 'body1' : v} align='left' color={color} {...otherProps}>
      {children}
    </MuiTypography>
  )
}

Text.displayName = 'Text'

export default react.attachOverrides(Text, {
  H1: { v: 'h1', size: 'xl' },
  H2: { v: 'h2', size: 'lg' },
  H3: { v: 'h3', size: 'md' },
  H4: { v: 'h4', size: 'sm' },
  H5: { v: 'h5', size: 'xs' },
  H6: { v: 'h6', size: 'xs' },
  Body1: { v: 'body1', size: 'md' },
  Body2: { v: 'body2', size: 'md' },
  Subtitle1: { v: 'subtitle1', size: 'sm' },
  Subtitle2: { v: 'subtitle2', size: 'sm' },
  Button: { v: 'button', size: 'md' },
  Caption: { v: 'caption', size: 'sm' },
  Overline: { v: 'overline', size: 'xs' },
}, {
  memoize: true,
})
