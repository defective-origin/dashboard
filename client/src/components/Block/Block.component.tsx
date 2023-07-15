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
  start?: React.ReactNode
  center?: React.ReactNode
  end?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Block />
 */
export function Block(props: BlockProps): JSX.Element | null {
  const { start, center, end, gap, type = 'row', children, className, ...otherProps } = props
  const _className = cn('block', `block--${type}`, className)

  if (!start && !center && !end && !children) {
    return null
  }

  return (
    <div className={_className} {...otherProps} style={{ gap }}>
      {start && <Block.Start>{start}</Block.Start>}
      {center && <Block.Center>{center}</Block.Center>}
      {end && <Block.End>{end}</Block.End>}

      {children}
    </div>
  )
}

Block.displayName = 'Block'

Block.Start = BlockItem.Start
Block.Center = BlockItem.Center
Block.End = BlockItem.End

export default Block
