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
export function AppContent(props: AppContentProps) {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppContent, className)

  return (
    <Content as='main' area='center' className={_className} {...otherProps}>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
        {children}
      </React.Suspense>
    </Content>
  )
}

AppContent.displayName = 'AppContent'

export default AppContent
