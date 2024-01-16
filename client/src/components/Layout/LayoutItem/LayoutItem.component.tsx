import React from 'react'
import Block, { BlockProps } from 'components/Block'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import './LayoutItem.module.scss'

export type LayoutItemVariant = 'left-aside' | 'right-aside' | 'header' | 'footer' | 'content' | 'item'

export type LayoutItemProps = BlockProps & {
  v?: LayoutItemVariant | string
  area?: React.CSSProperties['gridArea']
  row?: number | string
  column?: number | string
  rows?: number | string
  columns?: number | string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <LayoutItem />
 */
export function LayoutItem(props: LayoutItemProps): JSX.Element | null {
  const {
    row = 'auto',
    column = 'auto',
    rows = 'auto',
    columns = 'auto',
    area = `${row} / ${column} / ${rows} / ${columns}`,
    v = 'item',
    className,
    ...otherProps
  } = props
  const _className = cn('layout-item', v !== 'item' && `layout-item--${v}`, className)
  const style = v === 'item' ? { gridArea: area } : {}

  return <Block className={_className} style={style} {...otherProps} />
}

LayoutItem.displayName = 'LayoutItem'

export default react.attachOverrides(LayoutItem, {
  LeftAside: { v: 'left-aside' },
  RightAside: { v: 'right-aside' },
  Footer: { v: 'footer' },
  Header: { v: 'header' },
  Content: { v: 'content' },
})
