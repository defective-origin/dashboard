import React, { forwardRef } from 'react'
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Action, { ActionProps } from 'components/Action'

// ---| self |---
import css from './Button.module.scss'

export type ButtonVariant = MuiButtonProps['variant']

export type ButtonProps = ActionProps & {
  v?: ButtonVariant
}

// TODO: remove forwardRef after migrating to react 19

/**
 * Component description.
 *
 * How to use
 * @example
 * <Button />
 */
export const Button = forwardRef<unknown, ButtonProps>((props, ref): JSX.Element => {
  const { v, className, ...otherProps } = props
  const _className = cn(css.Button, className)

  return (
    <Action
      ref={ref}
      as={MuiButton}
      className={_className}
      variant={v}
      {...otherProps}
    />
  )
})

Button.displayName = 'Button'

export default Button
