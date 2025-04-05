import React from 'react'

// ---| core |---
import { Outlet } from 'router'
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Content, { ContentProps } from 'components/layouts/Content'

// ---| self |---
import css from './AppContent.module.scss'

export type AppContentProps = ContentProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppContent />
 */
export function AppContent(props: AppContentProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppContent, className)

  return (
    <Content as='main' area='center' className={_className} {...otherProps}>
      <Outlet />
      {children}
    </Content>
  )
}

AppContent.displayName = 'AppContent'

export default AppContent
