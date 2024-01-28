import React from 'react'
import MuiDivider, { DividerProps as MuiDividerProps } from '@mui/material/Divider'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text, { TextProps } from 'components/Text'

// ---| self |---
import css from './Divider.module.scss'

export const DIVIDER_VARIANT_MAP: Record<'x' | 'y', MuiDividerProps['orientation']> = {
  x: 'horizontal',
  y: 'vertical',
}

export type DividerVariant = keyof typeof DIVIDER_VARIANT_MAP

export type DividerProps = Pick<TextProps, 'start' | 'content' | 'end' | 'size' | 'iconSize' | 'align' | 'fillIcon' | 'color'> & {
  className?: string
  children?: React.ReactNode
  v?: DividerVariant
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Divider />
 */
export function Divider(props: DividerProps): JSX.Element {
  const { align, start, end, content, v ='x', size = 'xs', iconSize, color, fillIcon, children, className, ...otherProps } = props
  const _className = cn(css.Divider, className)
  const hasContent = start || content || end || children
  const _content = children ?? (
    <Text
      start={start}
      content={content}
      end={end}
      size={size}
      iconSize={iconSize}
      align={align}
      fillIcon={fillIcon}
      color={color}
    />
  )

  return (
    <MuiDivider
      className={_className} {...otherProps}
      orientation={DIVIDER_VARIANT_MAP[v]}
      children={hasContent && _content}
    />
  )
}

Divider.displayName = 'Divider'

export default Divider
