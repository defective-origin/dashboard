import {
  toTitle, toLowercase, toCapital, toUppercase,
  toNumber, toAmount, toPercent, toCurrency, toSize, toWeight, toDecimalPercent,
  toDate, toDay, toMonth, toYear, toDayMonthYear, toDayOfMonthYear, toDayName, toMonthName,
} from 'tools'

const STRING_FORMAT_MAP = {
  title: toTitle,
  capitalize: toCapital,
  uppercase: toUppercase,
  lowercase: toLowercase,
}

const NUMBER_FORMAT_MAP = {
  size: toSize,
  weight: toWeight,
  number: toNumber,
  amount: toAmount,
  currency: toCurrency,
  percent: toPercent,
  'decimal-percent': toDecimalPercent,
}

const DATE_FORMAT_MAP = {
  date: toDate,
  day: toDay,
  month: toMonth,
  year: toYear,
  'day/month/year': toDayMonthYear,
  'day-of-month-year': toDayOfMonthYear,
  'day-name': toDayName,
  'month-name': toMonthName,
}

export const FORMAT_MAP = {
  ...STRING_FORMAT_MAP,
  ...NUMBER_FORMAT_MAP,
  ...DATE_FORMAT_MAP,
}
