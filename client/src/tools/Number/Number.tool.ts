import { CURRENCY_OPTIONS, SIZE_OPTIONS, WEIGHT_OPTIONS } from './Number.constant'

export type NumberValue = number | string

export type UnitOption = {
  value: number,
  postfix?: string,
}

export type UnitOptions = UnitOption[]

/** 123,456,789.98 */
export function toNumber(value: NumberValue, options?: Intl.NumberFormatOptions & { isInt?: boolean }) {
  // TODO: [kseniya_boldak] fix rounding up and Infinity case

  const fractionDigits = 20
  const number = Intl.NumberFormat('en', { ...options, minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }).format(Number(value))
  const integer = number.split('.')[0]
  const fraction = number.toString().split('.')[1].slice(0, 2)

  return options?.isInt ? integer : `${integer}.${fraction}`
}

export function getMaxOptions(value: NumberValue, options: UnitOptions){
  return options.find((option) => (Number(value) / option.value) >= 1)
}

/** Number value with unit postfix */
export function toUnit(v: NumberValue, optionVariant: UnitOptions, options?: Intl.NumberFormatOptions & { isInt?: boolean }) {
  const option = getMaxOptions(v, optionVariant)

  if (!option) {
    return toNumber(0, options)
  }

  const intlValue = toNumber(Number(v) / option.value, options)

  return option.postfix ? `${intlValue} ${option.postfix}` : intlValue
}

/** 123,456,789 */
export const toAmount = (v: NumberValue) => toNumber(v, { isInt: true })

/** 123,456,789.98 % */
export const toDecimalPercent = (v: NumberValue, postfix = '%') => `${toNumber(v, { style: 'percent' })} ${postfix}`

export const toPercent = (v: NumberValue, postfix = '%') => `${toNumber(v)} ${postfix}`

/** 123.46 M$ - K, M, B */
export const toCurrency = (v: NumberValue) => toUnit(v, CURRENCY_OPTIONS)

/** 123.46 TB - B, KB, MB, GB, TB */
export const toSize = (v: NumberValue) => toUnit(v, SIZE_OPTIONS)

/** 123.46 T  - G, K, T */
export const toWeight = (v: NumberValue) => toUnit(v, WEIGHT_OPTIONS)


export default {
  toNumber,
  toUnit,
  toAmount,
  toPercent,
  toCurrency,
  toSize,
  toWeight,
}
