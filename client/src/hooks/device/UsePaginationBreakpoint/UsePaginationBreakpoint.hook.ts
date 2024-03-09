import { useCallback, useMemo, useState } from 'react'
import { Breakpoint, BreakpointOptions, BreakpointReturnOptions, useBreakpoint } from '../UseBreakpoint'

export type PaginationBreakpoint = Breakpoint & {
  /** Count of elements for current breakpoints. */
  count: number
}

export type PaginationBreakpointOptions<E extends HTMLElement> = BreakpointOptions<E>

export type PaginationBreakpointReturnOptions<T, E extends HTMLElement, B extends Breakpoint> = BreakpointReturnOptions<E, B> & {
  items: T[]
  page: number
  pages: number,
  hasPrevPage: boolean
  hasNextPage: boolean
  toPrev: () => void
  toNext: () => void
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
 * const options = usePaginationBreakpoint(GRID_BREAKPOINTS)
 * <div ref={options.ref}>{some render of options.items}</div>
 * {options.hasPrevPage && <button onClick={options.toPrev}>Prev</button>}
 * {options.hasNextPage && <button onClick={options.toNext}>Next</button>}
 *
 * // Observe vertical size with known element ref
 * const options = usePaginationBreakpoint(GRID_BREAKPOINTS, { direction: 'y', ref: elementRef })
 */
export const usePaginationBreakpoint = <T, E extends HTMLElement, B extends PaginationBreakpoint>(
  allItems: T[],
  breakpoints: B[],
  options?: PaginationBreakpointOptions<E>,
): PaginationBreakpointReturnOptions<T, E, B> => {
  const breakpoint = useBreakpoint(breakpoints, options)
  const [page, setPage] = useState(1)
  const pages = Math.ceil(allItems.length / breakpoint.count)
  const hasPrevPage = page !== 1
  const hasNextPage = page !== pages
  const items = useMemo(() => {
    const start = page * breakpoint.count
    const end = start + breakpoint.count

    return allItems.slice(start, end)
  }, [allItems, breakpoint.count, page])

  const toPrev = useCallback(() => { hasPrevPage && setPage(page - 1) }, [hasPrevPage, page])
  const toNext = useCallback(() => { hasNextPage && setPage(page + 1) }, [hasNextPage, page])

  return useMemo(
    () => ({ ...breakpoint, items, page, pages, hasPrevPage, hasNextPage, toPrev, toNext }),
    [breakpoint, items, page, pages, hasPrevPage, hasNextPage, toPrev, toNext],
  )
}

export default usePaginationBreakpoint
