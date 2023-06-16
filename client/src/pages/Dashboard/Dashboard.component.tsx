import React from 'react'

// ---| components |---
import { GeneralProps } from 'components/Component'

// ---| self |---
import './Dashboard.scss'

// const TEST_WIDGETS: WidgetOption[] = [
//   {
//     uuid: 'widget-1',
//     name: 'Card 1',
//     position: {
//       x: 0,
//       y: 0,
//       columns: 10,
//       rows: 10,
//     },
//   },
//   {
//     uuid: 'widget-2',
//     name: 'Card 2',
//     position: {
//       x: 0,
//       y: 10,
//       columns: 10,
//       rows: 10,
//     },
//   },
//   {
//     uuid: 'widget-3',
//     name: 'Card 3',
//     position: {
//       x: 10,
//       y: 0,
//       columns: 5,
//       rows: 5,
//     },
//   },
//   {
//     uuid: 'widget-4',
//     name: 'Card 4',
//     position: {
//       x: 15,
//       y: 0,
//       columns: 5,
//       rows: 5,
//     },
//   },
//   {
//     uuid: 'widget-5',
//     name: 'Card 5',
//     position: {
//       x: 20,
//       y: 0,
//       columns: 5,
//       rows: 5,
//     },
//   },
//   {
//     uuid: 'widget-6',
//     name: 'Card 6',
//     position: {
//       x: 10,
//       y: 5,
//       columns: 15,
//       rows: 15,
//     },
//   },
//   {
//     uuid: 'widget-7',
//     name: 'Card 7',
//     position: {
//       x: 25,
//       y: 0,
//       columns: 15,
//       rows: 7,
//     },
//   },
//   {
//     uuid: 'widget-8',
//     name: 'Card 8',
//     position: {
//       x: 25,
//       y: 7,
//       columns: 8,
//       rows: 13,
//     },
//   },
//   {
//     uuid: 'widget-9',
//     name: 'Card 9',
//     position: {
//       x: 33,
//       y: 7,
//       columns: 7,
//       rows: 7,
//     },
//   },
//   {
//     uuid: 'widget-10',
//     name: 'Card 10',
//     position: {
//       x: 33,
//       y: 14,
//       columns: 7,
//       rows: 6,
//     },
//   },
// ]

export type DashboardProps = GeneralProps & {
  columns: number
  rows: number
}

function Dashboard(props: DashboardProps): JSX.Element {
  const { className = '' } = props

  return (
    <div className={`dashboard ${className}`}>
      DashBoard
    </div>
  )
}

export default React.memo(Dashboard)
