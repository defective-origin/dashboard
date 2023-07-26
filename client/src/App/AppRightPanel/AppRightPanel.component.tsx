import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppRightPanel.module.scss'

export type AppRightPanelProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppRightPanel />
 */
export function AppRightPanel(props: AppRightPanelProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppRightPanel, className)

  return <div className={_className} {...otherProps}>RIGHT PANEL{children}</div>
}

AppRightPanel.displayName = 'AppRightPanel'

export default AppRightPanel
