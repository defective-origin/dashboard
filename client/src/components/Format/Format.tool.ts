export type DateValue = number | string
export type NumberValue = number | string
export type StringValue = string
export type FormatValue = DateValue | StringValue | NumberValue | undefined | null

export type UnitOption = {
  value: number,
  postfix?: string,
}

export type UnitOptions = UnitOption[]

export const isNil = <T>(value: T) => {
  return value === null || value === undefined
}

// string formatters
export const toString = (v: StringValue) => String(v).trim()

export const capitalize = (v: StringValue) => {
  const lowercaseValue = toString(v).toLowerCase()
  const firstChar = lowercaseValue.charAt(0).toUpperCase()
  const restChars = lowercaseValue.slice(1)

  return `${firstChar}${restChars}`
}

const STRING_FORMAT_MAP = {
  uppercase: (v: StringValue) => toString(v).toUpperCase(), // ABC DEF
  lowercase: (v: StringValue) => toString(v).toLowerCase(), // abc def
  capitalize: (v: StringValue, whitespace = ' ') => toString(v).split(whitespace).map(capitalize).join(whitespace), // Abc Def
  title: (v: StringValue) => capitalize(toString(v)), // Abc def
}

// number formatters
export const SIZE_OPTIONS = [
  { value: 1_024**4, postfix: 'TB' },
  { value: 1_024**3, postfix: 'GB' },
  { value: 1_024**2, postfix: 'MB' },
  { value: 1_024, postfix: 'KB' },
  { value: 1, postfix: 'B' },
]

export const WEIGHT_OPTIONS = [
  { value: 1_000_000, postfix: 'T' },
  { value: 1_000, postfix: 'KG' },
  { value: 1, postfix: 'G' },
]

export const CURRENCY_OPTIONS = [
  { value: 1_000**3, postfix: 'B$' },
  { value: 1_000**2, postfix: 'M$' },
  { value: 1_000, postfix: 'K$' },
  { value: 1, postfix: '$' },
]

export const getMaxOptions = (value: NumberValue, options: UnitOptions) => {
  return options.find((option) => (Number(value) / option.value) >= 1)
}

export const toNumber = (v: NumberValue, options?: Intl.NumberFormatOptions & { isInt?: boolean }) =>
  Intl.NumberFormat('en', {...options, minimumFractionDigits: options?.isInt ? 0 : 2}).format(Number(v))

export const toUnit = (v: NumberValue, optionVariant: UnitOptions, options?: Intl.NumberFormatOptions & { isInt?: boolean }) => {
  const option = getMaxOptions(v, optionVariant)

  if (!option) {
    return toNumber(0, options)
  }

  const intlValue = toNumber(Number(v) / option.value, options)

  return option.postfix ? `${intlValue} ${option.postfix}` : intlValue
}

const NUMBER_FORMAT_MAP = {
  number: (v: NumberValue) => toNumber(v), // 123,456,789.98
  amount: (v: NumberValue) => toNumber(v, { isInt: true }), // 123,456,789
  percent: (v: NumberValue) => toNumber(v, { style: 'percent' }), // 123,456,789.98 %
  currency: (v: NumberValue) => toUnit(v, CURRENCY_OPTIONS), // 123.46 M$ - K, M, B
  size: (v: NumberValue) => toUnit(v, SIZE_OPTIONS), // 123.46 TB  - B, KB, MB, GB, TB
  weight: (v: NumberValue) => toUnit(v, WEIGHT_OPTIONS), // 123.46 T  - G, K, T,
}

// date formatters
export const toDate = (v: DateValue, options?: Intl.DateTimeFormatOptions) => Intl.DateTimeFormat('en', options).format(new Date(v))

const DATE_FORMAT_MAP = {
  'day': (v: DateValue) => toDate(v, {day: '2-digit'}), // 27
  'month': (v: DateValue) => toDate(v, { month: '2-digit' }), // 02
  'year': (v: DateValue) => toDate(v, { year: 'numeric' }), // 2024
  'day/month/year': (v: DateValue) => toDate(v), // 02/27/2024
  'day-of-month-year': (v: DateValue) => toDate(v, { dateStyle: 'long'}), // February 27, 2024
  'day-name': (v: DateValue) => toDate(v, { weekday: 'long' }), // Tuesday
  'month-name': (v: DateValue) => toDate(v, { month: 'long' }), // February
}

export const FORMAT_MAP = {
  ...STRING_FORMAT_MAP,
  ...NUMBER_FORMAT_MAP,
  ...DATE_FORMAT_MAP,
  default: (v: FormatValue): any => v,
}
