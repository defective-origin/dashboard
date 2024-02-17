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
import Block from 'components/Block'
import Icon from 'components/Icon'
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
      <BasePage.Section title='Text'>
        <Text content='short short short' />
        <Text ellipsis content='ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis ellipsis' />
        <Text ellipsis multiline content='ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ellipsis multiline ' />
      </BasePage.Section>

      <BasePage.Section title='Links'>
        <Actions items={testLinks} gap='xs' direction='xy' />
      </BasePage.Section>

      <BasePage.Section title='Buttons'>
        <Actions items={testButtons} gap='xs' direction='xy' />
      </BasePage.Section>

      <BasePage.Section title='Circle Buttons' gap='xs' direction='xy'>
        <Button round size='xs' start='account_circle' />
        <Button round size='sm' start='account_circle' />
        <Button round size='md' start='account_circle' />
        <Button round size='lg' start='account_circle' />
        <Button round size='xl' start='account_circle' />
      </BasePage.Section>

      <BasePage.Section title='Disabled' gap='xs' direction='xy' align='start'>
        <Link start='close' content='text' end='check_circle' size='xl' disabled />
        <Button start='close' content='text' end='check_circle' size='xl' disabled />
        <MenuItem start='close' content='text' end='check_circle' size='xl' disabled />
        <MenuButton start='close' content='text' end='check_circle' size='xl' disabled/>
      </BasePage.Section>

      <BasePage.Section title='Loading' gap='xs' direction='xy' align='start'>
        <Image v='logo' loading />
        <Icon v='close' size='xl' loading />
        <Text content='text' size='xl' loading />

        <Link start='close' content='text' end='check_circle' size='xl' loading />
        <Button start='close' content='text' end='check_circle' size='xl' loading />
        <MenuItem start='close' content='text' end='check_circle' size='xl' loading />
        <MenuButton start='close' content='text' end='check_circle' size='xl' loading/>
      </BasePage.Section>

      <BasePage.Section title='Tooltip' gap='xs' direction='xy' align='start'>
        <MenuButton content='MenuButton' tooltip={'MenuButton'} />
        <MenuItem content='MenuItem1' tooltip={'Menuitem1'} />
        <Link href='#' content='Link' tooltip={'Link'} />
        <Link href='#' tooltip={'Link'} />
        <Button content='Button' tooltip={'Button'} />
      </BasePage.Section>

      <Block gap='xs' direction='y' align='center' padding='xl'>
        <Format v='uppercase' value='uppercase'/>
        <Format v='lowercase' value='LOWERCASE'/>
        <Format v='capitalize' value='   capitalize    capitALize'/>
        <Format v='title' value='title TITle'/>
        <Format v='title' placeholder/>

        <Format v='number' value={120202003.12}/>
        <Format v='amount' value={12256333.12}/>
        <Format v='percent' value={0.526}/>
        <Format v='currency' value={1025}/>
        <Format v='size' />
        <Format v='size' value={1024.56}/>
        <Format v='weight' value='fghj'/>
        <Format v='weight' value='12335'/>
        <Format v='weight' placeholder />

        <Format v='day' value='2024-02-27'/>
        <Format v='month' value='2024-02-27'/>
        <Format v='year' value='2024-02-27'/>
        <Format v='day/month/year' value='2024-02-27'/>
        <Format v='day-of-month-year' value='2024-02-27'/>
        <Format v='day-name' value='2024-02-27'/>
        <Format v='month-name' value='2024-02-27'/>
        <Format v='month-name' placeholder/>

      </Block>

      {children}
    </BasePage>
  )
}

GuidePage.displayName = 'GuidePage'

export default GuidePage
