import React from 'react'

// ---| core |---
import { useLocale } from 'locale'
import { ROUTE_LINKS } from 'router'
import { useLauncher } from 'Launcher'
import { cn } from 'tools'

// ---| components |---
import Aside, { AsideProps } from 'components/Aside'
import Logo from 'components/Logo'
import Actions from 'components/Actions'

// ---| self |---
import css from './AppMenu.module.scss'

export type AppMenuProps = AsideProps

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

  return (
    <Aside className={_className} as='nav' {...otherProps}>
      <Logo v='logo' href={ROUTE_LINKS.ROOT} width={42} />

      <Actions className={css.Main} v='y' grow={1}>
        <Actions.Nav start='dashboard' to={ROUTE_LINKS.BOARDS} tooltip={locale.t('LINKS.BOARDS')} tooltipSide='right' size='lg' />
        <Actions.Nav start='insert_chart' to={ROUTE_LINKS.WIDGETS} tooltip={locale.t('LINKS.WIDGETS')} tooltipSide='right' size='lg' />
        <Actions.Button start='add' to={ROUTE_LINKS.WIDGETS} tooltip='Add Board' tooltipSide='right' size='lg' />

        {children}
      </Actions>

      <Actions className={css.Extra} v='y'>
        <Actions.Nav start='auto_stories' to={ROUTE_LINKS.GUIDE} tooltip={locale.t('LINKS.GUIDE')} tooltipSide='right' size='lg' />
        <Actions.Nav start='local_atm' to={ROUTE_LINKS.DONATION} tooltip={locale.t('LINKS.DONATION')} tooltipSide='right' size='lg' />
        <Actions.Nav start='support_agent' to={ROUTE_LINKS.SUPPORT} tooltip={locale.t('LINKS.SUPPORT')} tooltipSide='right' size='lg' />

        <Actions.Button v='text' start={`${app.theme()}_mode`} onClick={app.toggleTheme} tooltip={app.theme()} tooltipSide='right' size='lg' active />
        <Actions.Menu
          trigger={(o) => (
            <Actions.Button
              v='text'
              active={o.open}
              content={locale.language}
            />
          )}
        >
          {locale.languages.map((lang) => <Actions.Button key={lang} v='text' size='xs' stretch content={lang} />)}
        </Actions.Menu>
      </Actions>
    </Aside>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
