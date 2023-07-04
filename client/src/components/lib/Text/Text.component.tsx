import React from 'react'
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography'

// ---| core |---

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import css from './Text.module.scss'

export type TextProps = MuiTypographyProps & {
  className?: string
  children?: React.ReactNode
  text?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Text />
 */
function Text(props: TextProps): JSX.Element {
  const { text, children, className, ...otherProps } = props
  const _className = cn(css.Banner, className)

  return (
    <MuiTypography className={_className} variant="body1" {...otherProps}>
      {text}
      {children}
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
