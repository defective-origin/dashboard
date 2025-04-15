/* eslint-disable @typescript-eslint/no-explicit-any */

export type ValOrFunc<T, Args extends any[]> = T | ((...args: Args) => T);

/**
 * Returns value from function or value as is
 *
 * How to use
 * @example
 * type Prop = React.ReactNode | ((value1: number, value2: number) => React.ReactNode)
 * const prop: Prop = (val1, val2) => val1 + val2
 *
 * fromValOrFunc(prop, 1, 2)
 */
export function fromValOrFunc<T, Args extends any[]>(value?: ValOrFunc<T, Args>, ...args: Args): T {
  return typeof value === 'function' ? (value as (...args: Args) => T)(...args) : value as T
}


/**
 * Allows convert array into object with key and value
 *
 * How to use
 * @example
 * arrToObj([1, 2, 3], (item) => item)
 * arrToObj([{ field: 1 }, { field: 2 }], (item) => item.field)
 * arrToObj([{ field: 1 }, { field: 2 }], (item, idx) => [item.field, { ...item, index: idx }])
 */
export function arrToObj<T, K extends string | number, V = T>(
  arr: T[] | undefined,
  selector: (item: T, idx: number) => K | [K, V],
): Record<K, V> {
  return arr?.reduce((acc, item, idx) => {
    const selected = selector(item, idx)
    const [key, value] = Array.isArray(selected) ? selected : [selected, item]
    acc[key as K] = value as V

    return acc
  }, {} as Record<K, V>) ?? {} as Record<K, V>
}

export const isEmpty = (value: any): boolean => {
  if (value == null) {
    return true
  }

  if (typeof value === 'string') {
    return value.length === 0
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === 'object') {
    if (value instanceof Map || value instanceof Set) {
      return value.size === 0
    }

    return Object.keys(value).length === 0
  }

  return false
}

export default {
  isEmpty,
  arrToObj,
  fromValOrFunc,
}
