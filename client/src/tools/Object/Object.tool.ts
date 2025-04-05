import num from 'tools/Number'

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

export default {
  isObject,
  toObject,
  toKeys,
  toPath,
  get,
  set,
  del,
  has,
}
