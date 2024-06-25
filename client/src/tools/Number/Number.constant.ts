export type Unit<T> = {
  value: T,
  sign?: string,
}
export type NumberUnit = Unit<number>

export const SIZE_OPTIONS: NumberUnit[] = [
  { value: 1_024*(1_000**4), sign: 'PB' },
  { value: 1_024*(1_000**3), sign: 'TB' },
  { value: 1_024*(1_000**2), sign: 'GB' },
  { value: 1_024*1_000, sign: 'MB' },
  { value: 1_024, sign: 'KB' },
  { value: 8, sign: 'B' },
  { value: 1 },
]

export const WEIGHT_OPTIONS: NumberUnit[] = [
  { value: 1_000**4, sign: 'GT' },
  { value: 1_000**3, sign: 'MT' },
  { value: 1_000**2, sign: 'T' },
  { value: 1_000, sign: 'KG' },
  { value: 1, sign: 'G' },
]

export const NUMBER_OPTIONS: NumberUnit[] = [
  { value: 1_000**9, sign: 'OC' },
  { value: 1_000**8, sign: 'SP' },
  { value: 1_000**7, sign: 'SX' },
  { value: 1_000**6, sign: 'QI' },
  { value: 1_000**5, sign: 'QA' },
  { value: 1_000**4, sign: 'T' },
  { value: 1_000**3, sign: 'B' },
  { value: 1_000**2, sign: 'M' },
  { value: 1_000, sign: 'K' },
  { value: 1 },
]
