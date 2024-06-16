import { num, str, date } from 'tools'

const STRING_FORMAT_MAP = {
  title: str.toTitle,
  capitalize: str.toCapital,
  uppercase: str.toUppercase,
  lowercase: str.toLowercase,
}

const NUMBER_FORMAT_MAP = {
  size: num.toSize,
  weight: num.toWeight,
  number: num.toNumber,
  amount: num.toAmount,
  currency: num.toCurrency,
  percent: num.toPercent,
  'decimal-percent': num.toDecimalPercent,
}

const DATE_FORMAT_MAP = {
  date: date.toDate,
  day: date.toDay,
  month: date.toMonth,
  year: date.toYear,
  'day/month/year': date.toDayMonthYear,
  'day-of-month-year': date.toDayOfMonthYear,
  'day-name': date.toDayName,
  'month-name': date.toMonthName,
}

export const FORMAT_MAP = {
  ...STRING_FORMAT_MAP,
  ...NUMBER_FORMAT_MAP,
  ...DATE_FORMAT_MAP,
}
