import React from 'react'
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography'

// ---| core |---

// ---| common |---
import { cn, UI } from 'common/tools'

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

export default UI.attachOverrides([
  'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
  'Body1', 'Body2',
  'Subtitle1', 'Subtitle2',
  'Button', 'Caption', 'Overline',
],
Text, {
  nameSelector: (item) => item,
  propSelector: (item) => ({ variant: item.toLowerCase() as MuiTypographyProps['variant'] }),
  memoize: true,
})
