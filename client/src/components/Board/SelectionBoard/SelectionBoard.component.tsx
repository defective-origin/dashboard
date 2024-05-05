import React, { useEffect, useMemo, useRef } from 'react'

// ---| core |---
import { cn, xy } from 'tools'
import { useFunc, useProperties, useResize } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './SelectionBoard.module.scss'
import { BoardError, PositionBoardError } from './SelectionBoard.error'
import { GridShape, ShapeColor, SquareShape, grid, square } from './SelectionBoard.tool'

export type SelectionBoardOptions = {
  hoveredCell: xy.Square;
  selectedArea: xy.Square | null;
  isSelectionAllowed: boolean;
}

export type SelectionBoardProps<I extends Record<string, unknown>> = {
  className?: string
  /** set margin around each widget */
  gap?: number
  /** Items to show */
  items?: I[] // TODO: grid: 'infinity' | 'xs' | 'md' ... | mobile | board | tv ...
  /** Quantity of rows */
  rows?: number
  /** Quantity of columns */
  columns?: number
  /** allow to select area which has intersection with other cards */
  overlap?: boolean
  /** allow to select area and highligh old position */
  select?: I
  /** Place selector */
  placeKey?: string,
  /** Space around board */
  padding?: number
  /** triggers on select new area */
  onSelect?: (area: xy.Square) => void
  /** triggers on reselect area for reselect item */
  onReselect?: (newArea: I, oldArea: I) => void
  /** triggers when there is a problem with selected area */
  onError?: (error: BoardError) => void
}

/**
 * Board which allow to select new position for widgets and also view them.
 * @example
 * const cards: BoardItem[] = [
 *   { text: 'text', placement: { v1: { x: 0, y: 0 }, v2: { x: 3, y: 3 } } },
 *   { text: 'text', placement: { v1: { x: 3, y: 3 }, v2: { x: 6, y: 6 } } },
 *   { text: 'text', placement: { v1: { x: 6, y: 6 }, v2: { x: 9, y: 9 } } },
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
 *     <SelectionBoard
 *       rows={9}
 *       columns={9}
 *       gap={10}
 *       select={items[0]}
 *       items={items}
 *       overlap
 *       onSelect={handleSelect}
 *       onReselect={handleReselect}
 *       onError={handleError}
 *     />
 *   )
 * }
 */
