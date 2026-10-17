import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import css from './Content.module.scss'

export type ContentProps = BlockProps

/**
 * Component description.
 * @example
 * <Content />
 */
export function Content(props: ContentProps) {
  const { children, className, ...otherProps } = props

  return (
    <Block className={cn(css.Content, className)} area='center' g='xxs' {...otherProps}>
      {children}
    </Block>
  )
}

Content.displayName = 'Content'

export default Content
