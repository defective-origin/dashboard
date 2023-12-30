import { useMemo, useRef } from 'react'

// ---| components |---
import Repeat from 'components/Repeat'

// ---| common |---
import { cn, xy } from 'common/tools'

// ---| self |---
import css from './ViewBoard.module.scss'
import ViewBoardItem, { ViewBoardItemProps } from './ViewBoardItem'

export type ViewBoardItem = { place: xy.Square }

export type ViewBoardProps<I extends Record<string, unknown>> = Omit<ViewBoardItemProps<I>, 'options'> & {
  className?: string
  // set margin around each widget
  gap?: number
  /** Items to show */
  items?: I[]
  /** Size of cell */
  cell?: xy.Vector
  /** Place selector */
  placeKey?: string,
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
 * const TestComponent = (props = {}) => <div {...props}>TEST ITEM</div>
 *
 * <ViewBoard
 *   rows={9}
 *   columns={9}
 *   gap={10}
 *   widget={TestComponent}
 *   items={items}
 * />
 */
export default function ViewBoard<I extends Record<string, unknown>>(props: ViewBoardProps<I>): JSX.Element {
  const { cell, gap = 0, items = [], placeKey, className } = props
  const margin = gap / 2
  const viewItems = useMemo(() => items.map((item, idx) =>
    <ViewBoardItem key={idx} options={item} margin={margin} cell={cell} placeKey={placeKey} />,
  ), [cell, items, margin, placeKey])

  return (
    <div className={cn(css.ViewBoard, className)}>
      {viewItems}
    </div>
  )
}
