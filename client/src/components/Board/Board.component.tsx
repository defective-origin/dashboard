import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| self |---
import css from './Board.module.scss'
import SelectionBoard, { SelectionBoardProps } from './SelectionBoard'
import ViewBoard, { ViewBoardItem, ViewBoardProps } from './ViewBoard'

export * from './SelectionBoard/SelectionBoard.error'

export type BoardItem = ViewBoardItem

export type BoardProps<I extends Record<string, unknown>> = Omit<SelectionBoardProps<I>, 'select'> & ViewBoardProps<I> & {
  // show selection board if true otherwise show view board
  select?: boolean | SelectionBoardProps<I>['select'] // TODO: back reselect
  // TODO: move logic of update reselect value to here?
} // TODO: grid: 'infinity' | 'xs' | 'md' ... columns: infinity  rows: infinity grid: [columns, rows]
// TODO: add MiniBoard
// TODO: add full screen
// TODO: add padding to each board
// TODO: forbid select on boarder

/**
 * Board which allow to select new position for widgets and also view them.
 * In order to presets work correct, columns and rows should be multiple of 2.
 *
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
 *       overlap
 *       gap={10}
 *       rows={9}
 *       columns={9}
 *       items={items}
 *       select={items[0]}
 *       placeKey='placement'
 *       widget={TestComponent}
 *       onSelect={handleSelect}
 *       onReselect={handleReselect}
 *       onError={handleError}
 *     />
 *   )
 * }
 */
export function Board<I extends Record<string, unknown>>(props: BoardProps<I>): JSX.Element {
  const { padding, columns, rows, select, gap = 4, items, widget, placeKey = 'place', className, ...selectionBoardProps } = props
  const _className = cn(css.Board, className)

  return (
    <div className={_className}>
      <ViewBoard
        rows={rows}
        columns={columns}
        gap={gap}
        items={items}
        widget={widget}
        padding={padding}
        placeKey={placeKey}
        className={css.ViewBoard}
      />

      { select && (
        <SelectionBoard
          rows={rows}
          columns={columns}
          gap={gap}
          items={items}
          padding={padding}
          placeKey={placeKey}
          select={select === true ? undefined : select}
          className={css.SelectionBoard}
          {...selectionBoardProps}
        />
      )}
    </div>
  )
}

export default Board

