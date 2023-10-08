import React, { useLayoutEffect } from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'
import { TranslateKeys } from 'locale'

// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'
import Block from 'components/Block'
import Section from 'components/Section'
import Helmet from 'components/lib/Helmet'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './Page.module.scss'

export type PageProps = LayoutProps & {
  className?: string
  children?: React.ReactNode
  name?: TranslateKeys | string
}

const NAME = 'page'

/**
 * Component description.
 *
 * How to use
 * @example
 * <Page />
 */
export function Page(props: PageProps): JSX.Element {
  const { name, children, className, ...otherProps } = props
  const _className = cn(NAME, className)
  const app = useLauncher()
  const pageName = app.t(name as TranslateKeys)
  const tabName = app.t('SYSTEM.TAB_NAME', { title: pageName })

  useLayoutEffect(() => { app.setPageName(pageName) }, [pageName])

  return (
    <Layout className={_className} {...otherProps}>
      {/* Add page metadata */}
      <Helmet>
        { tabName && <title>{tabName}</title> }
      </Helmet>

      {children}
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
