export const toObject = <T extends object>(target: T, ...args: T[]) => {
  return Object.assign(target, ...args)
}

/** Return nested value by path or undefined if value is not exist */
export const get = (obj: object, path?: string): any => {
  const keys = path ? path.split('.') : []
  let result = obj

  for (const key of keys) {
    if (key in result) {
      result = result[key as keyof object]
    } else {
      return undefined
    }
  }

  return result
}

export default {
  toObject,
  get,
}
