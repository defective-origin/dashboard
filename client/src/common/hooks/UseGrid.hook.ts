import React, { useLayoutEffect, useMemo, useState } from 'react'

// ---| common |---
import { useResizeWithRef } from 'common/hooks'
import { placement } from 'common/tools/'

export type GridItem = {
  placement: placement.Square
}

export type GridCell = {
  width: number
  height: number
}

export const DEFAULT_CELL: GridCell = { width: 1, height: 1 }

export type GridConf = {
  // divide board into columns
  columns?: number
  // divide board into rows
  rows?: number
}

export type GridOptions<TRef> = {
  // divide board into columns
  columns?: number
  // divide board into rows
  rows?: number
  // ref for board in order to get width, height, cell
  ref: React.MutableRefObject<TRef | null>
  // width of board
  width?: number
  // height of board
  height?: number
  // sizes of cell
  cell: GridCell
}

// FIXME: recalculate coordinates of items if base changed
export function useGrid<TRef extends HTMLElement>(options: GridConf): GridOptions<TRef> {
  const { columns, rows } = options
  const { width, height, ref } = useResizeWithRef<HTMLElement>()
  const [cell, setCell] = useState<GridCell>(DEFAULT_CELL)

  // on board resizing
  useLayoutEffect(() => {
    if (width && height && columns && rows) {
      setCell({
        width: width / columns,
        height: height / rows,
      })
    }
  }, [width, height, columns, rows])

  return useMemo(() => ({
    ref,
    width,
    height,
    cell,
    columns,
    rows,
  }) as GridOptions<TRef>, [ref, width, height, cell, columns, rows])
}

export default useGrid
