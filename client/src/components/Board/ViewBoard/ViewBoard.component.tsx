// ---| components |---
import Repeat from 'components/Repeat'

// ---| common |---
import { cn } from 'common/tools'
import { GridConf, GridItem, useGrid } from 'common/hooks'
import { react } from 'common/tools'

// ---| self |---
import ViewBoardItemComponent, { ViewBoardItemPrototype } from './ViewBoardItem'
import css from './ViewBoard.module.scss'

export type ViewBoardItem = GridItem

export type ViewBoardProps = react.GeneralProps & GridConf & {
  // item which should be displayed as widget builder
  widget?: ViewBoardItemPrototype
  // set margin around each widget
  gap?: number
  // items which displays on board
  items?: ViewBoardItem[]
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
export default function ViewBoard(props: ViewBoardProps): JSX.Element {
  const { columns, rows, widget, gap = 0, items = [], className, style } = props
  const { ref, cell } = useGrid<HTMLDivElement>({ columns, rows })
  const widgetMargin = gap / 2

  return (
    <div
      ref={ref}
      className={cn(css.ViewBoard, className)}
      style={style}
    >
      <Repeat
        item={ViewBoardItemComponent}
        for={items}
        as={widget}
        margin={widgetMargin}
        cell={cell}
      />
    </div>
  )
}
