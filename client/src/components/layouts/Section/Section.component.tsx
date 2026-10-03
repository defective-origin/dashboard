import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Text from 'components/views/Text'
import Header from 'components/layouts/Header'
import Content from 'components/layouts/Content'
import Actions from 'components/layouts/Actions'
import Block, { BlockProps } from 'components/layouts/Block'
import Scroll, { ScrollVariant } from 'components/layouts/Scroll'

// ---| self |---
import css from './Section.module.scss'


export type SectionProps = BlockProps & {
  scroll?: ScrollVariant
  title?: React.ReactNode
  actions?: React.ReactNode
}

/**
 * Component description.
 * @example
 * <Section />
 */
export function Section(props: SectionProps) {
  const { scroll, v, g, title, actions, children, className, ...otherProps } = props

  return (
    <Block as='section' className={cn(css.Section, className)} g='xs' {...otherProps}>
      {(title || actions) && (
        <Header className={css.Header} v='x' justifies='space-between'>
          <Text className={css.Title} v='h3' content={title} />

          <Actions>{actions}</Actions>
        </Header>
      )}

      <Content v={v} g={g}>
        {scroll && <Scroll v={scroll} thin />}
        {children}
      </Content>
    </Block>
  )
}

Section.displayName = 'Section'

export default Section
