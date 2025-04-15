import nil from 'tools/Nil'

/** create array without false values */
export const initArray = (...args: unknown[]) => {
  return args.filter(Boolean)
}

/** convert value to array. */
export const toArray = (value: unknown | unknown[]) => {
  return Array.isArray(value) ? value : initArray(value)
}

export const toString = <T = any>(arr: T[], sep = ', ') => {
  return arr.join(sep)
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
  arr?: T[],
  order: SortOrder = 'asc',
  selector: SortSelector<T> = value => value as SortType,
) => {
  const multiplier = order === 'desc' ? 1 : -1

  return arr?.toSorted((a, b) => {
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

/** Iterate by array */
export const map = <T>(items: T[], cb: (item: T, index: number) => T) => items.map(cb)

/** Create array clone */
export const clone = <T>(items: T[]) => [...items]


/** Add item around between array item  */
export const between = <T>(items: T[], what: T): T[] => {
  const result = []
  for (let i = 0; i < items.length; i++) {
    if (items.length === i + 1) {
      result.push(items[i])
    } else {
      result.push(items[i], what)
    }
  }

  return result
}


/** Insert item by index  */
export const insert = <T>(items: T[], index: number, what: T): T[] => {
  return items.toSpliced(index, 0, what)
}

/** Replace item by index  */
export const replace = <T>(items: T[], index: number, what: T): T[] => {
  items[index] = what
  return clone(items)
}

/** Remove item by index  */
export const remove = <T>(items: T[], index: number): T[] => {
  return items.toSpliced(index, 1)
}

/** find nearest element by number */
export const nearest = <T>(items: T[] = [], what: number, selector: (item: T) => number) => {
  return items.reduce((previous, current) => {
    const prev = Math.abs(selector(previous) - what)
    const curr = Math.abs(selector(current) - what)

    return curr < prev ? current : previous
  })
}

export default {
  initArray,
  toString,
  toArray,
  between,
  remove,
  repeat,
  insert,
  nearest,
  sort,
}
