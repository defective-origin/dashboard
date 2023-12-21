import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Repeat, { RepeatComponent, RepeatItem, RepeatProps } from 'components/Repeat'
import Divider from 'components/Divider'
import Spacer from 'components/Spacer'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Block.module.scss'

export const BLOCK_ITEM_MAP = {
  divider: Divider,
  spacer: Spacer,
}

export type BlockGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type BlockDirectionType = 'x' | 'y' | 'xy'
export type BlockItem<C extends RepeatComponent> = RepeatItem<C>

export type BlockProps<O extends RepeatComponent> = RepeatProps<O> & {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  gap?: BlockGap
  direction?: BlockDirectionType
  grow?: React.CSSProperties['flexGrow']
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyContent']
  stretch?: boolean
}

/**
 * Component description.
 *
 * https://mui.com/material-ui/react-stack/
 *
 * How to use
 * @example
 * <Block />
 */
export function Block<C extends RepeatComponent>(props: BlockProps<C>): JSX.Element | null {
  const { v = 'custom', cmp = BLOCK_ITEM_MAP, grow, align, justify, gap, direction = 'x', content, stretch, children = content, className, ...otherProps } = props
  const _className = cn(css.Block, css[direction], gap && `gap--${gap}`, stretch && 'block--stretch', className)
  const style: React.CSSProperties = { alignItems: align, justifyContent: justify, flexGrow: grow }

  return (
    <div className={_className} style={style}>
      <Repeat cmp={cmp} v={v} {...otherProps as RepeatProps<C>} />
      {children}
    </div>
  )
}

Block.displayName = 'Block'

Block.Divider = Divider
Block.Spacer = Spacer

export default Block
