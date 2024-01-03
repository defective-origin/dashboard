import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
import Page, { PageProps } from 'screens/Page'

// ---| components |---
import Actions, { Action } from 'components/Actions'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './GuidePage.module.scss'

export type GuidePageProps = PageProps & {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <GuidePage />
 */
export function GuidePage(props: GuidePageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.GuidePage, className)
  const testActions: Action[] = [// TODO: change variant to v
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
    <Page className={_className} name='PAGES.GUIDE' {...otherProps}>
      <Actions items={testActions} gap='xs' direction='xy' />

      <Actions gap='xs' direction='xy'>
        <Actions.Button sx={{ padding: 0 }} round size='xs' start='account_circle' />
        <Actions.Button sx={{ padding: 0 }} round size='sm' start='account_circle' />
        <Actions.Button sx={{ padding: 0 }} round size='md' start='account_circle' />
        <Actions.Button sx={{ padding: 0 }} round size='lg' start='account_circle' />
        <Actions.Button sx={{ padding: 0 }} round size='xl' start='account_circle' />
      </Actions>
      {children}
    </Page>
  )
}

GuidePage.displayName = 'GuidePage'

export default GuidePage
