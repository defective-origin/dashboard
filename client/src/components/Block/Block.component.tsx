import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Repeat, { RepeatComponent, RepeatItem, RepeatProps } from 'components/Repeat'
import Divider from 'components/Divider'
import Spacer from 'components/Spacer'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import css from './Block.module.scss'

export const BLOCK_ITEM_MAP = {
  divider: Divider,
  spacer: Spacer,
}

export type BlockGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type BlockDirectionType = 'x' | 'y' | 'xy'
export type BlockItem<C extends RepeatComponent> = RepeatItem<C>

export type BlockProps = {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  gap?: BlockGap
  direction?: BlockDirectionType
  grow?: React.CSSProperties['flexGrow']
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyContent']
  stretch?: boolean
  scroll?: BlockDirectionType
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  style?: React.CSSProperties
}

export type BlockWithItemsProps<O extends RepeatComponent> = RepeatProps<O> & BlockProps

/**
 * Component description.
 *
 * https://mui.com/material-ui/react-stack/
 *
 * How to use
 * @example
 * <Block />
 */
export function Block<C extends RepeatComponent>(props: BlockWithItemsProps<C>): JSX.Element | null {
  const {
    as: Tag = 'div',
    v = 'custom',
    cmp = BLOCK_ITEM_MAP,
    grow,
    align,
    justify,
    gap,
    direction = 'y',
    content,
    stretch,
    style = {},
    children = content,
    className,
    scroll,
    ...otherProps
  } = props
  const _className = cn(
    css.Block,
    css[direction],
    gap && `gap--${gap}`,
    scroll && `scroll-${scroll}`,
    stretch && 'stretch',
    className,
  )
  const _style: React.CSSProperties = { alignItems: align, justifyContent: justify, flexGrow: grow, ...style }

  if (!children && !content && !react.isComponent(Tag)) {
    return null
  }

  return (
    <Tag className={_className} style={_style}>
      <Repeat cmp={cmp} v={v} {...otherProps as RepeatProps<C>} />
      {children}
    </Tag>
  )
}

Block.displayName = 'Block'

Block.Divider = Divider
Block.Spacer = Spacer

export default Block
