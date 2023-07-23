import React, { useMemo } from 'react'

// ---| core |---
import { useUILauncher, useSystemLauncher } from 'Launcher'
import { Link } from 'router'

// ---| components |---
import Divider, { DividerProps } from 'components/lib/Divider'
import Button, { ButtonProps } from 'components/lib/Button'
import Block from 'components/Block'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppMenu.module.scss'

export type MenuItem<T extends string, O extends object = object> = O & {
  type: T,
  icon?: ButtonProps['icon'],
  content?: React.ReactNode
}
export type UIMenuLogo = MenuItem<'logo'>
export type UIMenuButton = MenuItem<'button', { main?: boolean, group?: string }>
export type UIMenuGroup = MenuItem<'group', { key: string, place?: 'top' | 'bottom' }>
export type UIMenuItem = UIMenuLogo | UIMenuGroup | UIMenuButton


const TEST_MENU_ITEMS: UIMenuItem[] = [
  { type: 'button', icon: 'close', content: '1', main: true },
  { type: 'button', icon: 'close', content: '2', group: 'group2' },
  { type: 'button', icon: 'close', content: '3', group: 'group3' },
  { type: 'button', icon: 'close', content: '4', main: true },
  { type: 'group', key: 'group2', content: '2', place: 'bottom' },
  { type: 'group', key: 'group3', content: '3', place: 'top' },
  { type: 'logo', icon: 'close', content: '5' },
]

export type AppMenuProps = {
  className?: string
  children?: React.ReactNode
  // items?: UIMenuItem[]
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppMenu />
 */
export function AppMenu(props: AppMenuProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppMenu, className)
  const ui = useUILauncher()
  const system = useSystemLauncher()
  const getProps = (obj: any) => ({ className: obj.isPartiallyCurrent ? cn(css.Button, css.ActiveButton) : css.Button })

  // TODO: if groups items length is 0 then not render divider
  // TODO: groups, items, position top bottom

  return (
    <Block className={_className} type='column-center' {...otherProps}>
      <Block.Start className={css.StartActions}>
        <Button className={css.Button} icon='logo_dev' size='large' />
      </Block.Start>

      <Block.Center className={css.CenterActions}>
        <Divider className={css.divider} />
        <Link getProps={getProps} to='/dashboard'><Button className={css.Button} icon='dashboard' size='large' /></Link>
        <Link getProps={getProps} to='/widget'><Button className={css.Button} icon='insert_chart' size='large' /></Link>
      </Block.Center>

      <Block.End className={css.EndActions}>
        <Link getProps={getProps} to='/guide'><Button className={css.Button} icon='auto_stories' size='large' /></Link>
        <Link getProps={getProps} to='/donation'><Button className={css.Button} icon='paid' size='large' /></Link>
        <Link getProps={getProps} to='/hotkeys'><Button className={css.Button} icon='keyboard' size='large' /></Link>
        <Link getProps={getProps} to='/support'><Button className={css.Button} icon='support_agent' size='large' /></Link>
        <Divider className={css.divider} />
        <Button className={css.Button} icon={`${ui.theme}_mode`} size='large' onClick={ui.toggleTheme} />
        <Button className={css.Button} size='large' content={system.language} />
        <Button className={css.Button} icon={ui.isMode('edit') ? 'developer_mode_tv' : 'tv'} size='large' onClick={ui.toggleMode} />
        <Divider className={css.divider} />
        <Button className={css.Button} icon={ui.isMenu('opened') ? 'left_panel_close' : 'left_panel_open'} size='large' onClick={ui.toggleMenu} />
      </Block.End>

      {children}
    </Block>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
