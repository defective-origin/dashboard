import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout from 'components/Layout'
import Text from 'components/Text'
import Actions, { ActionsProps } from 'components/Actions'

// ---| self |---
import css from './Section.module.scss'

export type SectionProps = {
  title?: React.ReactNode
  className?: string
  children?: React.ReactNode
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
      <Layout.Header className={ css.Header }>
        <Text className={ css.Title } content={title} />

        <Layout.Block.Spacer />

        <Actions className={ css.Actions } items={actions} />
      </Layout.Header>

      <Layout.Content className={ css.Content } content={children} />
    </Layout>
  )
}

Section.displayName = 'Section'

export default Section
