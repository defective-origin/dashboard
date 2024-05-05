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

export type DividerProps = Omit<TextProps, 'v'> & {
  v?: DividerVariant
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Divider v='y' content='text' format='uppercase' />
 */
export function Divider(props: DividerProps): JSX.Element {
  const { v ='x', content, children, className, ...otherProps } = props
  const _className = cn(css.Divider, className)
  const hasContent = content ?? children
  const _content = children ?? <Text content={content} {...otherProps} />

  return (
    <MuiDivider
      className={_className}
      orientation={DIVIDER_VARIANT_MAP[v]}
      children={hasContent && _content}
    />
  )
}

Divider.displayName = 'Divider'

export default Divider
