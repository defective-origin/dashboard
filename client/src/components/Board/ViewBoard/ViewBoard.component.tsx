import { useMemo } from 'react'

// ---| core |---
import { cn, xy } from 'tools'

// ---| components |---
import Layout from 'components/Layout'

// ---| self |---
import css from './ViewBoard.module.scss'
import ViewBoardItem, { ViewBoardItemProps } from './ViewBoardItem'

export type ViewBoardItem = { place?: xy.Square }

export type ViewBoardProps<I extends Record<string, unknown>> = Omit<ViewBoardItemProps<I>, 'options'> & {
  className?: string
  /** Quantity of rows */
  rows?: number
  /** Quantity of columns */
  columns?: number
  // set margin around each widget
  gap?: number
  /** Items to show */
  items?: I[]
  /** Space around board */
  padding?: number
}

/**
 * View board which allow to display widgets.
 * @example
 * const cards: ViewBoardItem[] = [
 *   { x: 0, y: 0, x2: 3, y2: 3 },
 *   { x: 3, y: 3, x2: 6, y2: 6 },
 *   { x: 6, y: 6, x2: 9, y2: 9 },
 * ]
 *
 * const Widget = (props = {}) => <div {...props}>Widget</div>
 *
 * <ViewBoard
 *   rows={9}
 *   columns={9}
 *   gap={10}
 *   items={items}
 *   placeKey='place'
 *   widget={Widget}
 * />
 */
export default function ViewBoard<I extends Record<string, unknown>>(props: ViewBoardProps<I>): JSX.Element {
  const { gap, items, placeKey, widget, className, ...otherProps } = props
  const viewItems = useMemo(() => items?.map((item, idx) =>
    <ViewBoardItem key={idx} options={item} placeKey={placeKey} widget={widget} />,
  ), [items, placeKey, widget])

  return (
    <Layout className={cn(css.ViewBoard, className)} v='board' gap={gap} {...otherProps}>
      {viewItems}
    </Layout>
  )
}
