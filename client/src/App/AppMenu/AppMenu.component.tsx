import React from 'react'

// ---| core |---
import { useLocale } from 'locale'
import { ROUTE_LINKS } from 'router'
import { useLauncher } from 'Launcher'
import { cn } from 'tools'

// ---| components |---
import Actions from 'components/Actions'
import Logo from 'components/Logo'

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
  const locale = useLocale()
  const _className = cn(css.AppMenu, className)

  // TODO: implement via Menu instead of Actions

  return (
    <Actions className={_className} direction='y' align='stretch' {...otherProps}>
      <Logo v='logo' href={ROUTE_LINKS.ROOT} />

      <AppMenuItem start='dashboard' href={ROUTE_LINKS.BOARDS} tooltip={locale.t('LINKS.BOARDS')} />
      <AppMenuItem start='insert_chart' href={ROUTE_LINKS.WIDGETS} tooltip={locale.t('LINKS.WIDGETS')} />

      <AppMenuItem start='auto_stories' href={ROUTE_LINKS.GUIDE} tooltip={locale.t('LINKS.GUIDE')} />
      <AppMenuItem start='paid' href={ROUTE_LINKS.DONATION} tooltip={locale.t('LINKS.DONATION')} />
      <AppMenuItem start='support_agent' href={ROUTE_LINKS.SUPPORT} tooltip={locale.t('LINKS.SUPPORT')} />

      <AppMenuItem start={`${app.theme()}_mode`} onClick={app.toggleTheme} tooltip={app.theme()} fillIcon />
      <AppMenuItem start='language' tooltip={locale.language} />

      {children}
    </Actions>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
