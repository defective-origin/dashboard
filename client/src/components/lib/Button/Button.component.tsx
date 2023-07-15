import React from 'react'
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'
import MuiIconButton from '@mui/material/IconButton'

// ---| components |---
import Icon, { IconTypes } from 'components/lib/Icon'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Button.module.scss'

export type ButtonProps = MuiButtonProps & {
  className?: string
  children?: React.ReactNode
  icon?: IconTypes
  content?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Button />
 */
export function Button(props: ButtonProps): JSX.Element {
  const { content, icon, children = content, className, ...otherProps } = props
  const _className = cn(css.Button, className)

  if (icon) {
    return (
      <MuiIconButton className={_className} {...otherProps}>
        <Icon type={icon} />
      </MuiIconButton>
    )
  }

  return (
    <MuiButton className={_className} {...otherProps}>
      {children}
    </MuiButton>
  )
}

Button.displayName = 'Button'

export default Button
