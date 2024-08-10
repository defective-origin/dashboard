import { NUMBER_OPTIONS, SIZE_OPTIONS, WEIGHT_OPTIONS, NumberUnit } from './Number.constant'

export type NumberValue = number | string

export type NumberOptions = Intl.NumberFormatOptions & {
  /** If true then show fraction part */
  isInt?: boolean
  /** If true then show full digit without unit preparation */
  full?: boolean
  /** Extra sign */
  sign?: string
  /** Unit configs */
  units?: NumberUnit[]
}

export function getMaxUnit(value: NumberValue, units: NumberUnit[] = NUMBER_OPTIONS, reverse?: boolean) {
  const items = reverse ? units.toReversed() : units

  return items.find((unit) => (Number(value) / unit.value) >= 1)
}

export const isNumber = (value: NumberValue) => {
  return !isNaN(Number(value)) && isFinite(Number(value))
}

/** Return fixed decimal string without rounding fraction part and sign */
export function formatNumber(value: NumberValue, options?: NumberOptions) {
  const fractionDigits = 20
  const [integer, fraction] = Intl.NumberFormat('en', { ...options, minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })
    .format(Number(value))
    .split('.')

  const digit = options?.isInt ? integer : `${integer}.${fraction.slice(0, 2)}`

  return options?.sign ? `${digit} ${options?.sign ?? ''}` : digit
}

/** 123,456,789.98 or 123.98 M */
export function toNumber(value: NumberValue, options?: NumberOptions) {
  if (!isNumber(value)) {
    return value
  }

  const unit = getMaxUnit(value, options?.units, options?.full) ?? { value: 1 }
  const convertedValue = Number(value) / unit.value
  const sign = `${unit?.sign ?? ''}${options?.sign ?? ''}`

  return formatNumber(convertedValue, { ...options, sign })
}

/** 123,456,789 or 123 M */
export const toAmount = (v: NumberValue) => toNumber(v, { isInt: true })

/** 123,456,789.98 % or 123.98 M% */
export const toDecimalPercent = (v: NumberValue, options?: NumberOptions) => toNumber(v, { sign: '%', style: 'percent', ...options })

/** 123,456,789.9876 % or 12,398.76 M% */
export const toPercent = (v: NumberValue, options?: NumberOptions) => toNumber(v, { sign: '%', ...options })

/** 123.46 M$ - K, M, B */
export const toCurrency = (v: NumberValue, options?: NumberOptions) => toNumber(v, { sign: '$', ...options })

/** 123.46 TB - B, KB, MB, GB, TB */
export const toSize = (v: NumberValue, options?: NumberOptions) => toNumber(v, { units: SIZE_OPTIONS, ...options })

/** 123.46 T  - G, K, T */
export const toWeight = (v: NumberValue, options?: NumberOptions) => toNumber(v, { units: WEIGHT_OPTIONS, ...options })

export default {
  isNumber,
  formatNumber,
  toNumber,
  toAmount,
  toPercent,
  toCurrency,
  toSize,
  toWeight,
}
