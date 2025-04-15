import React, { useMemo } from 'react'
import {
  Area,
  Bar,
  Brush,
  BrushProps,
  CartesianGrid,
  CartesianGridProps,
  ComposedChart,
  Line,
  ReferenceLine,
  ReferenceLineProps,
  XAxis,
  XAxisProps,
  YAxis,
  YAxisProps,
} from 'recharts'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './AxisChart.module.scss'
import Chart, { ChartFormatsOptions, ChartProps, toProps, useChartFormats } from '../Chart'

const AXIS_ITEMS_MAP = {
  line: Line,
  area: Area,
  bar: Bar,
}



export type AxisChartProps = ChartProps<typeof AXIS_ITEMS_MAP> & {
  grid?: boolean | CartesianGridProps
  brush?: boolean | string | BrushProps
  x?: boolean | string | XAxisProps
  y?: boolean | string | YAxisProps
  xr?: boolean | string | ReferenceLineProps
  yr?: boolean | string | ReferenceLineProps
  formats?: ChartFormatsOptions<'x' | 'y'>
  refs?: ReferenceLineProps[]
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AxisChart />
 */
export function AxisChart(props: AxisChartProps) {
  const { refs, x, y, xr, yr, formats, grid, brush, items, children, className, ...otherProps } = props
  const _className = cn(css.AxisChart, className)
  const formatMap = useChartFormats(formats)
  const zeroRefLines = useMemo(() => ({
    x: xr && items?.length,
    y: yr && items?.length,
  }), [items, xr, yr])

  // TODO: add linear gradient https://recharts.org/en-US/api/AreaChart

  return (
    <Chart className={_className} context={ComposedChart} items={items} map={AXIS_ITEMS_MAP} formats={formats} {...otherProps}>
      {grid && <CartesianGrid strokeDasharray='3 3' stroke='var(--color--primary)' strokeWidth={0.4} strokeOpacity={0.4} {...toProps(grid)} />}
      {brush && <Brush height={14} stroke='var(--color--primary)' strokeWidth={0.4} strokeOpacity={0.4} tickFormatter={formatMap.x} {...toProps(brush)} />}

      {zeroRefLines.x && <ReferenceLine x={0} stroke='var(--color--primary)' strokeWidth={0.4} strokeOpacity={0.4} {...toProps(xr, 'x')} />}
      {zeroRefLines.y && <ReferenceLine y={0} stroke='var(--color--primary)' strokeWidth={0.4} strokeOpacity={0.4} {...toProps(yr, 'y')} />}

      {x && items?.length && <XAxis stroke='transparent' tickFormatter={formatMap.x} allowDecimals {...toProps(x)} />}
      {y && items?.length && <YAxis stroke='transparent' tickFormatter={formatMap.y} allowDecimals {...toProps(y)} />}

      {refs?.map((line, idx) => <ReferenceLine key={idx} stroke='gold' strokeWidth={0.4} strokeOpacity={0.4} {...line} />)}

      {children}
    </Chart>
  )
}

AxisChart.displayName = 'AxisChart'

export default AxisChart
