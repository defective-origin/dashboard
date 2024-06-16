export type Unit<T> = {
  value: T,
  sign?: string,
}
export type NumberUnit = Unit<number>

export const SIZE_OPTIONS: NumberUnit[] = [
  { value: 1_024**4, sign: 'T' },
  { value: 1_024**3, sign: 'G' },
  { value: 1_024**2, sign: 'M' },
  { value: 1_024, sign: 'K' },
  { value: 1 },
]

export const WEIGHT_OPTIONS: NumberUnit[] = [
  { value: 1_000_000, sign: 'T' },
  { value: 1_000, sign: 'KG' },
  { value: 1, sign: 'G' },
]

export const NUMBER_OPTIONS: NumberUnit[] = [
  { value: 1_000**3, sign: 'B' },
  { value: 1_000**2, sign: 'M' },
  { value: 1_000, sign: 'K' },
  { value: 1 },
]
