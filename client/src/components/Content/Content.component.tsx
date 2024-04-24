import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import css from './Content.module.scss'

export type ContentProps = BlockProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <Content />
 */
export function Content(props: ContentProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.Content, className)

  return <Block className={_className} area='center' {...otherProps}>{children}</Block>
}

Content.displayName = 'Content'

export default Content
