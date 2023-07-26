import React from 'react'
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography'

// ---| core |---

// ---| common |---
import { cn, react } from 'common/tools'

// ---| components |---
import Icon, { IconTypes } from 'components/lib/Icon'

// ---| self |---
import css from './Text.module.scss'

export type TextIcon = IconTypes
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type TextProps = Omit<MuiTypographyProps, 'content'> & {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  size?: TextSize
  prefix?: TextIcon
  postfix?: TextIcon
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Text />
 */
export function Text(props: TextProps): JSX.Element {
  const { size = 'md', prefix, postfix, content, children, className, ...otherProps } = props
  const _className = cn(css.Text, css[size], className)
  const hasContent = !!content || !!children

  return (
    <MuiTypography className={_className} variant='body1' {...otherProps}>
      {prefix && <Icon className={cn(css.Icon, hasContent && css.Prefix)} type={prefix} size={size} />}
      {content}
      {children}
      {postfix && <Icon className={cn(css.Icon, hasContent && css.Postfix)} type={postfix} size={size} />}
    </MuiTypography>
  )
}

Text.displayName = 'Text'

export default react.attachOverrides(Text, {
  H1: { variant: 'h1' },
  H2: { variant: 'h2' },
  H3: { variant: 'h3' },
  H4: { variant: 'h4' },
  H5: { variant: 'h5' },
  H6: { variant: 'h6' },
  Body1: { variant: 'body1' },
  Body2: { variant: 'body2' },
  Subtitle1: { variant: 'subtitle1' },
  Subtitle2: { variant: 'subtitle2' },
  Button: { variant: 'button' },
  Caption: { variant: 'caption' },
  Overline: { variant: 'overline' },
}, {
  memoize: true,
})
