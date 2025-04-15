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
 *
 * How to use
 * @example
 * <Content />
 */
export function Content(props: ContentProps) {
  const { scroll, children, className, ...otherProps } = props
  const _className = cn(css.Content, className)

  return (
    <Layout className={_className} area='center' g='xxs' {...otherProps}>
      {children}

      {scroll && <Scroll v={scroll} actions />}
    </Layout>
  )
}

Content.displayName = 'Content'

export default Content
