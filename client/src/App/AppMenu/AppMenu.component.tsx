import React from 'react'

// ---| core |---
import { t, TranslateKeys } from 'locale'
import { useTheme } from 'theme'
import { cn } from 'tools'
import { useToggler } from 'hooks'

// ---| components |---
import Logo from 'components/views/Logo'
import Item from 'components/layouts/Item'
import Actions from 'components/layouts/Actions'
import Aside, { AsideProps } from 'components/layouts/Aside'

// ---| self |---
import css from './AppMenu.module.scss'

export type AppMenuProps = AsideProps

/**
 * Component description.
 * @example
 * <AppMenu />
 */
export function AppMenu(props: AppMenuProps) {
  const { children, className, ...otherProps } = props
  const menu = useToggler()
  const theme = useTheme()

  // TODO: color service button in read if there is not internet connection?
  // TODO: install Boards and Apps as SPA

  return (
    <Aside className={cn(css.AppMenu, className)} as='nav' g='xs' p={menu.isOn ? 0 : 'xs'} {...otherProps}>
      <Logo width='2rem' />

      <Actions className={css.Main} v='y' grow={1} size='md' tooltipSide='right' color='primary' weight={400} format='capitalize' menu={menu.isOn}>
        <Actions.AppLink start='crossword' to='APPS' tooltip={t('LABEL.APPS')} />
        <Actions.AppLink start='dashboard' to='BOARDS' tooltip={t('LABEL.BOARDS')} />
        <Actions.AppLink start='widgets' to='WIDGETS' tooltip={t('LABEL.WIDGETS')} />
        <Actions.AppLink start='dns' to='SERVICES' tooltip={t('LABEL.SERVICES')} />
        <Actions.AppLink start='g_translate' to='TRANSLATES' tooltip={t('LABEL.TRANSLATES')} />
        {/* <Actions.AppLink start='shopping_cart' to='PACKAGES' tooltip={t('LABEL.PACKAGES')} /> */}

        {children}

        <Item stretch />

        <Actions.Button start='brightness_alert' tooltip={t('LABEL.ALERT')} color='error' />
        <Actions.AppLink start='auto_stories' to='GUIDE' tooltip={t('LABEL.GUIDE')} />
        <Actions.AppLink start='local_atm' to='DONATION' tooltip={t('LABEL.DONATION')} />
        <Actions.AppLink start='support_agent' to='SUPPORT' tooltip={t('LABEL.SUPPORT')} />

        <Actions.Button start={`${theme.current ?? 'light'}_mode`} tooltip={t(theme.current as TranslateKeys)} onClick={theme.toggle} active />
        <Actions.Button start='language' tooltip={t('LABEL.LANGUAGE')} />
        {menu.isOn
          ? <Actions.Button start='left_panel_close' tooltip={t('ACTION.CLOSE')} onClick={menu.off} />
          : <Actions.Button start='left_panel_open' tooltip={t('ACTION.OPEN')} onClick={menu.on} />
        }
      </Actions>
    </Aside>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
