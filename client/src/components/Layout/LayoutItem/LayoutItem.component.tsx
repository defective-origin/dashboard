import React from 'react'

// ---| common |---
import { cn, UI } from 'common/tools'

// ---| self |---
import './LayoutItem.module.scss'

export type LayoutItemType = 'left-aside' | 'right-aside' | 'footer' | 'header' | 'content'

export type LayoutItemProps = {
  className?: string
  children?: React.ReactNode
  type?: LayoutItemType
  scroll?: 'x' | 'y' | 'xy'
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <LayoutItem />
 */
export function LayoutItem(props: LayoutItemProps): JSX.Element {
  const { scroll, type = 'content', children, className, ...otherProps } = props
  const _className = cn('layout-item', `layout-item--${type}`, scroll && `scroll-${scroll}`, className)

  return <div className={_className} {...otherProps}>{children}</div>
}

LayoutItem.displayName = 'LayoutItem'

export default UI.attachOverrides(LayoutItem, {
  LeftAside: { type: 'left-aside' },
  RightAside: { type: 'right-aside' },
  Footer: { type: 'footer' },
  Header: { type: 'header' },
  Content: { type: 'content' },
})
