import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Widget } from 'api'

// ---| pages |---
// ---| screens |---
import PlaceholderCard from 'screens/PlaceholderCard'

// ---| components |---
import NavLink from 'components/NavLink'

// ---| self |---
import css from './WidgetPreviewCard.module.scss'

export type WidgetPreviewCardProps = {
  className?: string
  children?: React.ReactNode
  options: Widget
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
    <NavLink className={_className} to='WIDGET' params={{ id: options.id!.toString() }} clear {...otherProps}>
      <PlaceholderCard name='Widget Preview' height={300} width='100%' />
    </NavLink>
  )
}

WidgetPreviewCard.displayName = 'WidgetPreviewCard'

export default WidgetPreviewCard
