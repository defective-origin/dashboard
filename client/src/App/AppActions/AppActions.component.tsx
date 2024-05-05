import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Aside from 'components/Aside'
import Portal from 'components/Portal'

// ---| self |---
import css from './AppActions.module.scss'

export type AppActionsProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppActions />
 */
export function AppActions(props: AppActionsProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppActions, className)

  return (
    <Aside className={_className} area='right' justifies='end' {...otherProps}>
      <Portal.Container name='page-actions' />

      {children}
    </Aside>
  )
}

AppActions.displayName = 'AppActions'

export default AppActions
