import React, { useCallback, useMemo, useState } from 'react'
import { Payload } from 'recharts/types/component/DefaultLegendContent'
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart'
import {
  Legend,
  LegendProps,
  ResponsiveContainer,
  ResponsiveContainerProps,
  Tooltip,
  TooltipProps,
} from 'recharts'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Banner from 'components/views/Banner'

// ---| self |---
import css from './Chart.module.scss'
import useChartFormats, { ChartFormatsOptions } from './Chart.hooks'

const MARGIN = { top: 15, right: 15, left: 15, bottom: 15 }

const COLORS = ['primary', 'secondary', 'success', 'info', 'warning', 'error']

export const toProps = (value?: boolean | string | object, key = 'dataKey') => {
  if (typeof value === 'object') {
    return value
  } else if (typeof value === 'string' || typeof value === 'number') {
    return { [key]: value }
  }

  return {}
}

// TODO: change rechart to chart.js

export type ChartProps<M extends object> = Omit<ResponsiveContainerProps, 'children' | 'data'> & {
  map?: M
  options?: Record<string, keyof M>
  loading?: boolean
  legend?: boolean | LegendProps
  tooltip?: boolean | TooltipProps<any, any>
  items?: CategoricalChartProps['data']
  syncId?: CategoricalChartProps['syncId']
  margin?: CategoricalChartProps['margin']
  formats?: ChartFormatsOptions<'legend' | 'tooltip'>
  className?: string
  children?: React.ReactNode
  context?: React.ComponentType<CategoricalChartProps>
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Chart />
 */
export function Chart<M extends object>(props: ChartProps<M>) {
  const { formats, map, options, syncId, items, loading, tooltip, legend, context: ChartContext, children, className, ...otherProps } = props
  const _className = cn(css.Chart, className)
  const formatMap = useChartFormats(formats)
  const [highlight, setHighlight] = useState<Payload['dataKey']>()
  const onHighlight = useCallback((o: Payload) => setHighlight(o.dataKey), [])
  const offHighlight = useCallback(() => setHighlight(undefined), [])
  const showBanner = loading || !items?.length

  const chartItems = useMemo(() => Object.entries(options ?? {}).map(([key, variant], idx) => {
    const ChartItem = map?.[variant] as React.FC<any>
    const color = `var(--color--${COLORS[idx] ?? 'primary'})`

    if (!ChartItem) {
      return null
    }

    return (
      <ChartItem
        key={idx}
        type='monotone'
        dataKey={key}
        stroke={color}
        fill={color}
        fillOpacity={0.7}
        opacity={!highlight || highlight === key ? 1 : 0.5}
      />
    )
  }), [options, map, highlight])


  if (!ChartContext) {
    return null
  }

  return (
    <ResponsiveContainer
      className={_className}
      height='100%'
      width='100%'
      {...otherProps}
    >
      {showBanner
        ? <Banner image='empty' loading={loading} visible={!items?.length} absolute />
        : (
          <ChartContext data={items} syncId={syncId} margin={MARGIN}>
            {tooltip && <Tooltip formatter={formatMap.tooltip} {...toProps(tooltip)} />}
            {legend && (
              <Legend
                verticalAlign='top'
                wrapperStyle={{ lineHeight: '40px' }}
                formatter={formatMap.legend}
                onMouseEnter={onHighlight}
                onMouseLeave={offHighlight}
                {...toProps(legend)}
              />
            )}

            {chartItems}
            {children}
          </ChartContext>
        )}
    </ResponsiveContainer>
  )
}

Chart.displayName = 'Chart'

export default Chart
