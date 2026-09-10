import React, { useMemo } from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import { TEXT_FORMAT_MAP, TextFormat } from 'components/views/Text'

// ---| self |---

export type ChartFormatsOptions<N extends string> = Partial<Record<N, TextFormat>>

export type ChartFormatsReturnOptions<N extends string> = Partial<Record<N, (value: string) => string>>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Chart />
 */
export function useChartFormats<N extends string>(options: ChartFormatsOptions<N> = {}): ChartFormatsReturnOptions<N> {
  return useMemo(() => Object.keys(options).reduce((acc, key) => {
    const format = options[key as N] as TextFormat

    acc[key as keyof ChartFormatsOptions<N>] = (value: string) => TEXT_FORMAT_MAP[format](value).toString()

    return acc
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, {} as ChartFormatsReturnOptions<N>), [])
}

export default useChartFormats
