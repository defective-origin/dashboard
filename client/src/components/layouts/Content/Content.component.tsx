import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Block, { BlockProps } from 'components/layouts/Block'
import Scroll, { ScrollVariant } from 'components/layouts/Scroll'

// ---| self |---
import css from './Content.module.scss'

export type ContentProps = BlockProps & {
  scroll?: ScrollVariant
}

/**
 * Component description.
 * @example
 * <Content />
 */
export function Content(props: ContentProps) {
  const { scroll, children, className, ...otherProps } = props

  return (
    <Block className={cn(css.Content, className)} area='center' g='xxs' {...otherProps}>
      {children}

      {scroll && <Scroll v={scroll} actions />}
    </Block>
  )
}

Content.displayName = 'Content'

export default Content
