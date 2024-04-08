import React, { useMemo } from 'react'

// ---| core |---
import { cn, xy } from 'tools'
import { useResize } from 'hooks'

// ---| self |---
import css from './Board.module.scss'
import SelectionBoard, { SelectionBoardProps } from './SelectionBoard'
import ViewBoard, { ViewBoardItem, ViewBoardProps } from './ViewBoard'

export * from './SelectionBoard/SelectionBoard.error'

export type BoardItem = ViewBoardItem

export type BoardProps<I extends Record<string, unknown>> = SelectionBoardProps<I> & ViewBoardProps<I> & {
  // show selection board if true otherwise show view board
  select?: true // TODO: back reselect
  // TODO: move logic of update reselect value to here?
} // TODO: grid: 'infinity' | 'xs' | 'md' ... columns: infinity  rows: infinity grid: [columns, rows]
// TODO: add MiniBoard
// TODO: add full screen
// TODO: rename viewBoard to WidgetBoard?
// TODO: add padding to each board

/**
 * Board which allow to select new position for widgets and also view them.
 * @example
 * const cards: BoardItem[] = [
 *   { placement: { v1: { x: 0, y: 0 }, v2: { x: 3, y: 3 } } },
 *   { placement: { v1: { x: 3, y: 3 }, v2: { x: 6, y: 6 } } },
 *   { placement: { v1: { x: 6, y: 6 }, v2: { x: 9, y: 9 } } },
 * ]
 *
 * export default function App(): JSX.Element {
 *  const [items, setItems] = useState(cards)
 *  const handleError = (error: any) => { console.log('handleError', error) }
 *  const handleSelect = (placement: any) => { setItems([...items, { placement }]) }
 *  const handleReselect = (item: BoardItem, oldItem: BoardItem) => {
 *    setItems(items.map((i) => (i === oldItem ? item : i)))
 *  }
 *  const TestComponent = (props = {}) => <div {...props}>TEST ITEM</div>
 *
 *  return (
 *     <Board
 *       rows={9}
 *       columns={9}
 *       gap={10}
 *       widget={TestComponent}
 *       select={items[0]}
 *       items={items}
 *       select
 *       overlap
 *       onSelect={handleSelect}
 *       onReselect={handleReselect}
 *       onError={handleError}
 *     />
 *   )
 * }
 */
export function Board<I extends Record<string, unknown>>(props: BoardProps<I>): JSX.Element {
  const {
    rows,
    columns,
    select,
    gap = 8,
    items = [],
    style,
    className,
    ...selectionBoardProps
  } = props
  const _className = cn(css.Board, className)
  const { width, height, ref } = useResize<HTMLDivElement>()
  const cell = useMemo<xy.Vector>(() => {
    if (!columns || !rows) {
      return xy.vector(1, 1)
    }

    return xy.vector(width / columns, height / rows)
  }, [width, height, columns, rows])

  return (
    <div ref={ref} className={_className} style={style}>
      { !!width && !!height && (
        <>
          <ViewBoard
            className={css.ViewBoard}
            cell={cell}
            items={items}
            gap={gap}
            placeKey='place'
          />

          { select && (
            <SelectionBoard
              className={css.SelectionBoard}
              columns={columns}
              rows={rows}
              cell={cell}
              items={items}
              gap={gap}
              width={width}
              height={height}
              placeKey='place'
              select={select === true ? undefined : select}
              {...selectionBoardProps}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Board

