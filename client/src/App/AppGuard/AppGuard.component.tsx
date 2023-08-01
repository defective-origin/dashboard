import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/lib/Text'
import Actions, { Action } from 'components/Actions'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppGuard.module.scss'

export type AppGuardProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppGuard />
 */
export function AppGuard(props: AppGuardProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppGuard, className)
  const testActions: Action[] = [
    { icon: 'developer_mode_tv', size: 'xs', variant: 'outlined', content: 'warning - xs', color: 'warning' },
    { icon: 'developer_mode_tv', size: 'sm', variant: 'outlined', content: 'error - sm', color: 'error' },
    { icon: 'developer_mode_tv', size: 'md', variant: 'outlined', content: 'info - md', color: 'info' },
    { icon: 'developer_mode_tv', size: 'lg', variant: 'outlined', content: 'primary - lg', color: 'primary' },
    { icon: 'developer_mode_tv', size: 'xl', variant: 'outlined', content: 'secondary - xl', color: 'secondary' },
  ]

  return (
    <div className={_className} {...otherProps}>
      <Text size='xs' color='primary' prefix='error' content='You have unsaved changes. Are you sure you want to leave without save?' />

      <Actions items={testActions} gap='xs' />

      {children}
    </div>
  )
}

AppGuard.displayName = 'AppGuard'

export default AppGuard
