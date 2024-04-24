import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'
import Actions, { ActionsProps } from 'components/Actions'
import Content from 'components/Content'
import Header from 'components/Header'
import Text from 'components/Text'

// ---| self |---
import css from './Section.module.scss'

export type SectionProps = LayoutProps & {
  title?: React.ReactNode
  actions?: ActionsProps['items']
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Section />
 */
export function Section(props: SectionProps): JSX.Element {
  const { title, actions, children, className, ...otherProps } = props
  const _className = cn(css.Section, className)

  return (
    <Layout className={_className} stretch {...otherProps}>
      <Header className={ css.Header }>
        <Text className={ css.Title } content={title} v='h3' />

        <Actions className={ css.Actions } items={actions} />
      </Header>

      <Content className={ css.Content }>
        {children}
      </Content>
    </Layout>
  )
}

Section.displayName = 'Section'

export default Section
