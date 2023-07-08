import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './Block.module.scss'
import BlockItem from './BlockItem'

export type BlockProps = {
  className?: string
  children?: React.ReactNode
  type?: 'row' | 'row-center' | 'column' | 'column-center'
  gap?: string | number
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Block />
 */
export function Block(props: BlockProps): JSX.Element {
  const { gap, type = 'row', children, className, ...otherProps } = props
  const _className = cn('block', `block--${type}`, className)

  return <div className={_className} {...otherProps} style={{ gap }}>{children}</div>
}

Block.displayName = 'Block'

Block.Start = BlockItem.Start
Block.Center = BlockItem.Center
Block.End = BlockItem.End

export default Block
