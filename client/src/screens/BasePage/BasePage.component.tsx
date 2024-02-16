import React, { useCallback } from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'
import { TranslateKeys, useLocale } from 'locale'
import { cn, react } from 'tools'

// ---| screens |---
import Copyright from 'screens/Copyright'

// ---| components |---
import Text from 'components/Text'
import Page, { PageProps } from 'components/Page'
import Actions, { ActionItem } from 'components/Actions'
import Portal from 'components/Portal'
import Scroll, { ScrollVariant } from 'components/Scroll'

// ---| self |---
import css from './BasePage.module.scss'

export type BasePageProps = PageProps & {
  name?: TranslateKeys
  scroll?: ScrollVariant
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <BasePage />
 */
export function BasePage(props: BasePageProps): JSX.Element {
  const { scroll, name, meta, children, className, ...otherProps } = props
  const _className = cn(css.BasePage, className)
  const app = useLauncher()
  const locale = useLocale()
  const pageName = locale.t(name)
  const tabName = locale.t('SYSTEM.TAB_NAME', { title: pageName })
  const checkMessage = useCallback(() => app.toast.message({
    content: 'TEST MESSAGE',
    onClose: () => console.log('CLOSE MESSAGE'),
    onSuccess: () => console.log('SUCCESS MESSAGE'),
  }), [app])
  const checkGuard = useCallback(() => app.toast.guard({
    content: 'You have unsaved changes. \n Are you sure you want to leave without save?',
    onClose: () => console.log('CLOSE GUARD'),
    onSuccess: () => console.log('SUCCESS GUARD'),
  }), [app])
  const checkAlert = useCallback(() => {
    app.toast.alert({content: 'Test Text', color: 'error'})
    app.toast.alert({content: 'Test Text', color: 'warning'})
    app.toast.alert({content: 'Test Text', color: 'info'})
    app.toast.alert({content: 'Test Text', color: 'success'})
  }, [app])
  const testActions: ActionItem[] = [
    { key: '3', start: 'close', size: 'xs', v: 'outlined', content: 'TEST GUARD', color: 'error', onClick: checkGuard },
    { key: '2', start: 'close', size: 'xs', v: 'outlined', content: 'TEST MESSAGE', color: 'warning', onClick: checkMessage },
    { key: '1', start: 'close', size: 'xs', v: 'outlined', content: 'TEST ALERT', color: 'info', onClick: checkAlert },
    !app.isAuthorized() && { key: '0', start: 'login', size: 'xs', v: 'outlined', content: locale.t('BUTTONS.LOGIN'), color: 'secondary', onClick: app.login },
  ].filter(Boolean) as ActionItem[]

  return (
    <Page className={_className} name={tabName} meta={meta} v='columns' stretch {...otherProps}>
      {/* portal name and actions to AppHeader component */}
      <Portal name='page-name' content={<Text.H1 color='primary' content={pageName} />} />
      <Portal name='page-actions' content={<Actions items={testActions} gap='xs' />} />

      <Page.Content gap='xs'>
        <Scroll v={scroll} actions margin={5} />

        {children}
      </Page.Content>

      <Page.Footer direction='x' justify='center'>
        <Copyright />
      </Page.Footer>
    </Page>
  )
}

export default react.attachComponents(BasePage, {
  LeftAside: Page.LeftAside, // TODO: remove?
  RightAside: Page.RightAside,
  Footer: Page.Footer,
  Header: Page.Header,
  Content: Page.Content,
  Section: Page.Section,
  Block: Page.Block,
})
