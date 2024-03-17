export function isNull<T>(value: T) {
  return value === null
}

export function isUndefined<T>(value: T) {
  return value === undefined
}

export function isNil<T>(value: T) {
  return isNull(value) || isUndefined(value)
}

export default {
  isNull,
  isUndefined,
  isNil,
}

