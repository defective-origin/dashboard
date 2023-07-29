import React from 'react'
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'

// ---| components |---
import Text, { TextProps } from 'components/lib/Text'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Button.module.scss'

export type ButtonProps = Omit<MuiButtonProps, 'startIcon' | 'endIcon' | 'content' | 'size'>
                        & Pick<TextProps, 'icon' | 'prefix' | 'postfix' | 'content' | 'size' | 'iconSize'>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Button />
 */
export function Button(props: ButtonProps): JSX.Element {
  const { icon, prefix, postfix, size = 'md', iconSize, content, children, className, ...otherProps } = props
  const _className = cn(css.Button, css[size], className)

  return (
    <MuiButton className={_className} {...otherProps}>
      {children ?? (
        <Text
          icon={icon}
          prefix={prefix}
          content={content}
          postfix={postfix}
          size={size}
          iconSize={iconSize}
        />
      )}
    </MuiButton>
  )
}

Button.displayName = 'Button'

export default Button
