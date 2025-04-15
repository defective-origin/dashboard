import React, { ReactNode } from 'react'

// ---| core |---
import { TranslateKeys, t } from 'locale'
import { cn, react } from 'tools'

// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Portal from 'components/layouts/Portal'
import Meta, { MetaItem } from 'components/layouts/Meta'
import Actions, { ActionItem } from 'components/actions/Actions'
import Layout, { LayoutProps } from 'components/layouts/Layout'

import Item from 'components/layouts/Item'
import Aside from 'components/layouts/Aside'
import Block from 'components/layouts/Block'
import Content from 'components/layouts/Content'
import Footer from 'components/layouts/Footer'
import Header from 'components/layouts/Header'
import Section from 'components/layouts/Section'

// ---| self |---
import css from './Page.module.scss'

export type PageMenuItem = ActionItem

export type PageProps = LayoutProps & {
  title?: ReactNode
  name?: TranslateKeys
  meta?: MetaItem[]
  menu?: ActionItem[]
  extra?: ReactNode
  nav?: ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Page />
 */
export function Page(props: PageProps) {
  const { title, nav, extra, menu = [], name, meta, children, className, ...otherProps } = props
  const _className = cn(css.Page, className)
  const pageName = t(name)
  const tabName = t('LABEL.PAGE_NAME', { title: pageName })

  return (
    <Layout className={_className} v='columns' {...otherProps}>
      <Meta title={tabName} items={meta} />

      <Portal name='page-name' content={<Text.H1 size='md' color='primary' content={title ?? pageName} />} />
      <Portal name='page-nav' content={nav} />
      <Portal
        name='page-extra'
        content={(
          <>
            {extra}
            <Actions items={menu} g='xxs' size='xxs' />
          </>
        )}
      />

      {children}

      <div className={css.copyright}>{t('MESSAGE.COPYRIGHT', { year: (new Date).getFullYear() })}</div>
    </Layout>
  )
}

// TODO: leave only private case components? like sections? sliders? Or remove at all?
export default react.attachComponents(Page, {
  Item,
  Footer,
  Header,
  Content,
  Section,
  Block,
  Layout,
  LeftAside: Aside.Left,
  RightAside: Aside.Right,
})
