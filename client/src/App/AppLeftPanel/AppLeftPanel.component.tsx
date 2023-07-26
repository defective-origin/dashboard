import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppLeftPanel.module.scss'

export type AppLeftPanelProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppLeftPanel />
 */
export function AppLeftPanel(props: AppLeftPanelProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppLeftPanel, className)

  return <div className={_className} {...otherProps}>LEFT PANEL{children}</div>
}

AppLeftPanel.displayName = 'AppLeftPanel'

export default AppLeftPanel
