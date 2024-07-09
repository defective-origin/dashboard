import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Board } from 'api'

// ---| pages |---
// ---| screens |---
import PreviewCard from 'screens/cards/PreviewCard'

// ---| components |---
// ---| self |---
import css from './DashboardPreviewCard.module.scss'

export type DashboardPreviewCardProps = {
  className?: string
  children?: React.ReactNode
  options: Board
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <DashboardPreviewCard options={dashboard} />
 */
export function DashboardPreviewCard(props: DashboardPreviewCardProps): JSX.Element {
  const { options, className, ...otherProps } = props
  const _className = cn(css.DashboardPreviewCard, className)

  return (
    <PreviewCard
      className={_className}
      to='BOARD'
      options={options}
      params={{ id: options.id }}
      {...otherProps}
    />
  )
}

DashboardPreviewCard.displayName = 'DashboardPreviewCard'

export default DashboardPreviewCard
