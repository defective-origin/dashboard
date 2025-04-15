import React from 'react'
import {
  PolarAngleAxis,
  PolarAngleAxisProps,
  PolarGrid,
  PolarGridProps,
  PolarRadiusAxis,
  PolarRadiusAxisProps,
  Radar,
  RadarChart as RechartRadarChart,
} from 'recharts'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './RadarChart.module.scss'
import Chart, { ChartFormatsOptions, ChartProps, toProps, useChartFormats } from '../Chart'

const RADAR_ITEMS_MAP = {
  radar: Radar,
}

export type RadarChartProps = ChartProps<typeof RADAR_ITEMS_MAP> & {
  grid?: boolean | PolarGridProps
  angle?: boolean | string | PolarAngleAxisProps
  radius?: boolean | string | PolarRadiusAxisProps
  formats?: ChartFormatsOptions<'angle' | 'radius'>
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <RadarChart />
 */
export function RadarChart(props: RadarChartProps) {
  const { formats, radius, angle, grid, children, className, ...otherProps } = props
  const _className = cn(css.RadarChart, className)
  const formatMap = useChartFormats(formats)
  const radiusLabelAngle = 360 / (props.items?.length ?? 1)

  return (
    <Chart className={_className} context={RechartRadarChart} map={RADAR_ITEMS_MAP} formats={formats} {...otherProps}>
      {grid && <PolarGrid gridType='circle' {...toProps(grid)} />}
      {angle && <PolarAngleAxis tickFormatter={formatMap.angle} {...toProps(angle)} />}
      {radius && <PolarRadiusAxis orientation='middle' stroke='transparent' angle={radiusLabelAngle} tickFormatter={formatMap.radius} {...toProps(radius)} />}

      {children}
    </Chart>
  )
}

RadarChart.displayName = 'RadarChart'

export default RadarChart
