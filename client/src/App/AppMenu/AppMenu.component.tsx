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

  const toActionProps = (name: string) => menu.isOn
    ? { content: t(name as TranslateKeys) }
    : { tooltip: t(name as TranslateKeys) }

  return (
    <Aside className={cn(css.AppMenu, className)} as='nav' g='xs' p='xs' {...otherProps}>
      <Logo width='2rem' />

      <Actions className={css.Main} v='y' grow={1} size='md' tooltipSide='right' color='primary' weight={400} format='capitalize' aligns={menu.isOn ? 'stretch' : 'center'}>
        <Actions.AppLink start='crossword' to='APPS' {...toActionProps('LABEL.APPS')} />
        <Actions.AppLink start='dashboard' to='BOARDS' {...toActionProps('LABEL.BOARDS')} />
        <Actions.AppLink start='widgets' to='WIDGETS' {...toActionProps('LABEL.WIDGETS')} />
        <Actions.AppLink start='dns' to='SERVICES' {...toActionProps('LABEL.SERVICES')} />
        <Actions.AppLink start='g_translate' to='TRANSLATES' {...toActionProps('LABEL.TRANSLATES')} />
        {/* <Actions.AppLink start='shopping_cart' to='PACKAGES' {...toActionName('LABEL.PACKAGES')} /> */}

        {children}

        <Item stretch />

        <Actions.Button start='brightness_alert' {...toActionProps('LABEL.ALERT')} color='error' />
        <Actions.AppLink start='auto_stories' to='GUIDE' {...toActionProps('LABEL.GUIDE')} />
        <Actions.AppLink start='local_atm' to='DONATION' {...toActionProps('LABEL.DONATION')} />
        <Actions.AppLink start='support_agent' to='SUPPORT' {...toActionProps('LABEL.SUPPORT')} />

        <Actions.Button start={`${theme.current ?? 'light'}_mode`} {...toActionProps(theme.current)} onClick={theme.toggle} active />
        <Actions.Button start='language' {...toActionProps('LABEL.LANGUAGE')} />
        {menu.isOn
          ? <Actions.Button start='left_panel_close' {...toActionProps('ACTION.CLOSE')} onClick={menu.off} />
          : <Actions.Button start='left_panel_open' {...toActionProps('ACTION.OPEN')} onClick={menu.on} />
        }
      </Actions>
    </Aside>
  )
}

AppMenu.displayName = 'AppMenu'

export default AppMenu
