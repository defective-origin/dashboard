import React from 'react'

// ---| common |---
import { cn, UI } from 'common/tools'

// ---| self |---
import './LayoutItem.module.scss'

const CSS_MAP_BY_TYPE = {
  'left-aside': 'li-ga-la',
  'right-aside': 'li-ga-ra',
  footer: 'li-ga-f',
  header: 'li-ga-h',
  content: 'li-ga-c',
}

export type LayoutItemType = keyof typeof CSS_MAP_BY_TYPE

export type LayoutItemProps = {
  className?: string
  children?: React.ReactNode
  type?: LayoutItemType
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <LayoutItem />
 */
export function LayoutItem(props: LayoutItemProps): JSX.Element {
  const { type = 'content', children, className, ...otherProps } = props
  const _className = cn('layout-item', CSS_MAP_BY_TYPE[type], className)

  return <div className={_className} {...otherProps}>{children}</div>
}

LayoutItem.displayName = 'LayoutItem'

export default UI.attachOverrides([
  'LeftAside',
  'RightAside',
  'Footer',
  'Header',
  'Content',
], LayoutItem, {
  nameSelector: (item) => item,
  propSelector: (item) => ({ type: item.toLowerCase().replace('aside', '-aside') as LayoutItemType }),
  memoize: true,
})
