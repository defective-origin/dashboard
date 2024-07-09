import React from 'react'

// ---| core |---
import { t } from 'locale'
import { useTheme } from 'theme'
import { cn } from 'tools'

// ---| components |---
import Aside, { AsideProps } from 'components/Aside'
import Actions from 'components/Actions'

// ---| components |---
import Account from 'screens/Account'

// ---| self |---
import css from './AppMenu.module.scss'
import Copyright from 'screens/Copyright'

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
  const _className = cn(css.AppMenu, className)
  const theme = useTheme()

  return (
    <Aside className={_className} as='nav' {...otherProps}>
      <Account />

      <Actions className={css.Main} v='y' grow={1}>
        <Actions.Nav start='insert_chart' to='WIDGETS' tooltip={t('ROUTE.WIDGETS')} tooltipSide='right' size='lg' />
        <Actions.Nav start='dashboard' to='BOARDS' tooltip={t('ROUTE.BOARDS')} tooltipSide='right' size='lg' />
        {/* <Actions.Nav start='network_node' tooltip='ENDPOINTS' tooltipSide='right' size='lg' /> */}

        {children}
      </Actions>

      <Actions className={css.Extra} v='y'>
        <Actions.Nav start='auto_stories' to='GUIDE' tooltip={t('ROUTE.GUIDE')} tooltipSide='right' size='lg' />
        <Actions.Nav start='local_atm' to='DONATION' tooltip={t('ROUTE.DONATION')} tooltipSide='right' size='lg' />
        <Actions.Nav start='support_agent' to='SUPPORT' tooltip={t('ROUTE.SUPPORT')} tooltipSide='right' size='lg' />

        <Actions.Button v='text' start={`${theme.current}_mode`} onClick={theme.toggle} tooltip={theme.current} tooltipSide='right' size='lg' active />
        {/* <Actions.Menu
          trigger={(o) => (
            <Actions.Button
              v='text'
              active={o.open}
              content={locale.language}
            />
          )}
        >
          {locale.languages.map((lang) => <Actions.Button key={lang} v='text' size='xs' stretch content={lang} />)}
        </Actions.Menu> */}

        <Copyright className={css.Copyright} tooltip='right' />
      </Actions>

    </Aside>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
