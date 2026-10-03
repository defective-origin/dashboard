import React from 'react'

// ---| core |---
import { Outlet } from 'router'
import { cn } from 'tools'
import { t } from 'locale'

// ---| components |---
import Content, { ContentProps } from 'components/layouts/Content'
import Text from 'components/views/Text'

// ---| self |---
import css from './AppContent.module.scss'

export type AppContentProps = ContentProps

/**
 * Component description.
 * @example
 * <AppContent />
 */
export function AppContent(props: AppContentProps) {
  const { children, className, ...otherProps } = props

  return (
    <Content as='main' className={cn(css.AppContent, className)} v='grid' {...otherProps}>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Text className={css.copyright} content={t('MESSAGE.COPYRIGHT', { year: (new Date).getFullYear() })} size='xs' />

        <Outlet />
        {children}
      </React.Suspense>
    </Content>
  )
}

AppContent.displayName = 'AppContent'

export default AppContent
