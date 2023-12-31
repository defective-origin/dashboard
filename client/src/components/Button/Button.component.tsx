import React from 'react'
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'

// ---| components |---
import Text, { TextProps } from 'components/Text'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Button.module.scss'


export type ButtonVariant = MuiButtonProps['variant']

export type ButtonProps = Omit<MuiButtonProps, 'startIcon' | 'endIcon' | 'content' | 'size' | 'variant'>
                        & Pick<TextProps, 'start' | 'content' | 'end' | 'size' | 'iconSize' | 'align' | 'fillIcon'> & {
                          round?: boolean
                          v?: ButtonVariant
                        }

/**
 * Component description.
 *
 * How to use
 * @example
 * <Button />
 */
export function Button(props: ButtonProps): JSX.Element {
  const { v, round, align, start, end, size = 'md', fillIcon, iconSize, content, children, className, ...otherProps } = props
  const _className = cn(css.Button, css[size], round && css.Round, className)

  return (
    <MuiButton className={_className} variant={v} {...otherProps}>
      {children ?? (
        <Text
          width='inherit'
          start={start}
          content={content}
          end={end}
          size={size}
          iconSize={iconSize}
          align={align}
          fillIcon={fillIcon}
        />
      )}
    </MuiButton>
  )
}

Button.displayName = 'Button'

export default Button
