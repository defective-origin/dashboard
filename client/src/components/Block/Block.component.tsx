import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Divider from 'components/lib/Divider'
import Spacer from 'components/Spacer'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import css from './Block.module.scss'

export const BLOCK_ITEM_MAP = {
  divider: Divider,
  spacer: Spacer,
  custom: (props: Record<string, any>) => null,
}

export type BlockGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type BlockDirectionType = 'x' | 'y' | 'xy'
export type BlockItem<O extends object, T0 = react.TypedProps<O>> = T0

export type BlockProps<O extends object = typeof BLOCK_ITEM_MAP> = {
  className?: string
  children?: React.ReactNode
  gap?: BlockGap
  direction?: BlockDirectionType
  grow?: React.CSSProperties['flexGrow']
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyContent']
  map?: O
  items?: BlockItem<O>[]
  defaultType?: keyof O
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
export function Block<O extends object>(props: BlockProps<O>): JSX.Element | null {
  const { items, defaultType = 'custom', map = BLOCK_ITEM_MAP, grow, align, justify, gap, direction = 'x', children, className, ...otherProps } = props
  const _className = cn(css.Block, css[direction], gap && `gap--${gap}`, className)
  const style: React.CSSProperties = { alignItems: align, justifyContent: justify, flexGrow: grow }
  // TODO: use Repeat and Component and useComponentProps
  const blockItems = items?.map((item, idx) => {
    const { v = defaultType, ...otherItemProps } = item
    const Tag = (map as O)[v as keyof O] as React.ComponentType

    if (!Tag) {
      return null
    }

    return <Tag key={idx} {...otherItemProps} />
  })

  return (
    <div className={_className} {...otherProps} style={style}>
      {blockItems}
      {children}
    </div>
  )
}

Block.displayName = 'Block'

Block.Divider = Divider
Block.Spacer = Spacer

export default Block
