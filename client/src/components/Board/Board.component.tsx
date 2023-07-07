import React from 'react'

// ---| component |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import SelectionBoard, { SelectionBoardProps, SelectionBoardItem } from './SelectionBoard'
import ViewBoard, { ViewBoardProps, ViewBoardItem } from './ViewBoard'
import css from './Board.module.scss'

export * from './SelectionBoard/SelectionBoard.error'

export type BoardItem = SelectionBoardItem & ViewBoardItem

export type BoardProps = SelectionBoardProps & ViewBoardProps & {
  // items which displays on board
  items?: BoardItem[]
  // show selection board if true otherwise show view board
  select?: boolean
}

/**
 * Board which allow to select new position for widgets and also view them.
 * @example
 * const cards: BoardItem[] = [
 *   { x: 0, y: 0, x2: 3, y2: 3 },
 *   { x: 3, y: 3, x2: 6, y2: 6 },
 *   { x: 6, y: 6, x2: 9, y2: 9 },
 * ]
 *
 * export default function App(): JSX.Element {
 *   const [items, setItems] = useState(cards)
 *   const handleError = (error: Error) => { console.log('handleError', error) }
 *   const handleSelect = (item: BoardItem) => { setItems([...items, item]) }
 *   const handleReselect = (item: BoardItem, oldItem: BoardItem) => {
 *     setItems(items.map((i) => (i === oldItem ? item : i)))
 *   }
 *   const TestComponent = (props = {}) => <div {...props}>TEST ITEM</div>
 *
 *   return (
 *     <Board
 *       rows={9}
 *       columns={9}
 *       gap={10}
 *       widget={TestComponent}
 *       reselect={items[0]}
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
export function Board(props: BoardProps): JSX.Element {
  const {
    rows,
    columns,
    widget,
    select,
    reselect,
    gap,
    items,
    style,
    className,
    ...selectionBoardProps
  } = props
  const _className = cn(css.Board, className)
  const isSelectMode = select || reselect

  return (
    <div className={_className} style={style}>
      <ViewBoard
        className={css.ViewBoard}
        columns={columns}
        rows={rows}
        items={items}
        gap={gap}
        widget={widget}
      />

      { isSelectMode && (
        <SelectionBoard
          className={css.SelectionBoard}
          columns={columns}
          rows={rows}
          items={items}
          gap={gap}
          reselect={reselect}
          {...selectionBoardProps}
        />
      )}
    </div>
  )
}

export default Board
