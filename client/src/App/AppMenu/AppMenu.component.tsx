import React from 'react'

// ---| core |---
import { useLocale } from 'locale'
import { ROUTE_LINKS } from 'router'
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
  const locale = useLocale()
  const _className = cn(css.AppMenu, className)

  // TODO: implement via Menu instead of Actions
  // TODO: tooltip instead of content
  return (
    <Actions className={_className} direction='y' align='stretch' {...otherProps}>
      <Logo className={css.Logo} v='logo' href={ROUTE_LINKS.ROOT} />

      <AppMenuItem start='dashboard' content={locale.t('LINKS.BOARDS')} href={ROUTE_LINKS.BOARDS} />
      <AppMenuItem start='insert_chart' content={locale.t('LINKS.WIDGETS')} href={ROUTE_LINKS.WIDGETS} />

      <Actions.Spacer />

      <AppMenuItem start='auto_stories' content={locale.t('LINKS.GUIDE')} href={ROUTE_LINKS.GUIDE} />
      <AppMenuItem start='paid' content={locale.t('LINKS.DONATION')} href={ROUTE_LINKS.DONATION} />
      <AppMenuItem start='support_agent' content={locale.t('LINKS.SUPPORT')} href={ROUTE_LINKS.SUPPORT} />

      <AppMenuItem start={`${app.theme()}_mode`} content={app.theme()} onClick={app.toggleTheme} fillIcon />
      <AppMenuItem start='language' content={locale.language.toUpperCase()} />

      {children}
    </Actions>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
