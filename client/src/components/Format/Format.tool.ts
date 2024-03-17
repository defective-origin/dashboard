import {
  StringValue, toTitle, toLowercase, toCapital, toUppercase,
  NumberValue, toNumber, toAmount, toPercent, toCurrency, toSize, toWeight, toDecimalPercent,
  DateValue, toDate, toDay, toMonth, toYear, toDayMonthYear, toDayOfMonthYear, toDayName, toMonthName,
} from 'tools'

export type FormatValue = DateValue | StringValue | NumberValue | undefined | null

const STRING_FORMAT_MAP = {
  uppercase: toUppercase,
  lowercase: toLowercase,
  capitalize: toCapital,
  title: toTitle,
}

export const amount = (v: NumberValue) => toNumber(v, { isInt: true })

const NUMBER_FORMAT_MAP = {
  number: toNumber,
  amount: toAmount,
  percent: toPercent,
  'decimal-percent': toDecimalPercent,
  currency: toCurrency,
  size: toSize,
  weight: toWeight,
}

const DATE_FORMAT_MAP = {
  'date': toDate,
  'day': toDay,
  'month': toMonth,
  'year': toYear,
  'day/month/year': toDayMonthYear,
  'day-of-month-year': toDayOfMonthYear,
  'day-name': toDayName,
  'month-name': toMonthName,
}

export const FORMAT_MAP = {
  ...STRING_FORMAT_MAP,
  ...NUMBER_FORMAT_MAP,
  ...DATE_FORMAT_MAP,
  default: (v: FormatValue): any => v,
}