export function SelectionBoard<I extends Record<string, unknown>>(props: SelectionBoardProps<I>): JSX.Element {
  const {
    items,
    select,
    overlap,
    columns,
    rows,
    placeKey = '',
    padding = 0,
    gap = 0,
    className,
    onSelect,
    onReselect,
    onError,
  } = props
  const { width, height, ref } = useResize<HTMLCanvasElement>()
  const startCellRef = useRef<xy.Square | null>(null)
  const lastCellRef = useRef<xy.Square | null>(null)
  const places = useMemo(() => items?.map((item) => item[placeKey] ?? item), [items, placeKey]) as xy.Square[]
  const reselectPlace = (select && select[placeKey]) as xy.Square
  const margin = gap / 2
  const colors = useProperties({
    primary: '--canvas-primary-color',
    secondary: '--canvas-secondary-color',
    success: '--canvas-success-color',
    info: '--canvas-info-color',
    warning: '--canvas-warning-color',
    error: '--canvas-error-color',
  }) // FIXME: subscription on theme change

  const cell = useMemo<xy.Vector>(() => {
    if (!columns || !rows) {
      return xy.vector(1, 1)
    }

    const indent = padding * 2

    return xy.vector((width - indent) / columns, (height - indent) / rows)
  }, [columns, rows, padding, width, height])

  const updateCursor = useFunc((options?: SelectionBoardOptions) => {
    if (ref.current) {
      ref.current.style.cursor = options?.isSelectionAllowed ? 'pointer' : 'not-allowed'
    }
  })

  // --- painting ---
  const card = useFunc((area: xy.Square, color?: ShapeColor): SquareShape => ({
    color,
    ...xy.square(
      area.v1.x * cell.x + margin,
      area.v1.y * cell.y + margin,
      area.v2.x * cell.x - margin,
      area.v2.y * cell.y - margin,
    ),
    shift: padding,
  }))

  // paint markup and cards
  const paint = useFunc((e?: React.MouseEvent<HTMLCanvasElement>) => {
    const options = e && toSelectionOptions(e)
    const context = ref.current?.getContext('2d') // FIXME: get context only once

    if (!context) {
      return
    }

    // clear board
    context.clearRect(0, 0, context.canvas.offsetWidth, context.canvas.offsetHeight)

    // paint board markup
    const board = { rows, columns, cell, color: colors.primary, padding } as GridShape
    grid(context, board)

    // paint cards
    places
      .map((place) => card(place, reselectPlace === place ? colors.warning : colors.info))
      .forEach((place) => square(context, place))

    if (options && options.selectedArea) {
      const selected = card(options.selectedArea, options.isSelectionAllowed ? colors.success : colors.error)
      square(context, selected)
    }

    updateCursor(options)
  })

  const isPlaceValid = useFunc((area: xy.Square | null) => places.every((place) => {
    const isAreaCrossed = area && xy.crossSquare(place, area)
    const isCrossingAllowed = overlap || place === reselectPlace

    return !isAreaCrossed || isCrossingAllowed
  }))

  const toHoveredCell = useFunc((e: React.MouseEvent<HTMLCanvasElement>): xy.Square => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
    const cellSize = 1
    const x = Math.trunc((e.clientX - rect.left - padding) / cell.x)
    const y = Math.trunc((e.clientY - rect.top - padding) / cell.y)

    return xy.square(x, y, x + cellSize, y + cellSize)
  })

  const toSelectedArea = useFunc((endCell: xy.Square): xy.Square | null => {
    return startCellRef.current && xy.outerBox([startCellRef.current, endCell])
  })

  const isCellChanged = useFunc((cell: xy.Square): boolean => {
    return !lastCellRef.current || !xy.equalSquare(lastCellRef.current, cell)
  })

  const toSelectionOptions = useFunc((e: React.MouseEvent<HTMLCanvasElement>): SelectionBoardOptions => {
    const hoveredCell = toHoveredCell(e)
    const selectedArea = toSelectedArea(hoveredCell)
    const isSelectionAllowed = isPlaceValid(selectedArea || hoveredCell)

    return { hoveredCell, selectedArea, isSelectionAllowed }
  })

  // --- selection ---
  const hideContextMenu = useFunc((e: React.MouseEvent) => e.preventDefault())

  const resetSelection = useFunc((e: React.MouseEvent<HTMLCanvasElement>) => {
    startCellRef.current = null

    paint(e)
  })

  const startSelection = useFunc((e: React.MouseEvent<HTMLCanvasElement>) => {
    const options = toSelectionOptions(e)

    if (options.isSelectionAllowed) {
      lastCellRef.current = options.hoveredCell
      startCellRef.current = options.hoveredCell

      paint(e)
    }
  })

  const updateSelection = useFunc((e: React.MouseEvent<HTMLCanvasElement>) => {
    const hoveredCell = toHoveredCell(e)
    const isChanged = isCellChanged(hoveredCell)

    if (isChanged) {
      lastCellRef.current = hoveredCell

      paint(e)
    }
  })

  const endSelection = useFunc((e: React.MouseEvent<HTMLCanvasElement>) => {
    const options = toSelectionOptions(e)

    // if cursor is over free area and area is valid
    if (options.selectedArea && options.isSelectionAllowed) {
      // complete reselection
      if (onReselect && select) {
        const newItem: I = placeKey
          ? { ...select, [placeKey]: options.selectedArea }
          : { ...select, ...options.selectedArea }

        onReselect(newItem, select)

      // complete selection
      } else if (onSelect) {
        onSelect(options.selectedArea)
      }

    // if area is intersected with other areas
    } else if (options.selectedArea && onError) {
      onError(new PositionBoardError())
    }

    resetSelection(e)
  })

  useEffect(paint, [paint, width, height, items])

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      className={cn(css.SelectionBoard, className)}
      onMouseUp={endSelection}
      onMouseDown={startSelection}
      onMouseMove={updateSelection}
      onMouseLeave={resetSelection}
      onContextMenu={hideContextMenu}
    />
  )
}

SelectionBoard.displayName = 'SelectionBoard'

export default SelectionBoard
