import React from 'react'

// ---| core |---
import { cn, react } from 'tools'

// ---| components |---
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import './LayoutItem.module.scss'

export type LayoutItemVariant = 'left-aside' | 'right-aside' | 'header' | 'footer' | 'content'

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
    area,
    v,
    className,
    ...otherProps
  } = props
  const _className = cn('layout-item', v && `layout-item--${v}`, className)
  const style = !v ? { gridArea: area ?? [row, column, rows, columns].join('/') } : {}

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
