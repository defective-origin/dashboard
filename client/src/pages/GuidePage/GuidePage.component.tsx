import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
import BasePage, { BasePageProps } from 'screens/BasePage'

// ---| components |---
import Actions, { ActionItem } from 'components/Actions'
import Text from 'components/Text'
import MenuItem from 'components/Menu/MenuItem'
import MenuButton from 'components/MenuButton'
import Link from 'components/Link'
import Button from 'components/Button'
import Image from 'components/Image'
import Format from 'components/Format'

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
  const testLinks: ActionItem[] = [
    { variant: 'link', start: 'developer_mode_tv', size: 'xs', content: 'https://google.com', color: 'warning', href: 'https://google.com' },
    { variant: 'link', start: 'developer_mode_tv', size: 'sm', content: 'google.com', color: 'warning', href: 'google.com' },
    { variant: 'link', start: 'developer_mode_tv', size: 'md', content: '/google.com', color: 'warning', href: '/google.com' },
    { variant: 'link', start: 'developer_mode_tv', size: 'lg', content: 'http://localhost:5173/', color: 'warning', href: 'http://localhost:5173/' },
    { variant: 'link', start: 'developer_mode_tv', size: 'xl', content: 'localhost:5173/', color: 'warning', href: 'localhost:5173/' },
    { variant: 'link', start: 'developer_mode_tv', size: 'xs', content: '/localhost:5173/', color: 'warning', href: '/localhost:5173/' },
    { variant: 'link', start: 'developer_mode_tv', size: 'xs', content: '/localhost:5173/', color: 'warning', href: '/localhost:5173/', target: '_blank' },
    { variant: 'link', size: 'xl', color: 'warning', href: '/localhost:5173/', withIcon: true },
  ]
  const testButtons: ActionItem[] = [
    { start: 'developer_mode_tv', size: 'xs', v: 'outlined', content: 'warning - xs', color: 'warning', end: 'developer_mode_tv' },
    { start: 'developer_mode_tv', size: 'sm', v: 'outlined', content: 'error - sm', color: 'error', end: 'developer_mode_tv' },
    { start: 'developer_mode_tv', size: 'md', v: 'outlined', content: 'info - md', color: 'info', end: 'developer_mode_tv' },
    { start: 'developer_mode_tv', size: 'lg', v: 'outlined', content: 'primary - lg', color: 'primary', end: 'developer_mode_tv' },
    { start: 'developer_mode_tv', size: 'xl', v: 'outlined', content: 'secondary - xl', color: 'secondary', end: 'developer_mode_tv' },
  ]

  return (
    <BasePage className={_className} name='PAGES.GUIDE' scroll='y' {...otherProps}>
      {children}
    </BasePage>
  )
}

GuidePage.displayName = 'GuidePage'

export default GuidePage
