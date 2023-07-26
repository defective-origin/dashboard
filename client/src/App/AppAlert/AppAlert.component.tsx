import React, { useCallback } from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Alert, { AlertProps } from 'components/lib/Alert'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppAlert.module.scss'

const TEST_ALERT: AlertProps = {
  content: 'This is an error alert — check it out!',
  severity: 'warning',
}

export type AppAlertProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppAlert />
 */
export function AppAlert(props: AppAlertProps): JSX.Element | null {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppAlert, className)

  const close = useCallback((e: React.SyntheticEvent<Element, Event>) => {
    TEST_ALERT.onClose?.(e)
    // app.detach('alert')
  },[])

  if (!TEST_ALERT) {
    return null
  }

  return <Alert className={_className} onClose={close} {...TEST_ALERT} {...otherProps}>{children}</Alert>
}

AppAlert.displayName = 'AppAlert'

export default AppAlert
