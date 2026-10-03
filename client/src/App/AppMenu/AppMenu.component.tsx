import React from 'react'

// ---| core |---
import { t } from 'locale'
import { useTheme } from 'theme'
import { cn } from 'tools'

// ---| components |---
import Logo from 'components/views/Logo'
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
  const theme = useTheme()

  // TODO: color service button in read if there is not internet connection?
  // TODO: install Boards and Apps as SPA

  return (
    <Aside className={cn(css.AppMenu, className)} as='nav' v='tcb' g='xs' p='xs' {...otherProps}>
      <Logo width='2rem' />

      <Actions className={css.Main} v='y' g='xs' grow={1} size='lg' tooltipSide='right' color='primary'>
        <Actions.AppLink start='crossword' to='APPS' tooltip={t('LABEL.APPS')} />
        <Actions.AppLink start='dashboard' to='BOARDS' tooltip={t('LABEL.BOARDS')} />
        <Actions.AppLink start='widgets' to='WIDGETS' tooltip={t('LABEL.WIDGETS')} />
        <Actions.AppLink start='dns' to='SERVICES' tooltip={t('LABEL.SERVICES')} />
        <Actions.AppLink start='g_translate' to='TRANSLATES' tooltip={t('LABEL.TRANSLATES')} />
        {/* <Actions.AppLink start='shopping_cart' to='PACKAGES' tooltip={t('LABEL.PACKAGES')} /> */}

        {children}
      </Actions>

      <Actions className={css.Extra} v='y' g='xs' size='lg' tooltipSide='right' color='primary'>
        <Actions.Button start='brightness_alert' tooltip={t('LABEL.ALERT')} color='error' />
        <Actions.AppLink start='auto_stories' to='GUIDE' tooltip={t('LABEL.GUIDE')} />
        <Actions.AppLink start='local_atm' to='DONATION' tooltip={t('LABEL.DONATION')} />
        <Actions.AppLink start='support_agent' to='SUPPORT' tooltip={t('LABEL.SUPPORT')} />

        <Actions.Button start={`${theme.current ?? 'light'}_mode`} tooltip={theme.current} onClick={theme.toggle} active />
        <Actions.Button start='language' tooltip={t('LABEL.LANGUAGE')} />
      </Actions>
    </Aside>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
