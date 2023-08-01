import React from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'

// ---| components |---
import Divider from 'components/lib/Divider'
import Block from 'components/Block'
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
    <Block className={_className} direction='y' gap='sm' {...otherProps}>
      <Logo image={app.isMenu('opened') ? 'full logo' : 'short logo'} href='/' />

      <Block grow={1} gap='sm' direction='y'>
        <Divider className={css.Divider} textAlign='left' content={app.isMenu('opened') && app.t('GROUPS.DISPLAY')} />
        <AppMenuItem icon='dashboard' content={app.t('LINKS.DASHBOARD')} to='/dashboard' />
        <AppMenuItem icon='insert_chart' content={app.t('LINKS.WIDGET')} to='/widget' />

        <Block.Spacer />

        <Divider className={css.Divider} textAlign='left' content={app.isMenu('opened') && app.t('GROUPS.HELP')} />
        <AppMenuItem icon='auto_stories' content={app.t('LINKS.GUIDE')} to='/guide' />
        <AppMenuItem icon='paid' content={app.t('LINKS.DONATION')} to='/donation' />
        <AppMenuItem icon='support_agent' content={app.t('LINKS.SUPPORT')} to='/support' />
      </Block>

      <Divider className={css.Divider} textAlign='left' content={app.isMenu('opened') && app.t('GROUPS.SYSTEM')} />
      <AppMenuItem icon={`${app.theme}_mode`} content={app.theme.toUpperCase()} onClick={app.toggleTheme} />
      <AppMenuItem icon='language' content={app.language.toUpperCase()} />
      <AppMenuItem icon={app.isMode('edit') ? 'developer_mode_tv' : 'tv'} content={app.mode.toUpperCase()} onClick={app.toggleMode} />

      <Divider className={css.Divider} />
      <AppMenuItem
        icon={app.isMenu('opened') ? 'left_panel_close' : 'left_panel_open'}
        content={app.isMenu('opened') ? app.t('BUTTONS.CLOSE_MENU') : app.t('BUTTONS.OPEN_MENU')}
        onClick={app.toggleMenu}
      />

      {children}
    </Block>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
