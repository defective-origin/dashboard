import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block from 'components/Block'
import Portal from 'components/Portal'
import Header, { HeaderProps } from 'components/Header'

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
    <Header className={_className} as='header' area='top' justifies='space-between' p='xxs' g='xxs' {...otherProps}>
      <Block className={css.Content} v='x' aligns='center' g='xxs'>
        <Portal.Container name='page-name' v='x' g='xs' />

        {children}
      </Block>

      <Block className={css.Extra} v='x' aligns='center' g='xxs'>
        <Portal.Container name='page-menu' />
      </Block>
    </Header>
  )
}

AppHeader.displayName = 'AppHeader'

export default AppHeader
