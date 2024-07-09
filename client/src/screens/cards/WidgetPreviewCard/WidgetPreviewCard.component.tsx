import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { WidgetPreset } from 'api'

// ---| pages |---
// ---| screens |---
import PreviewCard from 'screens/cards/PreviewCard'

// ---| components |---
// ---| self |---
import css from './WidgetPreviewCard.module.scss'

export type WidgetPreviewCardProps = {
  className?: string
  children?: React.ReactNode
  options: WidgetPreset
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <WidgetPreviewCard />
 */
export function WidgetPreviewCard(props: WidgetPreviewCardProps): JSX.Element {
  const { options, className, ...otherProps } = props
  const _className = cn(css.WidgetPreviewCard, className)

  return (
    <PreviewCard
      className={_className}
      to='WIDGET'
      options={options}
      params={{ id: options.id!.toString() }}
      {...otherProps}
    />
  )
}

WidgetPreviewCard.displayName = 'WidgetPreviewCard'

export default WidgetPreviewCard
