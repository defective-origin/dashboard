import React from 'react'
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'
import MuiIconButton from '@mui/material/IconButton'

// ---| components |---
import Icon, { IconTypes } from 'components/lib/Icon'
import Progress from 'components/lib/Progress'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Button.module.scss'

export type ButtonProps = MuiButtonProps & {
  className?: string
  children?: React.ReactNode
  icon?: IconTypes
  loading?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Button />
 */
export function Button(props: ButtonProps): JSX.Element {
  const { icon, loading, children, className, ...otherProps } = props
  const _className = cn(css.Button, className)

  if (icon) {
    return (
      <MuiIconButton disabled={loading} className={_className} {...otherProps}>
        {!loading && <Icon type={icon} />}
        <Progress show={loading} />
      </MuiIconButton>
    )
  }
  // todo: LoadingButton 
  return <MuiButton className={_className} {...otherProps}>{children}</MuiButton>
}

Button.displayName = 'Button'

export default Button
