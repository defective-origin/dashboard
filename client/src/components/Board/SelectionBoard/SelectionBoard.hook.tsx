import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react'

// ---| common |---
import { xy } from 'common/tools'

// ---| self |---
import { BoardError, PositionBoardError } from './SelectionBoard.error'

export type UseSelectionOptions<I extends Record<string, unknown>> = {
  /** Items to show */
  items?: I[]
  /** Size of cell */
  cell?: xy.Vector
  /** Quantity of rows */
  rows?: number // TODO: grid: 'infinity' | 'xs' | 'md' ... | mobile | board | tv ...
  /** Quantity of columns */
  columns?: number
  /** allow to select area which has intersection with other cards */
  overlap?: boolean
  /** allow to select area and highligh old position */
  select?: I
  /** Place selector */
  placeKey?: string,
  /** triggers on select new area */
  onSelect?: (area: xy.Square) => void
  /** triggers on reselect area for reselect item */
  onReselect?: (newArea: I, oldArea: I) => void
  /** triggers when there is a problem with selected area */
  onError?: (error: BoardError) => void
}

export type UseSelectionReturnOptions = {
  ref: React.MutableRefObject<HTMLCanvasElement | null>
  cell: xy.Vector
  places: xy.Square[]
  rows?: number
  columns?: number
  selectedArea: xy.Square | null,
  isIntersected: boolean
  select?: xy.Square
}


export function useSelection<I extends Record<string, unknown>>(props: UseSelectionOptions<I>): UseSelectionReturnOptions {
  const {
    cell = xy.vector(1, 1),
    items = [],
    select,
    overlap,
    columns,
    rows,
    placeKey = '',
    onSelect,
    onReselect,
    onError,
  } = props
  const ref = useRef<HTMLCanvasElement>(null)
  const [startCell, setStartCell] = useState<xy.Square | null>(null)
  const [hoveredCell, setHoveredCell] = useState<xy.Square | null>(null)
  const [selectedArea, setSelectedArea] = useState<xy.Square | null>(null)
  const [isIntersected, setIsIntersected] = useState(false)
  const places = useMemo(() => items.map((item) => item[placeKey] ?? item), [items, placeKey]) as xy.Square[]
  const reselectPlace = (select && select[placeKey]) as xy.Square

  const checkPlace = useCallback((item: xy.Square | null) => places.some((i) => {
    // don't check item which should be reselected
    // or we can overlap other items
    const isOperationAllowed = !item || overlap || i === reselectPlace

    setIsIntersected(!isOperationAllowed && xy.crossSquare(i, item))
  }), [places, reselectPlace, overlap])

  const getHoveredCell = useCallback((e: MouseEvent): xy.Square => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
    const cellSize = 1
    const x = Math.trunc((e.clientX - rect.left) / cell.x)
    const y = Math.trunc((e.clientY - rect.top) / cell.y)

    return xy.square(x, y, x + cellSize, y + cellSize)
  }, [cell])

  const getSelectedArea = useCallback((endCell: xy.Square): xy.Square | null => {
    return startCell && xy.outerBox([startCell, endCell])
  }, [startCell])

  const isCellChanged = useCallback((newCell: xy.Square): boolean => {
    return !hoveredCell || !xy.equalSquare(hoveredCell, newCell)
  }, [hoveredCell])

  // --- selection ---
  const resetSelection = useCallback(() => {
    setStartCell(null)
    setSelectedArea(null)
    checkPlace(hoveredCell)
  }, [checkPlace, hoveredCell])

  const startSelection = useCallback(() => {
    if (!isIntersected) {
      setStartCell(hoveredCell)
      setSelectedArea(hoveredCell)
    }
  }, [isIntersected, hoveredCell])

  const updateSelection = useCallback((e: MouseEvent) => {
    const currentCell = getHoveredCell(e)
    const isChanged = isCellChanged(currentCell)
    const selected = getSelectedArea(currentCell)

    // update only if cell was changed
    if (isChanged) {
      setHoveredCell(currentCell)
      setSelectedArea(selected)
      checkPlace(selected || currentCell)
    }
  }, [getHoveredCell, isCellChanged, getSelectedArea, checkPlace])

  const endSelection = useCallback(() => {
    // if cursor is over free area and area is valid
    if (selectedArea && !isIntersected) {
      // complete reselection
      if (onReselect && select) {
        const newItem: I = placeKey
          ? { ...select, [placeKey]: selectedArea }
          : { ...select, ...selectedArea }

        onReselect(newItem, select)

      // complete selection
      } else if (onSelect) {
        onSelect(selectedArea)
      }

    // if area is intersected with other areas
    } else if (selectedArea && onError) {
      onError(new PositionBoardError())
    }

    resetSelection()
  }, [selectedArea, isIntersected, select, placeKey, onError, resetSelection, onReselect, onSelect])


  // subscribe on changes
  useEffect(() => {
    const element = ref.current

    element?.addEventListener('mouseup', endSelection)
    element?.addEventListener('mousedown', startSelection)
    element?.addEventListener('mousemove', updateSelection)
    element?.addEventListener('mouseleave', resetSelection)

    return () => {
      element?.removeEventListener('mouseup', endSelection)
      element?.removeEventListener('mousedown', startSelection)
      element?.removeEventListener('mousemove', updateSelection)
      element?.removeEventListener('mouseleave', resetSelection)
    }
  }, [endSelection, resetSelection, startSelection, updateSelection])


  return useMemo(() => ({
    ref,
    cell,
    rows,
    places,
    columns,
    select: reselectPlace,
    isIntersected,
    selectedArea,
  }), [cell, rows, places, columns, reselectPlace, isIntersected, selectedArea])
}

export default useSelection
