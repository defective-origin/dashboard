import * as num from '../Number'

const OBJECT_KEY_SEPARATOR = '.'

/** Performance optimization */
const OBJECT_KEY_MAP: Record<string, string[]> = {}

export type Obj = { [key: string]: any }

export const clone = <T extends object>(obj?: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

export const toKeys = (path?: string) => {
  return path ? OBJECT_KEY_MAP[path as string] ?? path?.split(OBJECT_KEY_SEPARATOR) : []
}

export const toPath = (keys?: string[]) => {
  return keys?.join(OBJECT_KEY_SEPARATOR) ?? ''
}

export const toObject = <T extends object>(target: T, ...args: T[]) => {
  return Object.assign(target, ...args)
}

export const isObject = (value: any): value is object => {
  return (typeof value === 'object' || typeof value === 'function') && (value !== null)
}

export const has = (obj: Obj, path?: string): boolean => {
  const keys = toKeys(path)
  let current = obj

  for (const key of keys) {
    if (!(key in current)) {
      return false
    }
    current = current[key]
  }

  return true
}

/** Return nested value by path or undefined if value is not exist */
export const get = (obj: Obj | undefined | null, path?: string): any => {
  if (!obj) {
    return obj
  }

  const keys = toKeys(path)
  let current = obj

  for (const key of keys) {
    if (key in current) {
      current = current[key]
    } else {
      return undefined
    }
  }

  return current
}

export const set = (obj: Obj | undefined | null, path: string, value: any): Obj | undefined | null => {
  if (!obj) {
    return obj
  }

  const keys = toKeys(path)
  let current = obj

  for (const [index, key] of keys.entries()) {
    if (index + 1 !== keys.length) {
      if (!current[key]) {
        current[key] = num.isNumber(keys[index + 1]) ? [] : {}
      }

      current = current[key]
    }
  }

  current[keys.at(-1) as string] = value

  return obj
}

export const del = (obj: Obj | undefined | null, path: string, removeEmptyObjects?: boolean): Obj | undefined | null => {
  if (!obj) {
    return obj
  }

  const keys = toKeys(path)
  const map: Record<string, Obj> = {}
  let current = obj

  for (const key of keys) {
    if (key in current) {
      map[key] = current
      current = current[key]
    } else {
      return obj
    }
  }

  for (const entry of Object.entries(map).reverse()) {
    const len = Object.keys(entry[1]).length
    if (len === 1) {
      delete entry[1][entry[0]]
    } else if (len === 2) {
      delete entry[1][entry[0]]
      return obj
    } else {
      return obj
    }

    if (!removeEmptyObjects) {
      return obj
    }
  }

  return obj
}

export type ClearObject<
  T extends Record<string, unknown>,
  Key = keyof T,
  ClearKeys extends string = Key extends string
    ? T[Key] extends undefined
      ? never
      : Key
    : never,
  TResult = { [key in ClearKeys]: T[key] },
> = TResult

/** Remove undefined values */
export const clear = <T extends Obj>(obj: T | undefined | null): ClearObject<T> | undefined | null => {
  if (!obj) {
    return obj
  }

  return Object.keys(obj).reduce((acc, key: keyof T) => {
    if (obj[key] !== undefined) {
      acc[key] = obj[key]
    }

    return acc
  }, {} as T)
}


/**
 * Return all keys for the object and nested objects.
 * @example
 * FlattenObjectKeys<{ a: 1, b: { c: 2 }}>
 * // union: a, b, b.c
 */
export type FlattenKeys<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? FlattenKeys<T[K], `${Prefix}${K & string}.`> // Recurse into child objects
      | `${Prefix}${K & string}` // Include the partial path
    : `${Prefix}${K & string}`; // For primitives, just return the full path
}[keyof T]

export function flattenKeys<T extends Record<string, any>>(obj: T): FlattenKeys<T>[] {
  const result: string[] = []

  function recurse(currentObj: any, prefix: string = '') {
    for (const key in currentObj) {
      if (Object.prototype.hasOwnProperty.call(currentObj, key)) {
        const fullPath = prefix ? `${prefix}.${key}` : key
        result.push(fullPath)

        if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
          recurse(currentObj[key], fullPath)
        }
      }
    }
  }

  recurse(obj)
  return result as FlattenKeys<T>[]
}

/**
 * Return all full path keys for the object and nested objects.
 * @example
 * FlattenObjectFullPathKeys<{ a: 1, b: { c: 2 }}>
 * // union: a, b.c
 */
export type FlattenLeafKeys<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? FlattenLeafKeys<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`;
}[keyof T]

export function flattenLeafKeys<T extends Record<string, any>>(obj: T): FlattenLeafKeys<T>[] {
  const result: string[] = []

  function recurse(currentObj: any, prefix: string = '') {
    for (const key in currentObj) {
      if (Object.prototype.hasOwnProperty.call(currentObj, key)) {
        const fullPath = prefix ? `${prefix}.${key}` : key

        if (typeof currentObj[key] === 'object' && currentObj[key] !== null && !Array.isArray(currentObj[key])) {
          recurse(currentObj[key], fullPath)
        } else {
          result.push(fullPath)
        }
      }
    }
  }

  recurse(obj)
  return result as FlattenLeafKeys<T>[]
}
