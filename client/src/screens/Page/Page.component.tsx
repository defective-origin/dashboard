import React, { useCallback } from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'
import { TranslateKeys } from 'locale'

// ---| screens |---
import Copyright from 'screens/Copyright'

// ---| components |---
import Text from 'components/Text'
import Block from 'components/Block'
import Section from 'components/Section'
import Head, { HeadItem } from 'components/Head'
import Layout, { LayoutProps } from 'components/Layout'
import Actions, { ActionItem } from 'components/Actions'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Page.module.scss'
import Portal from 'components/Portal'

export type PageProps = LayoutProps & {
  className?: string
  children?: React.ReactNode
  name?: TranslateKeys | string
  meta?: HeadItem[]
}
// TODO: add scroll to page content by default
/**
 * Component description.
 *
 * How to use
 * @example
 * <Page />
 */
export function Page(props: PageProps): JSX.Element {
  const { name, meta, children, className, ...otherProps } = props
  const _className = cn(css.Page, className)
  const app = useLauncher()
  const pageName = app.t(name as TranslateKeys)
  const tabName = app.t('SYSTEM.TAB_NAME', { title: pageName })
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
    !app.isAuthorized() && { key: '0', start: 'login', size: 'xs', v: 'outlined', content: app.t('BUTTONS.LOGIN'), color: 'secondary', onClick: app.login },
  ].filter(Boolean) as ActionItem[]

  return (
    <Layout className={_className} v='columns' stretch {...otherProps}>
      <Head title={tabName} items={meta} />

      {/* portal name and actions to AppHeader component */}
      <Portal name='page-name' content={<Text.H1 color='primary' content={pageName} />} />
      <Portal name='page-actions' content={<Actions items={testActions} gap='xs' />} />

      {children}

      <Layout.Footer direction='x' justify='center'>
        <Copyright />
      </Layout.Footer>
    </Layout>
  )
}

export default Page

Page.LeftAside = Layout.LeftAside
Page.RightAside = Layout.RightAside
Page.Footer = Layout.Footer
Page.Header = Layout.Header
Page.Content = Layout.Content
Page.Section = Section
Page.Block = Block
