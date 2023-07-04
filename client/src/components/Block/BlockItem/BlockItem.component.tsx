import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import './BlockItem.module.scss'

export type BlockItemProps = {
  className?: string
  children?: React.ReactNode
  type?: 'start' | 'center' | 'end'
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <BlockItem />
 */
export function BlockItem(props: BlockItemProps): JSX.Element {
  const { type, children, className, ...otherProps } = props
  const _className = cn('block-item', `block-item--${type}`, className)

  return <div className={_className} {...otherProps}>{children}</div>
}

BlockItem.displayName = 'BlockItem'

export default react.attachOverrides(BlockItem, {
  Start: { type: 'start' },
  Center: { type: 'center' },
  End: { type: 'end' },
})
