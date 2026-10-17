import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Header from 'components/layouts/Header'
import Content from 'components/layouts/Content'
import Block, { BlockProps } from 'components/layouts/Block'
import Scroll from 'components/layouts/Scroll'

// ---| self |---
import css from './Section.module.scss'


export type SectionProps = BlockProps

/**
 * Component description.
 * @example
 * <Section>
 *   <Section.Header>Header</Section.Header>
 *   <Section.Content>
 *     <Section.Scroll v='y' thin />
 *     Content
 *   </Section.Content>
 * </Section>
 */
export function Section(props: SectionProps) {
  const { children, className, ...otherProps } = props

  return (
    <Block as='section' className={cn(css.Section, className)} g='xs' {...otherProps}>
      {children}
    </Block>
  )
}

Section.displayName = 'Section'

Section.Header = Header
Section.Content = Content
Section.Scroll = Scroll


export default Section
