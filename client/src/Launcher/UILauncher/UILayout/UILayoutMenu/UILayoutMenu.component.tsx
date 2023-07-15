import React, { useMemo } from 'react'

// ---| core |---
import { useUILauncher, useSystemLauncher } from 'Launcher'

// ---| components |---
import Divider, { DividerProps } from 'components/lib/Divider'
import Button, { ButtonProps } from 'components/lib/Button'
import Block from 'components/Block'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './UILayoutMenu.module.scss'

export type UIMenuItem<T extends string, O extends object = object> = O & {
  type: T,
  icon?: ButtonProps['icon'],
  content?: React.ReactNode
}
export type UILayoutMenuLogo = UIMenuItem<'logo'>
export type UILayoutMenuButton = UIMenuItem<'button', { main?: boolean, group?: string }>
export type UILayoutMenuGroup = UIMenuItem<'group', { key: string, place?: 'top' | 'bottom' }>
export type UILayoutMenuItem = UILayoutMenuLogo | UILayoutMenuGroup | UILayoutMenuButton


const TEST_MENU_ITEMS: UILayoutMenuItem[] = [
  { type: 'button', icon: 'close', content: '1', main: true },
  { type: 'button', icon: 'close', content: '2', group: 'group2' },
  { type: 'button', icon: 'close', content: '3', group: 'group3' },
  { type: 'button', icon: 'close', content: '4', main: true },
  { type: 'group', key: 'group2', content: '2', place: 'bottom' },
  { type: 'group', key: 'group3', content: '3', place: 'top' },
  { type: 'logo', icon: 'close', content: '5' },
]

export type UILayoutMenuProps = {
  className?: string
  children?: React.ReactNode
  items?: UILayoutMenuItem[]
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <UILayoutMenu />
 */
export function UILayoutMenu(props: UILayoutMenuProps): JSX.Element {
  const { items = [], children, className, ...otherProps } = props
  const _className = cn(css.UILayoutMenu, className)
  const ui = useUILauncher()
  const system = useSystemLauncher()

  const menuMap = useMemo(() => {
    const logo = items.find((item) => item.type === 'logo')
    const buttons = items.filter((item) => item.type === 'button') as UILayoutMenuButton[]
    const groups = [
      { type: 'group', key: 'top', place: 'top' },
      ...(items as UILayoutMenuGroup[]),
      { type: 'group', key: 'bottom', place: 'bottom' },
    ]
      .filter((item) => item.type === 'group')
      .map((item) => ({
        ...item,
        items: buttons.filter((btn) => btn.group === item.key),
      }))

    return { logo }
  }, [items])

  // TODO: if groups items length is 0 then not render divider

  return (
    <Block className={_className} type='column-center' {...otherProps}>
      <Block.Start className={css.StartActions}>
        <Button className={css.Button} icon='logo_dev' size='large' />
      </Block.Start>

      <Block.Center className={css.CenterActions}>
        <Divider className={css.divider} />
        <Button className={css.Button} icon='dashboard' size='large' />
        <Button className={css.Button} icon='insert_chart' size='large' />
      </Block.Center>

      <Block.End className={css.EndActions}>
        <Button className={`${css.Button} ${css.ActiveButton}`} icon='auto_stories' size='large' />
        <Button className={css.Button} icon='paid' size='large' />
        <Button className={css.Button} icon='keyboard' size='large' />
        <Button className={css.Button} icon='support_agent' size='large' />
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

UILayoutMenu.displayName = 'UILayoutMenu'

export default UILayoutMenu
