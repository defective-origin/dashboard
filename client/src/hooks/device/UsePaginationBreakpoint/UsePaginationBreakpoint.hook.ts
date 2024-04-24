import { useMemo, useState } from 'react'
import useBreakpoint, { Breakpoint, BreakpointOptions, BreakpointReturnOptions } from '../UseBreakpoint'
import useFunc from '../../states/UseFunc'

export type PaginationBreakpoint = Breakpoint & {
  /** Count of elements for current breakpoints. */
  count: number
}

export type PaginationBreakpointOptions<E extends Element> = BreakpointOptions<E>

export type PaginationBreakpointReturnOptions<T, E extends Element, B extends Breakpoint> = BreakpointReturnOptions<E, B> & {
  items: T[]
  page: number
  pages: number,
  hasPrev: boolean
  hasNext: boolean
  prev: () => void
  next: () => void
}

/**
 * Detect container size breakpoint.
 * Allows to paginate by breakpoint items count.
 * By default observe document.body size.
 * This hook can be useful in sliders and charts.
 *
 * @example
 * // screen size
 * export class GridPaginationBreakpoint implements PaginationBreakpoint {
 *   constructor(
 *     public size = Number.MAX_SAFE_INTEGER,
 *     public count = Number.MAX_SAFE_INTEGER,
 *     public columns = 12,
 *   ) { }
 * }
 *
 * export const GRID_BREAKPOINTS = [
 *   new GridPaginationBreakpoint(100, 1, 1),
 *   new GridPaginationBreakpoint(200, 2, 2),
 *   new GridPaginationBreakpoint(400, 6, 3),
 *   new GridPaginationBreakpoint(),
 * ]
 *
 * const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * const options = usePaginationBreakpoint(items, GRID_BREAKPOINTS)
 * <div ref={options.ref}>{some render of options.items}</div>
 * {options.hasPrev && <button onClick={options.prev}>Prev</button>}
 * {options.hasNext && <button onClick={options.next}>Next</button>}
 *
 * // Observe vertical size with known element ref
 * const options = usePaginationBreakpoint(items, GRID_BREAKPOINTS, { direction: 'y', ref: elementRef, ...resizeObserverOptions })
 */
export const usePaginationBreakpoint = <T, E extends Element, B extends PaginationBreakpoint>(
  allItems: T[],
  breakpoints: B[],
  options?: PaginationBreakpointOptions<E>,
): PaginationBreakpointReturnOptions<T, E, B> => {
  const breakpoint = useBreakpoint(breakpoints, options)
  const [page, setPage] = useState(1)
  const pages = Math.ceil(allItems.length / breakpoint.count)
  const hasPrev = page !== 1
  const hasNext = page !== pages
  const items = useMemo(() => {
    const start = (page - 1) * breakpoint.count
    const end = start + breakpoint.count

    return allItems.slice(start, end)
  }, [allItems, breakpoint.count, page])

  const prev = useFunc(() => { hasPrev && setPage(page - 1) })
  const next = useFunc(() => { hasNext && setPage(page + 1) })

  return useMemo(
    () => ({ ...breakpoint, items, page, pages, hasPrev, hasNext, prev, next }),
    [breakpoint, items, page, pages, hasPrev, hasNext, prev, next],
  )
}

export default usePaginationBreakpoint
