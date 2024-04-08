import { useCallback, useMemo, useState } from 'react'
import useBreakpoint, { Breakpoint, BreakpointOptions, BreakpointReturnOptions } from '../UseBreakpoint'

export type MoreBreakpoint = Breakpoint & {
  /** Count of elements for current breakpoints. */
  count: number
}

export type MoreBreakpointOptions<E extends Element> = BreakpointOptions<E> & {
  /**
   * Exclude last item if 'allItems.length > breakpoint.count'.
   * It can be helpful when you need to add 'More' dropdown button to list.
   */
  excludeLast?: boolean
}

export type MoreBreakpointReturnOptions<T, E extends Element, B extends Breakpoint> = BreakpointReturnOptions<E, B> & {
  items: T[]
  remainingItems: T[]
  more: () => void
  less: () => void
}

/**
 * Detect container size breakpoint.
 * Allows to work with items which is not displayed.
 * By default observe document.body size.
 *
 * @example
 * // screen size
 * export class MenuMoreBreakpoint implements MoreBreakpoint {
 *   constructor(
 *     public size = Number.MAX_SAFE_INTEGER,
 *     public count = Number.MAX_SAFE_INTEGER,
 *   ) { }
 * }
 *
 * export const MENU_MORE_BREAKPOINTS = [
 *   new MenuMoreBreakpoint(100, 1),
 *   new MenuMoreBreakpoint(200, 2),
 *   new MenuMoreBreakpoint(400, 3),
 *   new MenuMoreBreakpoint(),
 * ]
 *
 * const options = useMoreBreakpoint(MENU_MORE_BREAKPOINTS)
 *
 * <div ref={options.ref}>{some render of options.items}</div>
 * <DropdownMenu content='More' items={options.remainingItems} />
 * {options.remainingItems.length && <button onClick={options.more}>Show More</button>}
 * {!!options.remainingItems.length && <button onClick={options.less}>Show Less</button>}
 *
 * // Observe vertical size with known element ref
 * const options = useMoreBreakpoint(MENU_MORE_BREAKPOINTS, { direction: 'y', ref: elementRef })
 */
export const useMoreBreakpoint = <T, E extends Element, B extends MoreBreakpoint>(
  allItems: T[],
  breakpoints: B[],
  options?: MoreBreakpointOptions<E>,
): MoreBreakpointReturnOptions<T, E, B> => {
  const breakpoint = useBreakpoint(breakpoints, options)
  const [showAllItems, setShowAllItems] = useState(false)
  const count = useMemo(() => {
    if (showAllItems) {
      return allItems.length
    }

    if (options?.excludeLast && allItems.length > breakpoint.count) {
      return breakpoint.count - 1
    }

    return breakpoint.count
  }, [allItems.length, breakpoint.count, options?.excludeLast, showAllItems])
  const items = useMemo(() => allItems.slice(0, count), [allItems, count])
  const remainingItems = useMemo(() => allItems.slice(count), [allItems, count])

  const more = useCallback(() => { setShowAllItems(true) }, [])
  const less = useCallback(() => { setShowAllItems(false) }, [])

  return useMemo(
    () => ({ ...breakpoint, items, remainingItems, more, less }),
    [breakpoint, items, remainingItems, more, less],
  )
}

export default useMoreBreakpoint
