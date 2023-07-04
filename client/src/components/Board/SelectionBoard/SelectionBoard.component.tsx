import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react'

// ---| common |---
import { cn, _, placement, canvas } from 'common/tools'
import { GridConf, GridItem, useGrid, useCanvas2D, Canvas2DPainterOptions } from 'common/hooks'
import { react } from 'common/tools'

// ---| self |---
import { BoardError, PositionBoardError } from './SelectionBoard.error'
import { DEFAULT_STYLES, SelectionBoardStyles } from './SelectionBoard.conf'
import css from './SelectionBoard.module.scss'

export type SelectionBoardItem = GridItem

export type SelectionBoardProps = react.GeneralProps & GridConf & {
  // set margin around each widget
  gap?: number
  // items which displays on board
  items?: SelectionBoardItem[]
  // allow to select area which has intersection with other cards
  overlap?: boolean
  // allow to select area and highligh old position
  reselect?: SelectionBoardItem
  // styles for grid lines, items, selected area
  styles?: SelectionBoardStyles
  // triggers on select new area
  onSelect?: (position: placement.Square) => void
  // triggers on reselect area for reselect item
  onReselect?: (newItem: SelectionBoardItem, oldItem: SelectionBoardItem) => void
  // triggers when there is a problem with selected area
  onError?: (error: BoardError) => void
}

/**
 * Board which allow to select new position for widgets and also view them.
 * @example
 * export const styles: Required<SelectionBoardStyles> = {
 *   card: {
 *     radius: 2
 *     invalid: {
 *       strokeStyle: 'red',
 *       fillStyle: 'red',
 *       lineWidth: 2,
 *     },
 *     valid: {
 *       strokeStyle: 'blue',
 *       fillStyle: 'blue',
 *       lineWidth: 2,
 *     },
 *     outdated: {
 *       strokeStyle: 'orange',
 *       fillStyle: 'orange',
 *       lineWidth: 2,
 *     },
 *   },
 *   grid: {
 *     strokeStyle: styles.gridLineColor,
 *     lineWidth: 1,
 *   },
 * }
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
 *       reselect={items[0]}
 *       items={items}
 *       styles={styles}
 *       select
 *       overlap
 *       onSelect={handleSelect}
 *       onReselect={handleReselect}
 *       onError={handleError}
 *     />
 *   )
 * }
 */
