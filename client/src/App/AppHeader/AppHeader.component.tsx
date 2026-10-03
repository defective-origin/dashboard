import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Portal from 'components/layouts/Portal'
import Header, { HeaderProps } from 'components/layouts/Header'

// ---| self |---
import css from './AppHeader.module.scss'


export type AppHeaderProps = HeaderProps

/**
 * Component description.
 * @example
 * <AppHeader />
 */
export function AppHeader(props: AppHeaderProps) {
  const { children, className, ...otherProps } = props

  return (
    <Header className={cn(css.AppHeader, className)} g='xxs' p='md' v='grid' columns='1fr auto 1fr' {...otherProps}>
      {children}

      <Portal.Container name='page-name' v='x' aligns='center' g='xxs' />
      <Portal.Container name='page-nav' v='x' aligns='center' g='xxs' />
      <Portal.Container name='page-extra' v='x' aligns='center' g='xxs' justifies='end' />
    </Header>
  )
}

AppHeader.displayName = 'AppHeader'

export default AppHeader
