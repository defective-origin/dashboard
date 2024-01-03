import React from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'
import { ROUTE_LINKS } from 'router'

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

  // TODO: implement via Menu instead of Actions
  // TODO: tooltip instead of content
  return (
    <Actions className={_className} direction='y' align='stretch' {...otherProps}>
      <Logo className={css.Logo} v='logo' href={ROUTE_LINKS.ROOT} />

      <AppMenuItem start='dashboard' content={app.t('LINKS.DASHBOARDS')} href={ROUTE_LINKS.DASHBOARDS} />
      <AppMenuItem start='insert_chart' content={app.t('LINKS.WIDGETS')} href={ROUTE_LINKS.WIDGETS} />

      <Actions.Spacer />

      <AppMenuItem start='auto_stories' content={app.t('LINKS.GUIDE')} href={ROUTE_LINKS.GUIDE} />
      <AppMenuItem start='paid' content={app.t('LINKS.DONATION')} href={ROUTE_LINKS.DONATION} />
      <AppMenuItem start='support_agent' content={app.t('LINKS.SUPPORT')} href={ROUTE_LINKS.SUPPORT} />

      <AppMenuItem start='language' content={app.language.toUpperCase()} />
      <AppMenuItem start={`${app.theme}_mode`} content={app.theme.toUpperCase()} onClick={app.toggleTheme} fillIcon />
      <AppMenuItem start={app.isMode('edit') ? 'developer_mode_tv' : 'tv'} content={app.mode.toUpperCase()} onClick={app.toggleMode} />

      {children}
    </Actions>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
