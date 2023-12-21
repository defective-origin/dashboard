import React, { useLayoutEffect } from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'
import { TranslateKeys } from 'locale'

// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'
import Block from 'components/Block'
import Section from 'components/Section'
import Head, { HeadItem } from 'components/Head'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Page.module.scss'

export type PageProps = LayoutProps & {
  className?: string
  children?: React.ReactNode
  name?: TranslateKeys | string
  meta?: HeadItem[]
}
// FIXME: add scroll to page content by default
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

  useLayoutEffect(() => { app.setPageName(pageName) }, [pageName])

  return (
    <Layout className={_className} stretch {...otherProps}>
      <Head title={tabName} items={meta} />

      {children}
    </Layout>
  )
}

export default Page

Page.LeftAside = Layout.Left
Page.RightAside = Layout.Right
Page.Footer = Layout.Bottom
Page.Header = Layout.Top
Page.Content = Layout.Content
Page.Section = Section
Page.Block = Block
