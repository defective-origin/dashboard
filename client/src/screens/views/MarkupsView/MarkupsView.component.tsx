import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'
import { useBreakpoint } from 'hooks'

// ---| pages |---
// ---| screens |---
import { MarkupOptions, toCssGrid } from 'screens/views/MarkupBoard'
// ---| components |---
import Item from 'components/layouts/Item'

// ---| self |---
import css from './MarkupsView.module.scss'

export type MarkupsViewProps<T = any> = {
  items?: MarkupOptions[]
  widgets?: T[]
  className?: string
  children?: React.ReactNode
  /** item render function */
  widget?: (item: T) => React.ReactNode
  /** Uniq item key selector */
  toKey?: (item: T) => string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <MarkupsView />
 */
export function MarkupsView<T = any>(props: MarkupsViewProps<T>) {
  const { items, widgets, widget, toKey, children, className, ...otherProps } = props
  const _className = cn(css.MarkupsView, className)
  const breakpoints = useMemo(() => items?.map(item => ({ size: item.width, ...item })) ?? [], [items])
  const breakpoint = useBreakpoint(breakpoints)

  // TODO: add slider with breakpoints sizes on it

  return (
    <div className={_className} style={toCssGrid(breakpoint)} {...otherProps}>
      {widget && widgets?.map(item =>
        <Item className={css.Item} key={toKey?.(item)} area={toKey?.(item)}>
          {widget(item)}
        </Item>,
      )}
      {children}
    </div>
  )
}

MarkupsView.displayName = 'MarkupsView'


export default MarkupsView
