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
import { DEFAULT_CSS_SIZE, EMPTY_CELL, initMarkup, MarkupOptions, toArea, toCssGrid, toMarkupGrid } from './MarkupBoard.tools'

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
  const markup = useMemo(() => value ?? initMarkup(0, 1, 1, 4), [value])
  const grid = useMemo(() => toMarkupGrid(markup), [markup])

  // TODO: CREATE CONTEXT MANAGER OF MARKUP
  // TODO: getLine(row, index)
  //TODO: combine extend and reduce by row and columns extend(matrix, targetColumns: 5)
  // TODO: use context
  // TODO:  minimum one row and column
  // TODO: blocks: [{ name: 'Section', key: 'SECTION', as: Section[pass via children], actions:[link, nav, buttonGroup] }]

  const isPlaceFree = useFunc((row1: number, column1: number, row2: number, column2: number) => {
    const area = matrix.selectArea(markup.areas, row1, column1, row2, column2)

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
    const areas = matrix.replace(markup.areas, toKey(select), EMPTY_CELL)
    change({
      areas: matrix.replaceArea(areas, start.row, start.column, row, column, toKey(select)),
    })
  })

  const toGridIndex = useFunc((index: number) => Math.floor(index / 2))
  const isGap = useFunc((index: number, length: number) => index !== 0 && index !== length - 1 && index % 2 === 0)
  const isBorder = useFunc((index: number, span: number) => index === 0 || index === span - 1)
  const isCorner = useFunc((row: number, column: number) => isBorder(row, grid.rows.length) && isBorder(column, grid.columns.length))
  const toUniqKey = useFunc((prefix: number, postfix: number | string) => `${prefix}:${postfix}`)

  const change = useFunc((options: Partial<MarkupOptions>) => onChange?.({ ...markup, ...options }))

  // board
  const resize = useFunc((height: string) => change({ height }))

  /** Remove all widgets from areas */
  const clear = useFunc(() => change({
    areas: matrix.initMatrix(markup.rows.length, markup.columns.length, () => EMPTY_CELL),
  }))

  // extend board
  const addRow = useFunc((index = markup.rows.length, size = DEFAULT_CSS_SIZE) => change({
    rows: arr.insert(markup.rows, toGridIndex(index), size),
    areas: matrix.extendRows(markup.areas, toGridIndex(index) - 1, EMPTY_CELL),
  }))
  const addColumn = useFunc((index = markup.columns.length, size = DEFAULT_CSS_SIZE) => change({
    columns: arr.insert(markup.columns, toGridIndex(index), size),
    areas: matrix.extendColumns(markup.areas, toGridIndex(index) - 1, EMPTY_CELL),
  }))

  // reduce board
  const removeRow = useFunc((index: number) => change({
    rows: arr.remove(markup.rows, toGridIndex(index)),
    areas: matrix.removeRow(markup.areas, toGridIndex(index)),
  }))
  const removeColumn = useFunc((index: number) => change({
    columns: arr.remove(markup.columns, toGridIndex(index)),
    areas: matrix.removeColumn(markup.areas, toGridIndex(index)),
  }))

  // lines
  const resizeRow = useFunc((index: number, size: string) => change({
    rows: arr.replace(markup.rows, toGridIndex(index), size),
  }))
  const resizeColumn = useFunc((index: number, size: string) => change({
    columns: arr.replace(markup.columns, toGridIndex(index), size),
  }))

  // items
  const placeItem = useFunc((item: T) => setSelect(item))
  const removeItem = useFunc((item: T) => change({
    areas: matrix.replace(markup.areas, toKey(item), EMPTY_CELL),
  }))
  const replaceItem = useFunc((from: T, to: T) => change({
    areas: matrix.replace(markup.areas, toKey(from), toKey(to)),
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
    <div id={id} className={_className} style={toCssGrid(grid)} {...otherProps}>
      {/* lines */}
      {!view && grid.rows.map((size, idx) => <MarkupBoardLine key={toUniqKey(idx, size)} v='row' index={idx} span={grid.columns.length} />)}
      {!view && grid.columns.map((size, idx) => <MarkupBoardLine key={toUniqKey(idx, size)} v='column' index={idx} span={grid.rows.length} />)}

      {!view && grid.columns.map((_, column) =>
        grid.rows.map((_, row) => {
          const key = toUniqKey(row, column)
          const area = toArea(row, column)
          const isGapLine = isGap(row, grid.rows.length) || isGap(column, grid.columns.length)
          const isColumnBorder = isBorder(column, grid.columns.length)
          const isRowBorder = isBorder(row, grid.rows.length)

          // actions
          if (isColumnBorder || isRowBorder) {
            if (isGapLine || isCorner(row, column)) {
              // TODO: Forbid to remove last row and column
              return <MarkupBoardAddLine key={key} row={row} column={column} area={area} onColumnAdd={addColumn} onRowAdd={addRow} />
            } else if (isColumnBorder) {
              return <MarkupBoardSetupLine size={grid.rows[row]} key={key} row={row} area={area} onSave={resizeRow} onRemove={removeRow} />
            } else if (isRowBorder) {
              return <MarkupBoardSetupLine size={grid.columns[column]} key={key} column={column} area={area} onSave={resizeColumn} onRemove={removeColumn} />
            }
          }

          // TODO: add join items action: vertical-items, horizontal-items, squad, row, column, all, 1/4, 1/2
          // TODO: add block like section [name, actions] rename boards to markups
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

      {/* widgets */}
      {widget && items?.map(item => {
        const key = toKey(item)
        const place = grid.items[key]
        const area = toArea(place.startRow, place.startCol, place.endRow, place.endCol, 2)

        return (
          <Item className={cn(css.Item, item === select && css.Select)} key={key} area={area}>
            {widget(item)}
          </Item>
        )
      })}
    </div>
  )
}

MarkupBoard.displayName = 'MarkupBoard'

export default MarkupBoard
