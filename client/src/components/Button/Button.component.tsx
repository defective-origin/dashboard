import React from 'react'
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Text, { TextProps } from 'components/Text'
import Tooltip, { TooltipProps } from 'components/Tooltip'

// ---| self |---
import css from './Button.module.scss'

export type ButtonVariant = MuiButtonProps['variant']

export type ButtonProps<E extends React.ElementType = React.ElementType> = React.ComponentProps<E>
  & Pick<MuiButtonProps, 'type' | 'onClick' | 'href'>
  & Pick<TextProps, 'start' | 'content' | 'end' | 'size' | 'iconSize' | 'align' | 'fillIcon' | 'color' | 'loading'>
  & {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  round?: boolean
  v?: ButtonVariant
  as?: E
  tooltip?: TooltipProps | TooltipProps['content']
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Button />
 */
export const Button = <E extends React.ElementType>(props: ButtonProps<E>): JSX.Element => {
  const {
    tooltip,
    v,
    round,
    align,
    start,
    end,
    size = 'md',
    as,
    color,
    fillIcon,
    iconSize,
    loading,
    content,
    children,
    className,
    ...otherProps
  } = props
  const _className = cn(css.Button, css[size], {
    [css.round]: round,
  }, className)

  const item = (
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
          loading={loading}
        />
      )}
    </MuiButton>
  )

  if (tooltip) {
    const tooltipProps = typeof tooltip === 'object' ? tooltip : { content: tooltip }

    return <Tooltip {...tooltipProps}>{item}</Tooltip>
  }

  return item
}

Button.displayName = 'Button'

export default Button
