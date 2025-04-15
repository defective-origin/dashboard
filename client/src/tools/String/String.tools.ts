export type StringValue = string | number

export const toString = (value: StringValue) => String(value).trim()

export const isString = (value: any): value is string => typeof value === 'string' || value instanceof String

/** ABC DEF */
export const toUppercase = (value: StringValue) => toString(value).toUpperCase()

/** abc def */
export const toLowercase = (value: StringValue) => toString(value).toLowerCase()

/** Abc */
export const capitalize = (value: StringValue) => {
  const firstChar = toLowercase(value).charAt(0).toUpperCase()
  const restChars = toLowercase(value).slice(1)

  return `${firstChar}${restChars}`
}

/** Abc Def */
export const toCapital = (value: StringValue, whitespace = ' ') => toString(value).split(whitespace).map(capitalize).join(whitespace)

/** Abc def */
export const toTitle = (value: StringValue) => capitalize(toString(value))

export default {
  isString,
  toString,
  toUppercase,
  toLowercase,
  capitalize,
  toCapital,
  toTitle,
}

