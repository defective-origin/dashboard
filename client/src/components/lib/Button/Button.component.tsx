import React from 'react'
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'

// ---| components |---
import Text, { TextIcon } from 'components/lib/Text'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Button.module.scss'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonProps = Omit<MuiButtonProps, 'startIcon' | 'endIcon' | 'content'> & {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  size?: IconSize
  icon?: TextIcon
  prefix?: TextIcon
  postfix?: TextIcon
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Button />
 */
export function Button(props: ButtonProps): JSX.Element {
  const { icon, prefix = icon, postfix, size = 'xl', content, children, className, ...otherProps } = props
  const _className = cn(css.Button, css[size], className)

  return (
    <MuiButton className={_className} {...otherProps}>
      {children ?? <Text prefix={icon ?? prefix} content={content ?? children} postfix={postfix} />}
    </MuiButton>
  )
}

Button.displayName = 'Button'

export default Button
