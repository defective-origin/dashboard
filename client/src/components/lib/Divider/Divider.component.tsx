import React from 'react'
import MuiDivider, { DividerProps as MuiDividerProps } from '@mui/material/Divider'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Text, { TextProps } from 'components/lib/Text'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Divider.module.scss'

export const DIVIDER_DIRECTION_MAP: Record<'x' | 'y', MuiDividerProps['orientation']> = {
  x: 'horizontal',
  y: 'vertical',
}

export type DividerDirectionType = keyof typeof DIVIDER_DIRECTION_MAP

export type DividerProps = Omit<MuiDividerProps, 'content'>
                        & Pick<TextProps, 'icon' | 'prefix' | 'postfix' | 'content' | 'size' | 'iconSize'> & {
                          direction?: DividerDirectionType
                        }

/**
 * Component description.
 *
 * How to use
 * @example
 * <Divider />
 */
export function Divider(props: DividerProps): JSX.Element {
  const { icon, prefix, postfix, content, direction ='x', size = 'xs', iconSize, children, className, ...otherProps } = props
  const _className = cn(css.Divider, className)
  const hasContent = icon || prefix || content || postfix || children
  const _content = children ?? (
    <Text
      className={css.Text}
      color='secondary'
      size={size}
      iconSize={iconSize}
      icon={icon}
      prefix={prefix}
      content={content}
      postfix={postfix}
    />
  )

  return (
    <MuiDivider
      className={_className} {...otherProps}
      orientation={DIVIDER_DIRECTION_MAP[direction]}
      children={hasContent && _content}
    />
  )
}

Divider.displayName = 'Divider'

export default Divider
