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
import Divider from 'components/layouts/Divider'
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

      <Actions className={css.Main} v='y' grow={1} size='md' tooltipSide='right' color='primary' weight={400} g='xxs' format='capitalize' group={menu.isOn} icons={!menu.isOn}>
        <Actions.AppLink start='crossword' to='APPS' content={t('LABEL.APPS')} />
        <Actions.AppLink start='dashboard' to='BOARDS' content={t('LABEL.BOARDS')} />
        <Actions.AppLink start='widgets' to='WIDGETS' content={t('LABEL.WIDGETS')} />
        <Actions.AppLink start='dns' to='SERVICES' content={t('LABEL.SERVICES')} />
        <Actions.AppLink start='g_translate' to='TRANSLATES' content={t('LABEL.TRANSLATES')} />
        {/* <Actions.AppLink start='shopping_cart' to='PACKAGES' content={t('LABEL.PACKAGES')} /> */}

        {children}

        <Item stretch />

        {menu.isOn ? <Divider v='x-end' content='General' /> : <Divider v='x' />}
        <Actions.Button start='brightness_alert' content={t('LABEL.ALERT')} color='error' />
        <Actions.AppLink start='auto_stories' to='GUIDE' content={t('LABEL.GUIDE')} />
        <Actions.AppLink start='local_atm' to='DONATION' content={t('LABEL.DONATION')} />
        <Actions.AppLink start='support_agent' to='SUPPORT' content={t('LABEL.SUPPORT')} />

        <Actions.Button start={`${theme.current ?? 'light'}_mode`} content={t(theme.current as TranslateKeys)} onClick={theme.toggle} active />
        <Actions.Button start='language' content={t('LABEL.LANGUAGE')} />
        {menu.isOn
          ? <Actions.Button start='left_panel_close' content={t('ACTION.CLOSE')} onClick={menu.off} />
          : <Actions.Button start='left_panel_open' content={t('ACTION.OPEN')} onClick={menu.on} />
        }
      </Actions>
    </Aside>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
