import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/lib/Text'
import Block from 'components/Block'
import Actions, { Action } from 'components/Actions'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppGuard.module.scss'

export type AppGuardProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppGuard />
 */
export function AppGuard(props: AppGuardProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppGuard, className)
  const testActions: Action[] = [
    { v: 'link', start: 'developer_mode_tv', size: 'xs', content: 'https://google.com', color: 'warning', href: 'https://google.com' },
    { v: 'link', start: 'developer_mode_tv', size: 'xs', content: 'google.com', color: 'warning', href: 'google.com' },
    { v: 'link', start: 'developer_mode_tv', size: 'xs', content: '/google.com', color: 'warning', href: '/google.com' },
    { v: 'link', start: 'developer_mode_tv', size: 'xs', content: 'http://localhost:5173/', color: 'warning', href: 'http://localhost:5173/' },
    { v: 'link', start: 'developer_mode_tv', size: 'xs', content: 'localhost:5173/', color: 'warning', href: 'localhost:5173/' },
    { v: 'link', start: 'developer_mode_tv', size: 'xs', content: '/localhost:5173/', color: 'warning', href: '/localhost:5173/' },
    { v: 'link', start: 'developer_mode_tv', size: 'xs', content: '/localhost:5173/', color: 'warning', href: '/localhost:5173/', target: '_blank' },
    { start: 'developer_mode_tv', size: 'xs', variant: 'outlined', content: 'warning - xs', color: 'warning', end: 'developer_mode_tv' },
    { start: 'developer_mode_tv', size: 'sm', variant: 'outlined', content: 'error - sm', color: 'error', end: 'developer_mode_tv' },
    { start: 'developer_mode_tv', size: 'md', variant: 'outlined', content: 'info - md', color: 'info', end: 'developer_mode_tv' },
    { start: 'developer_mode_tv', size: 'lg', variant: 'outlined', content: 'primary - lg', color: 'primary', end: 'developer_mode_tv' },
    { start: 'developer_mode_tv', size: 'xl', variant: 'outlined', content: 'secondary - xl', color: 'secondary', end: 'developer_mode_tv' },
  ]

  return (
    <Block className={_className} justify='center' gap='xs' {...otherProps}>
      <Text size='xs' status='primary' start='error' content='You have unsaved changes. Are you sure you want to leave without save?' />

      <Actions items={testActions} gap='xs' direction='xy' />

      <Actions gap='xs' direction='xy'>
        <Actions.Button sx={{ padding: 0 }} round size='xs' start='account_circle' />
        <Actions.Button sx={{ padding: 0 }} round size='sm' start='account_circle' />
        <Actions.Button sx={{ padding: 0 }} round size='md' start='account_circle' />
        <Actions.Button sx={{ padding: 0 }} round size='lg' start='account_circle' />
        <Actions.Button sx={{ padding: 0 }} round size='xl' start='account_circle' />
      </Actions>

      {children}
    </Block>
  )
}

AppGuard.displayName = 'AppGuard'

export default AppGuard
