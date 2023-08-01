import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Divider from 'components/lib/Divider'
import Spacer from 'components/Spacer'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './Block.module.scss'

export type BlockDirectionType = 'x' | 'y' | 'xy'

export type BlockProps = {
  className?: string
  children?: React.ReactNode
  gap?: string | number
  direction?: BlockDirectionType
  grow?: React.CSSProperties['flexGrow']
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyContent']
  items?: BlockProps[]
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Block />
 */
export function Block(props: BlockProps): JSX.Element | null {
  const { grow, items, align, justify, gap, direction = 'x', children, className, ...otherProps } = props
  const _className = cn('block', `block--${direction}`, className)
  const style: React.CSSProperties = { gap, alignItems: align, justifyContent: justify, flexGrow: grow }
  const blockItems = items?.map((item, idx) => <Block key={idx} {...item} />)

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
