import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout from 'components/Layout'
import Text from 'components/lib/Text'
import Actions, { ActionsProps } from 'components/Actions'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Section.module.scss'

export type SectionProps = {
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
  const { actions, children, className, ...otherProps } = props
  const _className = cn(css.Section, className)

  return (
    <Layout className={_className} {...otherProps}>
      <Layout.Header as={Layout.Block} className={ css.Header }>
        <Text className={ css.Title } />

        <Layout.Block.Spacer />

        <Actions className={ css.Actions } items={actions} />
      </Layout.Header>

      <Layout.Content className={ css.Content } content={children} />
    </Layout>
  )
}

Section.displayName = 'Section'

export default Section
