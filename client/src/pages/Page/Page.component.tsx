import React from 'react'

// ---| core |---
import { TranslateKeys, t } from 'locale'
import { cn, react } from 'tools'
import { useAccount } from 'api'

// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Portal from 'components/layouts/Portal'
import Meta, { MetaItem } from 'components/layouts/Meta'
import Actions from 'components/layouts/Actions'
import Layout, { LayoutProps } from 'components/layouts/Layout'
import Avatar from 'components/views/Avatar'

import Item from 'components/layouts/Item'
import Aside from 'components/layouts/Aside'
import Block from 'components/layouts/Block'
import Content from 'components/layouts/Content'
import Footer from 'components/layouts/Footer'
import Header from 'components/layouts/Header'
import Section from 'components/layouts/Section'

// ---| self |---
import css from './Page.module.scss'


export type PageProps = LayoutProps & {
  name?: TranslateKeys
  meta?: MetaItem[]
  title?: React.ReactNode
  extra?: React.ReactNode
  nav?: React.ReactNode
}

/**
 * Component description.
 * @example
 * <Page />
 */
export function Page(props: PageProps) {
  const { title, nav, extra, name, meta, children, className, ...otherProps } = props
  const pageName = t(name)
  const account = useAccount()

  return (
    <Layout className={cn(css.Page, className)} v='columns' {...otherProps}>
      <Meta title={t('LABEL.PAGE_NAME', { title: pageName })} items={meta} />

      <Portal name='page-name' content={<Text v='h1' size='md' color='primary' content={title ?? pageName} />} />
      <Portal name='page-nav' content={nav} />
      <Portal name='page-extra' content={
        <Actions g='xxs' size='sm'>
          {extra}


          {account.isAuthorized
            ? (
              <Actions.AppLink to='ACCOUNT' size='md' color='primary'>
                <Avatar size='md' />
              </Actions.AppLink>
            ) : <Actions.AppLink to='ROOT' start='person' size='md' color='primary' onClick={account.login} />
          }
        </Actions>
      } />

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
