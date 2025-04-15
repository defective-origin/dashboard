import { NumberUnit } from '../Number'
import { DATE_OPTIONS } from './Date.constants'

export type DateValue = number | string

export const isDate = (value: DateValue) => {
  return !isNaN(new Date(value).getTime())
}

export const toDate = (value: DateValue, options?: Intl.DateTimeFormatOptions) => {
  if (!isDate(value)) {
    return value
  }

  return Intl.DateTimeFormat('en', options ? options : { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value))
}

/** 27 */
export const toDay = (v: DateValue, options?: Intl.DateTimeFormatOptions) => toDate(v, options ? options : { day: '2-digit' })

/** 02 */
export const toMonth = (v: DateValue) => toDate(v, { month: '2-digit' })

/** 2024 */
export const toYear = (v: DateValue) => toDate(v, { year: 'numeric' })

/** 27/02/2024 */
export const toDayMonthYear = (v: DateValue, sep = '/') => `${toDay(v)}${sep}${toMonth(v)}${sep}${toYear(v)}`

/** Tuesday */
export const toDayName = (v: DateValue) => toDate(v, { weekday: 'long' })

/** February */
export const toMonthName = (v: DateValue) => toDate(v, { month: 'long' })

export const getDayPostfix = (value: DateValue, units: NumberUnit[], defaultSign = 'th') => {
  return units.find(unit => Number(value) === unit.value)?.sign ?? defaultSign
}

/** 27th of February 2024 */
export const toDayOfMonthYear = (v: DateValue, defaultPostfix?: string) => {
  const day = toDay(v, { day: 'numeric' })
  const postfix = getDayPostfix(day, DATE_OPTIONS, defaultPostfix)

  return `${day}${postfix} of ${toMonthName(v)} ${toYear(v)}`
}

export default {
  isDate,
  toDate,
  toDay,
  toMonth,
  toYear,
  toDayMonthYear,
  toDayOfMonthYear,
  toDayName,
  toMonthName,
}

