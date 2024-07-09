import React from 'react'

// ---| core |---
import { TranslateKeys, t } from 'locale'
import { cn, react } from 'tools'

// ---| screens |---
// ---| components |---
import Text from 'components/Text'
import Portal from 'components/Portal'
import Meta, { MetaItem } from 'components/Meta'
import Actions, { ActionItem } from 'components/Actions'
import Layout, { LayoutProps } from 'components/Layout'

import Item from 'components/Item'
import Aside from 'components/Aside'
import Block from 'components/Block'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Section from 'components/Section'

// ---| self |---
import css from './Page.module.scss'

export type PageMenuItem = ActionItem

export type PageProps = LayoutProps & {
  name?: TranslateKeys
  meta?: MetaItem[]
  menu?: ActionItem[]
  actions?: ActionItem[]
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Page />
 */
export function Page(props: PageProps): JSX.Element {
  const { menu = [], actions = [], name, meta, children, className, ...otherProps } = props
  const _className = cn(css.Page, className)
  const pageName = t(name)
  const tabName = t('SYSTEM.TAB_NAME', { title: pageName })

  const actionItems: ActionItem[] = actions.map(item =>
    typeof item === 'object' ? ({ ...item, v: 'text', color: 'primary' }) : item,
  ) as ActionItem[]

  return (
    <Layout className={_className} v='columns' {...otherProps}>
      <Meta title={tabName} items={meta} />

      <Portal name='page-name' content={<Text.H1 size='md' color='primary' content={pageName} />} />
      <Portal name='page-menu' content={<Actions items={menu} g='xs' size='xs' />} />
      <Portal name='page-actions' content={<Actions items={actionItems} v='y' menu='left' size='lg' />} />

      {children}
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
