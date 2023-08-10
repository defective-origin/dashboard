import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Repeat, { OnlyRepeatProps, RepeatComponent, RepeatItem } from 'components/Repeat'
import Divider from 'components/lib/Divider'
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

export type BlockProps<O extends RepeatComponent> = OnlyRepeatProps<O> & {
  className?: string
  children?: React.ReactNode
  gap?: BlockGap
  direction?: BlockDirectionType
  grow?: React.CSSProperties['flexGrow']
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyContent']
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
export function Block<C extends RepeatComponent = typeof BLOCK_ITEM_MAP>(props: BlockProps<C>): JSX.Element | null {
  const { v='custom', grow, align, justify, gap, direction = 'x', children, className, ...otherProps } = props
  const _className = cn(css.Block, css[direction], gap && `gap--${gap}`, className)
  const style: React.CSSProperties = { alignItems: align, justifyContent: justify, flexGrow: grow }

  return (
    <div className={_className} style={style}>
      <Repeat cmp={BLOCK_ITEM_MAP} v={v} {...otherProps} />
      {children}
    </div>
  )
}

Block.displayName = 'Block'

Block.Divider = Divider
Block.Spacer = Spacer

export default Block
