import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Widget, useWidgets } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
// ---| self |---
import css from './WidgetTable.module.scss'
import FeatureTable, { FeatureTableProps } from '../FeatureTable'

export type WidgetTableProps = FeatureTableProps<Widget>

/**
 * Component description.
 * @example
 * <WidgetTable />
 */
export function WidgetTable(props: WidgetTableProps) {
  const { className, ...otherProps } = props
  const widgets = useWidgets()

  return (
    <FeatureTable
      className={cn(css.WidgetTable, className)}
      items={widgets.data}
      loading={widgets.isLoading}
      {...otherProps}
    />
  )
}

WidgetTable.displayName = 'WidgetTable'

export default WidgetTable
