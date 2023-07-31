import React from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/lib/Text'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppFooter.module.scss'

export type AppFooterProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppFooter />
 */
export function AppFooter(props: AppFooterProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppFooter, className)
  const app = useLauncher()

  return (
    <div className={_className} {...otherProps}>
      <Text.H5 size='xs' color='secondary' content={app.t('MESSAGES.COPYRIGHT')} />

      {children}
    </div>
  )
}

AppFooter.displayName = 'AppFooter'

export default AppFooter
