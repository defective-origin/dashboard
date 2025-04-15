/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import AxisChart, { AxisChartProps } from './AxisChart.component'

const ITEMS = [
  {
    name: 'Page A',
    a: 1400,
    b: 800,
    c: 590,
  },
  {
    name: 'Page B',
    a: 1400,
    b: 800,
    c: 590,
  },
  {
    name: 'Page C',
    a: 1506,
    b: 967,
    c: 868,
  },
  {
    name: 'Page D',
    a: 989,
    b: 1098,
    c: 1397,
  },
  {
    name: 'Page E',
    a: 1228,
    b: 1200,
    c: 1480,
  },
  {
    name: 'Page F',
    a: 1100,
    b: 1108,
    c: 1520,
  },
  {
    name: 'Page G',
    a: 1700,
    b: 680,
    c: 1400,
  },
]

const meta: Meta<typeof AxisChart> = {
  component: AxisChart,
  title: 'Components/Charts/AxisChart',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof AxisChart>

export const Demo: Story = {
  parameters: params('AxisChart'),
  args: {
    x: 'name',
    y: true,
    xr: true,
    yr: true,
    brush: 'name',
    grid: true,
    legend: true,
    tooltip: true,
    loading: false,
    width: 500,
    height: 300,
    formats: {
      x: 'uppercase',
      y: 'number',
      legend: 'uppercase',
      tooltip: 'number',
    },
    options: {
      c: 'area',
      a: 'line',
      b: 'bar',
    },
    refs: [
      { x: 'Page C', label: 'Max X', stroke: 'orange' },
      { y: 1506, label: 'Max B RAGE' },
    ],
    items: ITEMS,
  },
}
