import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Dashboard } from 'api'

// ---| pages |---
// ---| screens |---
import PlaceholderCard from 'screens/cards/PlaceholderCard'

// ---| components |---
import NavLink from 'components/NavLink'

// ---| self |---
import css from './DashboardPreviewCard.module.scss'

export type DashboardPreviewCardProps = {
  className?: string
  children?: React.ReactNode
  options: Dashboard
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
    <NavLink className={_className} to='BOARD' params={{ id: options.id!.toString() }} clear {...otherProps}>
      <PlaceholderCard name='Dashboard Preview' height={300} width='100%' />
    </NavLink>
  )
}

DashboardPreviewCard.displayName = 'DashboardPreviewCard'

export default DashboardPreviewCard
