import React, { useEffect, useMemo } from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'

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



export function is<T>(a: T, b: T): a is T {
  return a === b
}

export function toggle<T>(current: T, a: T, b: T): T {
  return is(current, a) ? b : a
}


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
  const app = useLauncher()

  // TODO: if groups items length is 0 then not render divider
  useEffect(() => {
    const actions = {
      isTheme: (store: any, value: any) => is(store.current.theme, value),
      toggleTheme: (store: any) => app.update({ theme: toggle(store.current.theme, 'light', 'dark') }),

      isMode: (store: any, value: any) => is(store.current.mode, value),
      toggleMode: (store: any) => app.update({ mode: toggle(store.current.mode, 'edit', 'view')}),

      isMenu: (store: any, value: any) => is(store.current.menu, value),
      toggleMenu: (store: any) => app.update({ menu: toggle(store.current.menu, 'opened', 'closed') }),
    }

    app.register(actions)

    return () => app.unregister(actions)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  useEffect(() => {
    document.body.classList.add(app.theme)
    document.body.classList.remove(toggle(app.theme, 'light', 'dark'))
  }, [app, app.theme])

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
        <Button className={css.Button} icon={`${app.theme}_mode`} size='large' onClick={app.toggleTheme} />
        <Button className={css.Button} size='large' content={app.language} />
        <Button className={css.Button} icon={app.isMode('edit') ? 'developer_mode_tv' : 'tv'} size='large' onClick={app.toggleMode} />
        <Divider className={css.divider} />
        <Button className={css.Button} icon={app.isMenu('opened') ? 'left_panel_close' : 'left_panel_open'} size='large' onClick={app.toggleMenu} />
      </Block.End>

      {children}
    </Block>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