export default function SelectionBoard(props: SelectionBoardProps): JSX.Element {
  const {
    className,
    columns,
    rows,
    gap = 0,
    items = [],
    reselect,
    styles = DEFAULT_STYLES,
    overlap,
    style,
    onSelect,
    onReselect,
    onError,
  } = props
  const { ref: boardRef, cell, width, height } = useGrid<HTMLCanvasElement>({ columns, rows })
  const [startCell, setStartCell] = useState<placement.Square | null>(null)
  const [hoveredCell, setHoveredCell] = useState<placement.Square | null>(null)
  const [isIntersected, setIsIntersected] = useState(false)
  const boardStyles = useMemo(() => _.merge(DEFAULT_STYLES, styles), [styles])

  const isPlacementForbidden = useCallback((item: placement.Square | null) => items.some((i) => {
    // don't check item which should be reselected
    // or we can overlap other items
    if (overlap || !item || i === reselect) {
      return false
    }

    // check intersections
    return placement.crossSquare(i.placement, item)
  }), [items, reselect, overlap])

  const getHoveredCell = useCallback((e: React.MouseEvent): placement.Square => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
    const cellSize = 1
    const x = Math.trunc((e.clientX - rect.left) / cell.width)
    const y = Math.trunc((e.clientY - rect.top) / cell.height)

    return placement.square(x, y, x + cellSize, y + cellSize)
  }, [cell])

  const getSelectedArea = useCallback((): placement.Square | null =>
    startCell && hoveredCell && placement.outerBox([startCell, hoveredCell])
  , [startCell, hoveredCell])

  const hideContextMenu = useCallback((e: React.MouseEvent) => e.preventDefault(), [])

  // --- selection ---
  const resetSelection = useCallback(() => setStartCell(null), [])

  const startSelection = useCallback((e: React.MouseEvent) => {
    if (!isIntersected) {
      setStartCell(getHoveredCell(e))
    }
  }, [isIntersected, getHoveredCell])

  const updateSelection = useCallback((e: React.MouseEvent) => {
    const currentCell = getHoveredCell(e)
    const isCellChanged = !hoveredCell || !placement.equalSquare(currentCell, hoveredCell)

    // update only if cell was changed
    if (isCellChanged) {
      setHoveredCell(currentCell)
    }
  }, [hoveredCell, getHoveredCell])

  const endSelection = useCallback((e: React.MouseEvent) => {
    const placement = getSelectedArea()

    // if cursor is over free area and area is valid
    if (placement && !isIntersected) {
      // complete reselection
      if (onReselect && reselect) {
        onReselect({ ...reselect, placement }, reselect)

      // complete selection
      } else if (onSelect) {
        onSelect(placement)
      }

    // if area is intersected with other areas
    } else if (placement && onError) {
      onError(new PositionBoardError())
    }

    setStartCell(null)
  }, [isIntersected, reselect, getSelectedArea, onSelect, onReselect, onError])

  // update operation status
  useLayoutEffect(() => {
    const isInvalid = isPlacementForbidden(getSelectedArea() || hoveredCell)

    if (boardRef.current) {
      boardRef.current.style.cursor = isInvalid ? css.invalidCursor : css.validCursor
    }

    setIsIntersected(isInvalid)
  }, [boardRef.current, hoveredCell, isPlacementForbidden, getSelectedArea])

  // --- painting ---
  const buildAreaOptions = useCallback((item: placement.Square): canvas.SquareShapeOptions => {
    const cardMargin = gap / 2

    return {
      ...placement.square(
        item.v1.x * cell.width + cardMargin,
        item.v1.y * cell.height + cardMargin,
        item.v2.x * cell.width - cardMargin,
        item.v2.y * cell.height - cardMargin,
      ),
      radius: boardStyles.card.radius
    }
  }, [cell, gap, boardStyles.card.radius])

  const paintGrid = useCallback((options: Canvas2DPainterOptions) => {
    const area = placement.square(0, 0, options.context.canvas.width, options.context.canvas.height)

    options.paintGrid({ rows, columns, ...area },  boardStyles.grid)
  }, [columns, rows, boardStyles])

  const paintCard = useCallback((options: Canvas2DPainterOptions, item: placement.Square | null, styles?: canvas.ShapeStyleOptions) => {
    if (item) {
      options.paintCard(buildAreaOptions(item),  styles)
    }
  }, [buildAreaOptions])

  const paintCards = useCallback((options: Canvas2DPainterOptions) => {
    items.forEach((item) => {
      paintCard(
        options,
        item.placement,
        reselect === item ? boardStyles.card.outdated : boardStyles.card.invalid,
      )
    })
  }, [items, reselect, boardStyles, paintCard])

  const paintSelectedArea = useCallback((options: Canvas2DPainterOptions) => {
    paintCard(
      options,
      getSelectedArea(),
      isIntersected ? boardStyles.card.invalid : boardStyles.card.valid
    )
  }, [isIntersected, boardStyles, paintCard, getSelectedArea])

  const painter = useCallback((options: Canvas2DPainterOptions) => {
    paintGrid(options)
    paintCards(options)
    paintSelectedArea(options)
  }, [paintGrid, paintCards, paintSelectedArea])


  useCanvas2D(boardRef, { painter }, [painter])

  return (
    <canvas
      ref={boardRef}
      className={cn(css.SelectionBoard, className)}
      style={style}
      width={width}
      height={height}
      onMouseUp={endSelection}
      onMouseDown={startSelection}
      onMouseMove={updateSelection}
      onMouseLeave={resetSelection}
      onContextMenu={hideContextMenu}
    />
  )
}
