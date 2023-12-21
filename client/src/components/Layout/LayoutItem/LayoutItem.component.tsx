import React from 'react'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import './LayoutItem.module.scss'

export type LayoutItemVariant = 'left' | 'right' | 'top' | 'bottom' | 'content'

export type LayoutItemProps = {
  className?: string
  children?: React.ReactNode
  content?: React.ReactNode
  v?: LayoutItemVariant | string
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
  const { as: Tag = 'div', scroll, area, v = 'content', content, children = content, className, ...otherProps } = props
  const _className = cn('layout-item', !area && `layout-item--${v}`, scroll && `scroll-${scroll}`, className)
  const style = { gridArea: area }

  if (!children && !content && typeof Tag !== 'function') {
    return null
  }

  return <Tag className={_className} {...otherProps} style={style}>{children}</Tag>
}

LayoutItem.displayName = 'LayoutItem'

export default react.attachOverrides(LayoutItem, {
  Left: { v: 'left' },
  Right: { v: 'right' },
  Bottom: { v: 'bottom' },
  Top: { v: 'top' },
  Content: { v: 'content' },
})
