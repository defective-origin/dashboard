import React from 'react'

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
import AppMenuItem from './AppMenuItem'

export type AppMenuProps = {
  className?: string
  children?: React.ReactNode
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

  return (
    <Block className={_className} type='column-center' {...otherProps}>
      <Block.Start className={css.StartActions}>
        <AppMenuItem icon='logo_dev' content='LOGO' to='/' />
      </Block.Start>

      <Block.Center className={css.CenterActions}>
        <Divider />
        <AppMenuItem icon='dashboard' content='DASHBOARD' to='/dashboard' />
        <AppMenuItem icon='insert_chart' content='WIDGET' to='/widget' />
      </Block.Center>

      <Block.End className={css.EndActions}>
        <AppMenuItem icon='auto_stories' content='GUIDE' to='/guide' />
        <AppMenuItem icon='paid' content='DONATION' to='/donation' />
        <AppMenuItem icon='support_agent' content='SUPPORT' to='/support' />

        <Divider />
        <AppMenuItem icon={`${app.theme}_mode`} content={app.theme.toUpperCase()} onClick={app.toggleTheme} />
        <AppMenuItem icon='language' content={app.language.toUpperCase()} />
        <AppMenuItem icon={app.isMode('edit') ? 'developer_mode_tv' : 'tv'} content={app.mode.toUpperCase()} onClick={app.toggleMode} />

        <Divider />
        <AppMenuItem icon={app.isMenu('opened') ? 'left_panel_close' : 'left_panel_open'} content='MENU' onClick={app.toggleMenu} />
      </Block.End>

      {children}
    </Block>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
