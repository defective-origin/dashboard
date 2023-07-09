import React from 'react'

// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'
import Block from 'components/Block'
import Helmet from 'components/lib/Helmet'
import Text from 'components/lib/Text'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './Page.module.scss'

export type PageProps = LayoutProps & {
  className?: string
  children?: React.ReactNode
  name?: string
  title?: React.ReactNode
  info?: React.ReactNode
  extra?: React.ReactNode
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
  const { name, title, info, extra, children, className, ...otherProps } = props
  const _className = cn(NAME, className)
  const hasHeader = title || extra || info

  return (
    <Layout className={_className} {...otherProps}>
      {/* Add page metadata */}
      <Helmet>
        { name && <title>{name}</title> }
      </Helmet>

      {hasHeader && (
        <Layout.Header className={`${NAME}__header`}>
          <Block>
            <Block.Start className={`${NAME}__header-title`}>
              <Text.H4>{title}</Text.H4>
            </Block.Start>

            <Block.Center className={`${NAME}__header-info`}>
              {info}
            </Block.Center>

            <Block.End className={`${NAME}__header-extra`}>
              {extra}
            </Block.End>
          </Block>
        </Layout.Header>
      )}

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
Page.Block = Block
