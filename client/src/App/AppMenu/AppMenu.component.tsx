import React from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'

// ---| components |---
import Divider from 'components/lib/Divider'
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
  const app = useLauncher()
  const _className = cn(css.AppMenu, className)

  return (
    <Block className={_className} type='column-center' {...otherProps}>
      <Block.Start className={css.StartActions}>
        <AppMenuItem icon='logo_dev' content='LOGO' to='/' />
      </Block.Start>

      <Block.Center className={css.CenterActions}>
        <Divider className={css.Divider} textAlign='left' content={app.isMenu('opened') && app.t('NAVIGATION.DISPLAY')} />
        <AppMenuItem icon='dashboard' content={app.t('NAVIGATION.DASHBOARD')} to='/dashboard' />
        <AppMenuItem icon='insert_chart' content={app.t('NAVIGATION.WIDGET')} to='/widget' />
      </Block.Center>

      <Block.End className={css.EndActions}>
        <Divider className={css.Divider} textAlign='left' content={app.isMenu('opened') && app.t('NAVIGATION.HELP')} />
        <AppMenuItem icon='auto_stories' content={app.t('NAVIGATION.GUIDE')} to='/guide' />
        <AppMenuItem icon='paid' content={app.t('NAVIGATION.DONATION')} to='/donation' />
        <AppMenuItem icon='support_agent' content={app.t('NAVIGATION.SUPPORT')} to='/support' />

        <Divider className={css.Divider} textAlign='left' content={app.isMenu('opened') && app.t('NAVIGATION.SYSTEM')} />
        <AppMenuItem icon={`${app.theme}_mode`} content={app.theme.toUpperCase()} onClick={app.toggleTheme} />
        <AppMenuItem icon='language' content={app.language.toUpperCase()} />
        <AppMenuItem icon={app.isMode('edit') ? 'developer_mode_tv' : 'tv'} content={app.mode.toUpperCase()} onClick={app.toggleMode} />

        <Divider className={css.Divider} />
        <AppMenuItem
          icon={app.isMenu('opened') ? 'left_panel_close' : 'left_panel_open'}
          content={app.isMenu('opened') ? app.t('BUTTONS.CLOSE_MENU') : app.t('BUTTONS.OPEN_MENU')}
          onClick={app.toggleMenu}
        />
      </Block.End>

      {children}
    </Block>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
