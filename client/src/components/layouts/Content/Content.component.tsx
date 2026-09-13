import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout, { LayoutProps } from 'components/layouts/Layout'
import Scroll, { ScrollVariant } from 'components/layouts/Scroll'

// ---| self |---
import css from './Content.module.scss'

export type ContentProps = LayoutProps & {
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
    <Layout className={cn(css.Content, className)} area='center' g='xxs' {...otherProps}>
      {children}

      {scroll && <Scroll v={scroll} actions />}
    </Layout>
  )
}

Content.displayName = 'Content'

export default Content
