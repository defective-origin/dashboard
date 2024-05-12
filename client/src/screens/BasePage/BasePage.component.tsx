import React from 'react'

// ---| core |---
import { useApp } from 'App'
import { TranslateKeys, useLocale } from 'locale'
import { cn, react } from 'tools'

// ---| screens |---
import Copyright from 'screens/Copyright'

// ---| components |---
import Text from 'components/Text'
import Portal from 'components/Portal'
import Page, { PageProps } from 'components/Page'
import Actions, { ActionItem } from 'components/Actions'
import Scroll, { ScrollVariant } from 'components/Scroll'

// ---| self |---
import css from './BasePage.module.scss'

export type BasePageProps = PageProps & {
  name?: TranslateKeys
  scroll?: ScrollVariant
  menu?: ActionItem[]
  actions?: ActionItem[]
  noFooter?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <BasePage />
 */
export function BasePage(props: BasePageProps): JSX.Element {
  const { noFooter, menu = [], actions = [], scroll, name, meta, children, className, ...otherProps } = props
  const _className = cn(css.BasePage, className)
  const app = useApp()
  const locale = useLocale()
  const pageName = locale.t(name)
  const tabName = locale.t('SYSTEM.TAB_NAME', { title: pageName })

  const menuItems: ActionItem[] = [
    ...menu,
    { key: '0', start: 'login', size: 'xs', v: 'outlined', content: locale.t('ACTION.LOGIN'), color: 'secondary', onClick: app.login, hide: app.isAuthorized() },
  ]

  const actionItems: ActionItem[] = actions.map((item) =>
    typeof item === 'object'
      ? ({
        ...item,
        v: 'text',
        color: 'primary',
      })
      : item,
  ) as ActionItem[]

  return (
    <Page className={_className} name={tabName} meta={meta} stretch {...otherProps}>
      <Portal name='page-name' content={<Text.H1 color='primary' content={pageName} />} />
      <Portal name='page-menu' content={<Actions items={menuItems} g='xs' />} />
      <Portal name='page-actions' content={<Actions items={actionItems} v='y' menu='left' size='lg' />} />

      <Page.Content g='xs'>
        <Scroll v={scroll} actions />

        {children}
      </Page.Content>

      {!noFooter && (
        <Page.Footer justifies='center'>
          <Copyright />
        </Page.Footer>
      )}
    </Page>
  )
}

export default react.attachComponents(BasePage, {
  LeftAside: Page.LeftAside,
  RightAside: Page.RightAside,
  Footer: Page.Footer,
  Header: Page.Header,
  Content: Page.Content,
  Section: Page.Section,
  Block: Page.Block,
})
