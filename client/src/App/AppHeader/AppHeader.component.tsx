import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Portal from 'components/layouts/Portal'
import Header, { HeaderProps } from 'components/layouts/Header'

// ---| self |---
import css from './AppHeader.module.scss'

export type AppHeaderProps = HeaderProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppHeader />
 */
export function AppHeader(props: AppHeaderProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppHeader, className)

  return (
    <Header className={_className} as='header' area='top' justifies='space-between' v='x' aligns='center' g='xxs' p='xxs' {...otherProps}>
      {children}

      <Portal.Container name='page-name' v='x' aligns='center' g='xxs' />
      <Portal.Container name='page-nav' v='x' aligns='center' g='xxs' />
      <Portal.Container name='page-extra' v='x' aligns='center' g='xxs' justifies='end' />
    </Header>
  )
}

AppHeader.displayName = 'AppHeader'

export default AppHeader
