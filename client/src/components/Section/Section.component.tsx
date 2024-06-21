import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/Text'
import Block from 'components/Block'
import Layout, { LayoutProps } from 'components/Layout'
import Actions, { ActionsProps } from 'components/Actions'
import Scroll, { ScrollVariant } from 'components/Scroll'

// ---| self |---
import css from './Section.module.scss'

export type SectionProps = LayoutProps & {
  scroll?: ScrollVariant
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
  const { scroll, v, g, title, actions, children, className, ...otherProps } = props
  const _className = cn(css.Section, className)

  // FIXME: height='min-content'
  return (
    <Layout className={_className} v='y' g='xs' {...otherProps}>
      {(title || actions) && (
        <Block className={css.Header}>
          <Text className={css.Title} content={title} v='h3' />

          <Actions className={css.Actions} items={actions} />
        </Block>
      )}

      <Layout className={css.Content} v={v} g={g}>
        {scroll && <Scroll v={scroll} />}
        {children}
      </Layout>
    </Layout>
  )
}

Section.displayName = 'Section'

export default Section
