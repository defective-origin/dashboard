import React from 'react'

// ---| core |---
import { useLocale } from 'locale'
import { useTheme } from 'theme'
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
  const _className = cn(css.AppMenu, className)
  const theme = useTheme()
  const locale = useLocale()

  return (
    <Aside className={_className} as='nav' {...otherProps}>
      <Logo />

      <Actions className={css.Main} v='y' grow={1}>
        <Actions.Nav start='dashboard' to='BOARDS' tooltip={locale.t('ROUTE.BOARDS')} tooltipSide='right' size='lg' />
        <Actions.Nav start='insert_chart' to='WIDGETS' tooltip={locale.t('ROUTE.WIDGETS')} tooltipSide='right' size='lg' />
        <Actions.Button start='add' to='WIDGETS' tooltip='Add Board' tooltipSide='right' size='lg' />

        {children}
      </Actions>

      <Actions className={css.Extra} v='y'>
        <Actions.Nav start='auto_stories' to='GUIDE' tooltip={locale.t('ROUTE.GUIDE')} tooltipSide='right' size='lg' />
        <Actions.Nav start='local_atm' to='DONATION' tooltip={locale.t('ROUTE.DONATION')} tooltipSide='right' size='lg' />
        <Actions.Nav start='support_agent' to='SUPPORT' tooltip={locale.t('ROUTE.SUPPORT')} tooltipSide='right' size='lg' />

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
      </Actions>
    </Aside>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
