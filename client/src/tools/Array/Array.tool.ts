import nil from 'tools/Nil'

/** create array without false values */
export const initArray = (...args: unknown[]) => {
  return args.filter(Boolean)
}

/** convert value to array. */
export const toArray = (value: unknown | unknown[]) => {
  return Array.isArray(value) ? value : initArray(value)
}


export type SortOrder = 'asc' | 'desc'
export type SortSelector<T> = (item: T) => SortType
export type SortType = Date | boolean | number | string | null | undefined

/**
 * Sort items by selector.
 * `null` and `undefined` items stay in the end of the list.
 *
 * - asc - [1, 2, 3, null, undefined]
 * - desc - [3, 2, 1, null, undefined]
 */
export const sort = <T>(
  arr: T[],
  order: SortOrder = 'asc',
  selector: SortSelector<T> = (value) => value as SortType,
) => {
  const multiplier = order === 'desc' ? 1 : -1

  return arr.toSorted((a, b) => {
    const valueA = selector(a)
    const valueB = selector(b)

    // nullable items should be in the end of the list
    if (nil.isNil(valueA) && nil.isNil(valueB)) {
      return 0
    } else if (nil.isNil(valueA)) {
      return 1
    } else if (nil.isNil(valueB)) {
      return -1
    } else if (valueA > valueB) {
      return -1 * multiplier
    } else if (valueA < valueB) {
      return 1 * multiplier
    }

    return 0
  })
}

/** Create array with x items by callback */
export const repeat = <T>(times: number, cb: (index: number) => T) => Array.from(Array(times).keys()).map(cb)

export default {
  initArray,
  toArray,
  repeat,
  sort,
}
