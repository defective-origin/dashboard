import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
import BasePage, { BasePageProps } from 'screens/BasePage'

// ---| components |---
import Actions, { ActionItem } from 'components/Actions'
import Text from 'components/Text'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './GuidePage.module.scss'

export type GuidePageProps = BasePageProps

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
  const testActions: ActionItem[] = [// TODO: change variant to v
    { variant: 'link', start: 'developer_mode_tv', size: 'xs', content: 'https://google.com', color: 'warning', href: 'https://google.com' },
    { variant: 'link', start: 'developer_mode_tv', size: 'xs', content: 'google.com', color: 'warning', href: 'google.com' },
    { variant: 'link', start: 'developer_mode_tv', size: 'xs', content: '/google.com', color: 'warning', href: '/google.com' },
    { variant: 'link', start: 'developer_mode_tv', size: 'xs', content: 'http://localhost:5173/', color: 'warning', href: 'http://localhost:5173/' },
    { variant: 'link', start: 'developer_mode_tv', size: 'xs', content: 'localhost:5173/', color: 'warning', href: 'localhost:5173/' },
    { variant: 'link', start: 'developer_mode_tv', size: 'xs', content: '/localhost:5173/', color: 'warning', href: '/localhost:5173/' },
    { variant: 'link', start: 'developer_mode_tv', size: 'xs', content: '/localhost:5173/', color: 'warning', href: '/localhost:5173/', target: '_blank' },
    { start: 'developer_mode_tv', size: 'xs', v: 'outlined', content: 'warning - xs', color: 'warning', end: 'developer_mode_tv' },
    { start: 'developer_mode_tv', size: 'sm', v: 'outlined', content: 'error - sm', color: 'error', end: 'developer_mode_tv' },
    { start: 'developer_mode_tv', size: 'md', v: 'outlined', content: 'info - md', color: 'info', end: 'developer_mode_tv' },
    { start: 'developer_mode_tv', size: 'lg', v: 'outlined', content: 'primary - lg', color: 'primary', end: 'developer_mode_tv' },
    { start: 'developer_mode_tv', size: 'xl', v: 'outlined', content: 'secondary - xl', color: 'secondary', end: 'developer_mode_tv' },
  ]

  return (
    <BasePage className={_className} name='PAGES.GUIDE' {...otherProps}>
      <Text start='close' ellipsis content='short short short' end='close' />
      <Text start='close' ellipsis content='long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long' end='close' />
      <Text start='close' ellipsis multiline content='long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long' end='close' />
      <Actions items={testActions} gap='xs' direction='xy' />

      <Actions gap='xs' direction='xy'>
        <Actions.Button round size='xs' start='account_circle' />
        <Actions.Button round size='sm' start='account_circle' />
        <Actions.Button round size='md' start='account_circle' />
        <Actions.Button round size='lg' start='account_circle' />
        <Actions.Button round size='xl' start='account_circle' />
      </Actions>
      {children}
    </BasePage>
  )
}

GuidePage.displayName = 'GuidePage'

export default GuidePage
