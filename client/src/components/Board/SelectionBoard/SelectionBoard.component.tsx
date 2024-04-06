import React, { useCallback, useEffect } from 'react'

// ---| core |---
import { cn, xy } from 'tools'
import { useProperties } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './SelectionBoard.module.scss'
import { GridShape, ShapeColor, SquareShape, grid, square } from './SelectionBoard.tool'
import useSelection, { SelectionOptions } from './SelectionBoard.hook'

export type SelectionBoardProps<I extends Record<string, unknown>> = SelectionOptions<I> & {
  className?: string
  /** set margin around each widget */
  gap?: number
  /** Canvas width in pixels */
  width?: number
  /** Canvas height in pixels */
  height?: number
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
  const { width, height, gap = 0, className, ...selectionOptions } = props
  const { ref, places, rows, columns, cell, isIntersected, selectedArea, select } = useSelection(selectionOptions)
  const _className = cn(css.SelectionBoard, {
    [css.ForbiddenSelect]: isIntersected,
  }, className)
  const margin = gap / 2
  const colors = useProperties({
    primary: '--canvas-primary-color',
    secondary: '--canvas-secondary-color',
    success: '--canvas-success-color',
    info: '--canvas-info-color',
    warning: '--canvas-warning-color',
    error: '--canvas-error-color',
    disable: '--canvas-disable-color',
  })

  const hideContextMenu = useCallback((e: React.MouseEvent) => e.preventDefault(), [])

  // --- painting ---
  const card = useCallback((area: xy.Square, color: ShapeColor): SquareShape => ({
    color,
    ...xy.square(
      area.v1.x * cell.x + margin,
      area.v1.y * cell.y + margin,
      area.v2.x * cell.x - margin,
      area.v2.y * cell.y - margin,
    ),
  }), [margin, cell.y, cell.x])

  // paint markup and cards
  useEffect(() => {
    const context = ref.current?.getContext('2d')

    if (!context) {
      return
    }

    // paint board markup
    const board = { rows, columns, cell, color: 'primary' } as GridShape
    grid(context, board, colors)

    // paint cards
    places
      .map((place) => card(place, select === place ? 'info' : 'secondary'))
      .forEach((place) => square(context, place, colors))

    if (selectedArea) {
      const selected = card(selectedArea, isIntersected ? 'warning' : 'success')
      square(context, selected, colors)
    }

    // clear board
    return () => context.clearRect(0, 0, context.canvas.offsetWidth, context.canvas.offsetHeight)
  }, [rows, columns, places, colors, cell, ref, selectedArea, select, isIntersected, card])

  return <canvas ref={ref} className={_className} onContextMenu={hideContextMenu} width={width} height={height} />
}

SelectionBoard.displayName = 'SelectionBoard'

export default SelectionBoard
