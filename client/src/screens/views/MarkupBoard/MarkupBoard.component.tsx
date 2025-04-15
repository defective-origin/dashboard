import React, { useImperativeHandle, useMemo, useRef, useState } from 'react'

// ---| core |---
import { arr, cn, matrix } from 'tools'
import { useEvent, useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Item from 'components/layouts/Item'

// ---| self |---
import css from './MarkupBoard.module.scss'
import { BoardError, PositionBoardError } from './MarkupBoard.errors'
import MarkupBoardLine from './MarkupBoardLine'
import { MarkupBoardAddLine, MarkupBoardSetupLine } from './MarkupBoardAction'
import { DEFAULT_CSS_SIZE, EMPTY_CELL, initMarkup, MarkupOptions, toCssGrid, toMarkupGrid } from './MarkupBoard.tools'

export type MarkupBoardManager<T = any> = {
  resize: (height: string) => void
  clear: () => void
  addRow: (index?: number, size?: string) => void
  addColumn: (index?: number, size?: string) => void
  removeRow: (index: number) => void
  removeColumn: (index: number) => void
  resizeRow: (index: number, size: string) => void
  resizeColumn: (index: number, size: string) => void
  placeItem: (item: T) => void
  removeItem: (item: T) => void
  replaceItem: (from: T, to: T) => void
}

export type MarkupBoardProps<T = any> = {
  id?: string
  className?: string
  value?: MarkupOptions
  /** turn on view mode */
  view?: boolean
  /** uniq items which should be placed */
  items?: T[]
  /** get board manager */
  ref?: React.Ref<MarkupBoardManager<T>>
  /** item render function */
  widget?: (item: T) => React.ReactNode
  /** Uniq item key selector */
  toKey?: (item: T) => string
  /** return updated markup options */
  onChange?: (options: MarkupOptions) => void
  /** triggers when selection error appears  */
  onError?: (error: BoardError) => void
}

// TODO: fix docs
/**
 * Allows to create board layout and place widgets.
 *
 * Grid examples:
 * - https://grid.layoutit.com/
 * - https://cssgrid-generator.netlify.app/
 *
 * @example
 * const items = [
 *   { id: 1 },
 *   { id: 2 },
 *   { id: 3 },
 * ]
 *
 * export default function App() {
 *   const [items, setItems] = useState(cards)
 *
 *   return (
 *     <MarkupBoard
 *       width={768}
 *       rows='1fr auto 100px'
 *       columns='1fr 1fr 1fr'
 *       gap='8px 4px'
 *       areas={`
 *        '1 . .'
 *        '. 2 .'
 *        '. . 3'
 *       `}
 *       select={items[0]}
 *       onError={(error: Error) => console.log('error', error)}
 *       onChange={(options: BoardOptions) => console.log('options', options)}
 *     />
 *   )
 * }
 */
export function MarkupBoard<T = any>(props: MarkupBoardProps<T>) {
  const {
    ref, id, view, items, value, widget,
    toKey = item => (item as object).toString(), onChange, onError, className, ...otherProps
  } = props
  const _className = cn(css.MarkupBoard, className)
  const [select, setSelect] = useState<T>()
  const startCellRef = useRef<{ row: number, column: number }>(null)
  const selectionRef = useRef<HTMLDivElement>(null)
  const grid = useMemo(() => value ?? initMarkup(0, 1, 1, 4), [value])
  const markup = useMemo(() => toMarkupGrid(grid), [grid])

  const isPlaceFree = useFunc((row1: number, column1: number, row2: number, column2: number) => {
    const area = matrix.selectArea(grid.areas, row1, column1, row2, column2)

    return matrix.every(area, item => item === EMPTY_CELL)
  })

  const updateSelection = useFunc((row: number, column: number) => {
    if (selectionRef.current && startCellRef.current) {
      const place = matrix.toCoordinate(startCellRef.current.row, startCellRef.current.column, row + 1, column + 1)
      const isFree = isPlaceFree(place.startRow, place.startCol, place.endRow, place.endCol)

      selectionRef.current.style.display = 'block'
      selectionRef.current.style.background = isFree ? 'var(--color--secondary-6)' : 'var(--color--error-6)'
      selectionRef.current.style.gridArea = `${place.startRow}/${place.startCol}/${place.endRow}/${place.endCol}`
    }
  })

  const startSelection = useFunc((row: number, column: number) => {
    startCellRef.current = { row, column }
    updateSelection(row, column)
  })

  const endSelection = useFunc((row?: number, column?: number) => {
    const start = startCellRef.current

    // reset selection
    if (selectionRef.current) {
      selectionRef.current.style.display = 'none'
      selectionRef.current.style.background = 'none'
      selectionRef.current.style.gridArea = 'auto'
    }
    startCellRef.current = null

    if (!row || !column || !select || !start) {
      return
    }

    // check selected place
    if (!isPlaceFree(start.row, start.column, row, column)) {
      return onError?.(new PositionBoardError())
    }

    // change markup
    const areas = matrix.replace(grid.areas, toKey(select), EMPTY_CELL)
    change({
      areas: matrix.replaceArea(areas, start.row, start.column, row, column, toKey(select)),
    })
  })

  const toGridIndex = useFunc((index: number) => Math.floor(index / 2))
  const isGap = useFunc((index: number, length: number) => index !== 0 && index !== length - 1 && index % 2 === 0)
  const isBorder = useFunc((index: number, span: number) => index === 0 || index === span - 1)
  const isCorner = useFunc((row: number, column: number) => isBorder(row, markup.rows.length) && isBorder(column, markup.columns.length))
  const toUniqKey = useFunc((prefix: number, postfix: number | string) => `${prefix}:${postfix}`)

  const change = useFunc((options: Partial<MarkupOptions>) => onChange?.({ ...grid, ...options }))

  // board
  const resize = useFunc((height: string) => change({ height }))

  /** Remove all widgets from areas */
  const clear = useFunc(() => change({
    areas: matrix.initMatrix(grid.rows.length, grid.columns.length, () => EMPTY_CELL),
  }))

  // extend board
  const addRow = useFunc((index = grid.rows.length, size = DEFAULT_CSS_SIZE) => change({
    rows: arr.insert(grid.rows, toGridIndex(index), size),
    areas: matrix.extendRows(grid.areas, toGridIndex(index) - 1, EMPTY_CELL),
  }))
  const addColumn = useFunc((index = grid.columns.length, size = DEFAULT_CSS_SIZE) => change({
    columns: arr.insert(grid.columns, toGridIndex(index), size),
    areas: matrix.extendColumns(grid.areas, toGridIndex(index) - 1, EMPTY_CELL),
  }))

  // reduce board
  const removeRow = useFunc((index: number) => change({
    rows: arr.remove(grid.rows, toGridIndex(index)),
    areas: matrix.removeRow(grid.areas, toGridIndex(index)),
  }))
  const removeColumn = useFunc((index: number) => change({
    columns: arr.remove(grid.columns, toGridIndex(index)),
    areas: matrix.removeColumn(grid.areas, toGridIndex(index)),
  }))

  // lines
  const resizeRow = useFunc((index: number, size: string) => change({
    rows: arr.replace(grid.rows, toGridIndex(index), size),
  }))
  const resizeColumn = useFunc((index: number, size: string) => change({
    columns: arr.replace(grid.columns, toGridIndex(index), size),
  }))

  // items
  const placeItem = useFunc((item: T) => setSelect(item))
  const removeItem = useFunc((item: T) => change({
    areas: matrix.replace(grid.areas, toKey(item), EMPTY_CELL),
  }))
  const replaceItem = useFunc((from: T, to: T) => change({
    areas: matrix.replace(grid.areas, toKey(from), toKey(to)),
  }))

  // subscribe on outside click
  useEvent('mouseup', () => endSelection(), { disable: !view })

  useImperativeHandle(ref, () => ({
    resize, clear,
    addRow, addColumn,
    removeRow, removeColumn,
    resizeRow, resizeColumn,
    placeItem, removeItem, replaceItem,
  }), [
    addColumn, addRow, clear, placeItem, removeColumn, removeItem, removeRow,
    replaceItem, resize, resizeColumn, resizeRow,
  ])

  if (!value) {
    return
  }

  return (
    <div id={id} className={_className} style={toCssGrid(markup)} {...otherProps}>
      {/* lines */}
      {!view && markup.rows.map((size, idx) => <MarkupBoardLine key={toUniqKey(idx, size)} v='row' index={idx} span={markup.columns.length} />)}
      {!view && markup.columns.map((size, idx) => <MarkupBoardLine key={toUniqKey(idx, size)} v='column' index={idx} span={markup.rows.length} />)}

      {!view && markup.columns.map((_, column) =>
        markup.rows.map((_, row) => {
          const key = toUniqKey(row, column)
          const area = `${row + 1}/${column + 1}`
          const isGapLine = isGap(row, markup.rows.length) || isGap(column, markup.columns.length)
          const isColumnBorder = isBorder(column, markup.columns.length)
          const isRowBorder = isBorder(row, markup.rows.length)

          // actions
          if (isColumnBorder || isRowBorder) {
            if (isGapLine || isCorner(row, column)) {
              // TODO: Forbid to remove last row and column
              return <MarkupBoardAddLine key={key} row={row} column={column} area={area} onColumnAdd={addColumn} onRowAdd={addRow} />
            } else if (isColumnBorder) {
              return <MarkupBoardSetupLine size={markup.rows[row]} key={key} row={row} area={area} onSave={resizeRow} onRemove={removeRow} />
            } else if (isRowBorder) {
              return <MarkupBoardSetupLine size={markup.columns[column]} key={key} column={column} area={area} onSave={resizeColumn} onRemove={removeColumn} />
            }
          }

          if (isGapLine || !select) {
            return
          }

          // cells
          return (
            <Item
              key={key}
              area={area}
              onMouseDown={() => startSelection(row, column)}
              onMouseUp={() => endSelection(row, column)}
              onMouseEnter={() => updateSelection(row, column)}
            />
          )
        }),
      )}

      {/* selected area */}
      {select && <Item ref={selectionRef} display='none' />}

      {/* TODO: use MarkupView here */}
      {/* widgets */}
      {widget && items?.map(item =>
        <Item className={css.Item} key={toKey(item)} area={toKey(item)} data-highlight={item === select}>
          {widget(item)}
        </Item>,
      )}
    </div>
  )
}

MarkupBoard.displayName = 'MarkupBoard'

export default MarkupBoard
