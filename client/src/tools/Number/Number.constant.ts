const SIZE_SIGN = 'B'

export const SIZE_OPTIONS = [
  { value: 1_024**4, postfix: `T${SIZE_SIGN}` },
  { value: 1_024**3, postfix: `G${SIZE_SIGN}` },
  { value: 1_024**2, postfix: `M${SIZE_SIGN}` },
  { value: 1_024, postfix: `K${SIZE_SIGN}` },
  { value: 1, postfix: `${SIZE_SIGN}` },
]

export const WEIGHT_OPTIONS = [
  { value: 1_000_000, postfix: 'T' },
  { value: 1_000, postfix: 'KG' },
  { value: 1, postfix: 'G' },
]

const CURRENCY_SIGN = '$'

export const CURRENCY_OPTIONS = [
  { value: 1_000**3, postfix: `B${CURRENCY_SIGN}` },
  { value: 1_000**2, postfix: `M${CURRENCY_SIGN}` },
  { value: 1_000, postfix: `K${CURRENCY_SIGN}` },
  { value: 1, postfix: `${CURRENCY_SIGN}` },
]
