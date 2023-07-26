import React from 'react'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import './LayoutItem.module.scss'

export type LayoutItemType = 'left-aside' | 'right-aside' | 'footer' | 'header' | 'content'

export type LayoutItemProps = {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  type?: LayoutItemType | string
  area?: React.CSSProperties['gridArea']
  scroll?: 'x' | 'y' | 'xy'
  as?: keyof JSX.IntrinsicElements | React.ComponentType
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <LayoutItem />
 */
export function LayoutItem(props: LayoutItemProps): JSX.Element | null {
  const { as: Tag = 'div', scroll, area, type = 'content', content, children = content, className, ...otherProps } = props
  const _className = cn('layout-item', !area && `layout-item--${type}`, scroll && `scroll-${scroll}`, className)
  const _style = { gridArea: area }

  if (!children && !content && typeof Tag !== 'function') {
    return null
  }

  return <Tag className={_className} {...otherProps} style={_style}>{children}</Tag>
}

LayoutItem.displayName = 'LayoutItem'

export default react.attachOverrides(LayoutItem, {
  LeftAside: { type: 'left-aside' },
  RightAside: { type: 'right-aside' },
  Footer: { type: 'footer' },
  Header: { type: 'header' },
  Content: { type: 'content' },
})
