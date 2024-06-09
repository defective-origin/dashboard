import { isNil } from 'tools/Nil'

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
 * */
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
    if (isNil(valueA) && isNil(valueB)) {
      return 0
    } else if (isNil(valueA)) {
      return 1
    } else if (isNil(valueB)) {
      return -1
    } else if (valueA > valueB) {
      return -1 * multiplier
    } else if (valueA < valueB) {
      return 1 * multiplier
    }

    return 0
  })
}

export default {
  initArray,
  toArray,
  sort,
}
