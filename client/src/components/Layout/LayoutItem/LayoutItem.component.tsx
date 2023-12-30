import React from 'react'
import Block, { BlockProps } from 'components/Block'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import './LayoutItem.module.scss'

export type LayoutItemVariant = 'left' | 'right' | 'top' | 'bottom' | 'content'

export type LayoutItemProps = BlockProps & {
  v?: LayoutItemVariant | string
  area?: React.CSSProperties['gridArea']
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <LayoutItem />
 */
export function LayoutItem(props: LayoutItemProps): JSX.Element | null {
  const { area, v = 'content', className, ...otherProps } = props
  const _className = cn('layout-item', !area && `layout-item--${v}`, className)
  const style = { gridArea: area }

  return <Block className={_className} style={style} {...otherProps} />
}

LayoutItem.displayName = 'LayoutItem'

export default react.attachOverrides(LayoutItem, {
  Left: { v: 'left' },
  Right: { v: 'right' },
  Bottom: { v: 'bottom' },
  Top: { v: 'top' },
  Content: { v: 'content' },
})
