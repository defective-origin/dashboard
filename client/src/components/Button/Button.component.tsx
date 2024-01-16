import React from 'react'
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'

// ---| components |---
import Text, { TextProps } from 'components/Text'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Button.module.scss'


export type ButtonVariant = MuiButtonProps['variant']

export type ButtonProps<E extends React.ElementType = React.ElementType> = React.ComponentProps<E>
  & Pick<MuiButtonProps, 'type' | 'onClick' | 'href'>
  & Pick<TextProps, 'start' | 'content' | 'end' | 'size' | 'iconSize' | 'align' | 'fillIcon' | 'color'>
  & {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  round?: boolean
  v?: ButtonVariant
  as?: E
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Button />
 */
export function Button<E extends React.ElementType>(props: ButtonProps<E>): JSX.Element {
  const { v, round, align, start, end, size = 'md', as, color, fillIcon, iconSize, content, children, className, ...otherProps } = props
  const _className = cn(css.Button, css[size], {
    [css.round]: round,
  }, className)

  return (
    <MuiButton className={_className} variant={v} color={color} component={as} {...otherProps}>
      {children ?? (
        <Text
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
