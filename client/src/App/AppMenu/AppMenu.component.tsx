import React from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'

// ---| components |---
import Actions from 'components/Actions'
import Logo from 'components/Logo'

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
    <Actions className={_className} direction='y' gap='sm' align='stretch' {...otherProps}>
      <Logo full='full logo' short='short logo' open={app.isMenu('opened')} href='/' />

      <Actions grow={1} gap='sm' direction='y' align='stretch'>
        <Actions.Divider className={css.Divider} textAlign='left' content={app.isMenu('opened') && app.t('GROUPS.DISPLAY')} />
        <AppMenuItem start='dashboard' content={app.t('LINKS.DASHBOARD')} href='/dashboard' />
        <AppMenuItem start='insert_chart' content={app.t('LINKS.WIDGET')} href='/widget' />

        <Actions.Spacer />

        <Actions.Divider className={css.Divider} textAlign='left' content={app.isMenu('opened') && app.t('GROUPS.HELP')} />
        <AppMenuItem start='auto_stories' content={app.t('LINKS.GUIDE')} href='/guide' />
        <AppMenuItem start='paid' content={app.t('LINKS.DONATION')} href='/donation' />
        <AppMenuItem start='support_agent' content={app.t('LINKS.SUPPORT')} href='/support' />
      </Actions>

      <Actions.Divider className={css.Divider} textAlign='left' content={app.isMenu('opened') && app.t('GROUPS.SYSTEM')} />
      <AppMenuItem start={`${app.theme}_mode`} content={app.theme.toUpperCase()} onClick={app.toggleTheme} />
      <AppMenuItem start='language' content={app.language.toUpperCase()} />
      <AppMenuItem start={app.isMode('edit') ? 'developer_mode_tv' : 'tv'} content={app.mode.toUpperCase()} onClick={app.toggleMode} />

      <Actions.Divider className={css.Divider} />
      {app.isMenu('opened') && <AppMenuItem start='left_panel_close' content={app.t('BUTTONS.CLOSE_MENU')} onClick={app.toggleMenu} />}
      {app.isMenu('closed') && <AppMenuItem start='left_panel_open' content={app.t('BUTTONS.OPEN_MENU')} onClick={app.toggleMenu} />}

      {children}
    </Actions>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
