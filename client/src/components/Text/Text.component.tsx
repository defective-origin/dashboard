import React from 'react'
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography'

// ---| core |---

// ---| common |---
import { cn, react } from 'common/tools'

// ---| components |---
import Icon, { IconSize, IconVariant } from 'components/Icon'

// ---| self |---
import css from './Text.module.scss'

export const getAsideContent = (content: React.ReactNode, iconSize?: IconSize) => {
  if (typeof content !== 'string') {
    return content
  }

  return <Icon className={css.Icon} v={content as IconVariant} size={iconSize} />
}

export type TextStatus = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'disable'
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type TextProps = Omit<MuiTypographyProps, 'content' | 'color'> & {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  size?: TextSize
  iconSize?: IconSize
  start?: IconVariant | Exclude<React.ReactNode, string>
  end?: IconVariant | Exclude<React.ReactNode, string>
  status?: TextStatus
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Text />
 */
export function Text(props: TextProps): JSX.Element {
  const { size = 'md', iconSize = size, start, end, content, children = content, className, ...otherProps } = props
  const _className = cn(css.Text, css[size], className)

  return (
    <MuiTypography className={_className} variant='body1' align='left' {...otherProps}>
      {getAsideContent(start, iconSize)}
      {(children || (start && end)) && <span className={css.Content}>{children}</span>}
      {getAsideContent(end, iconSize)}
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
