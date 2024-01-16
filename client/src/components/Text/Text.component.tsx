import React from 'react'
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography'

// ---| core |---

// ---| common |---
import { cn, react } from 'common/tools'

// ---| components |---
import Icon, { IconSize, IconVariant } from 'components/Icon'

// ---| self |---
import css from './Text.module.scss'

export const getAsideContent = (content: React.ReactNode, iconSize?: IconSize, fill?: boolean) => {
  if (typeof content !== 'string') {
    return content
  }

  return <Icon className={css.Icon} v={content as IconVariant} fill={fill} size={iconSize} />
}

export type TextVariant = MuiTypographyProps['variant']
export type TextColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'disable'
export type TextSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type TextProps = Pick<MuiTypographyProps, 'align' | 'onClick'> & {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  size?: TextSize
  iconSize?: IconSize
  start?: IconVariant | Exclude<React.ReactNode, string>
  end?: IconVariant | Exclude<React.ReactNode, string>
  color?: TextColor
  fillIcon?: boolean
  v?: TextVariant
  multiline?: boolean // TODO: multiline boolean | number - split each \n
  ellipsis?: boolean
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
    iconSize = size,
    start,
    end,
    color,
    fillIcon,
    multiline,
    ellipsis,
    content,
    children = content,
    className,
    ...otherProps
  } = props
  const _className = cn('text', {
    [`text--${size}`]: size,
  }, className)
  const contentClassName = cn('content', { ellipsis, multiline })

  return (
    <MuiTypography className={_className} variant={v} align='left' color={color} {...otherProps}>
      {getAsideContent(start, iconSize, fillIcon)}
      {(children || (start && end)) && <span className={contentClassName}>{children}</span>}
      {getAsideContent(end, iconSize, fillIcon)}
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
