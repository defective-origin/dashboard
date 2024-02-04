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
import Drawer from 'components/Drawer'
import Dialog from 'components/Dialog'

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
  const testActions: ActionItem[] = [
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
    { variant: 'link', size: 'xl', color: 'warning', href: '/localhost:5173/', withIcon: true },
  ]

  return (
    <BasePage className={_className} name='PAGES.GUIDE' scroll='y' {...otherProps}>
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

      <Block gap='xs' direction='xy' align='center' justify='center'>
        <MenuButton content='MenuButton' tooltip={'MenuButton'} />
        <MenuItem content='MenuItem1' tooltip={'Menuitem1'} />
        <Link href='#' content='Link' tooltip={'Link'} />
        <Link href='#' tooltip={'Link'} />
        <Button content='Button' tooltip={'Button'} />
      </Block>

      <Block gap='xs' direction='xy' align='center' justify='center'>
        <Icon v='close' size='xl' loading />
        <Image v='logo' loading />
        <Text start='close' content='text' end='check_circle' size='xl' loading />
        <Link start='close' content='text' end='check_circle' size='xl' loading />
        <Button start='close' content='text' end='check_circle' size='xl' loading />
        <MenuItem start='close' content='text' end='check_circle' size='xl' loading />
        <MenuButton start='close' content='text' end='check_circle' size='xl' loading/>
      </Block>

      <Block gap='xs' direction='xy' align='center' justify='center' padding='xl'>
        <Drawer anchor='left' name='left'>
          <MenuItem start='check_circle' content='text' end='close' size='md' />
          <MenuItem start='check_circle' content='text' end='close' size='md' />
          <MenuItem start='check_circle' content='text' end='close' size='md' />
        </Drawer>
        <Drawer anchor='right' name='right'>
          <MenuItem start='check_circle' content='text' end='close' size='md' />
          <MenuItem start='check_circle' content='text' end='close' size='md' />
          <MenuItem start='check_circle' content='text' end='close' size='md' />
        </Drawer>
        <Drawer anchor='bottom' name='bottom'>
          <MenuItem start='check_circle' content='text' end='close' size='md' />
          <MenuItem start='check_circle' content='text' end='close' size='md' />
          <MenuItem start='check_circle' content='text' end='close' size='md' />
        </Drawer>
        <Drawer anchor='top' name='top'>
          <MenuItem start='check_circle' content='text' end='close' size='md' />
          <MenuItem start='check_circle' content='text' end='close' size='md' />
          <MenuItem start='check_circle' content='text' end='close' size='md' />
        </Drawer>

        <Dialog name='Open dialog'>
          <Dialog.Title title='Use Googles location service?' />
          <Dialog.Content>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
          </Dialog.Content>
          <Dialog.Actions>
            <Button content='Disagree' onClick={() => console.log('Disagree')}/>
            <Button content='Agree' onClick={() => console.log('Agree')}/>
          </Dialog.Actions>
        </Dialog>

      </Block>

      {children}
    </BasePage>
  )
}

GuidePage.displayName = 'GuidePage'

export default GuidePage
