import React from 'react'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| root |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppMenuScreen.module.scss'

export type AppMenuScreenProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppMenuScreen />
 */
export function AppMenuScreen(props: AppMenuScreenProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppMenuScreen, className)

  return (
    <div className={_className} {...otherProps}>
      {children}
    </div>
  )
}

export default AppMenuScreen
