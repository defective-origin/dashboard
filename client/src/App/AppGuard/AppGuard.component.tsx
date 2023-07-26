import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/lib/Text'

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

  return (
    <div className={_className} {...otherProps}>
      <Text color='primary' prefix='error' content='Changes are saved in a draft automatically. To apply changes you need to publish them.' />

      {children}
    </div>
  )
}

AppGuard.displayName = 'AppGuard'

export default AppGuard
