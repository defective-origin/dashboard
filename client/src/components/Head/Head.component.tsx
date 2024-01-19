import React, { useMemo } from 'react'
import Helmet, { HelmetProps } from 'react-helmet'

// ---| self |---
import './Head.module.scss'

export type HeadMeta<V extends string, P extends object> = { v: V } & P
export type HeadItem = HeadMeta<'title', JSX.IntrinsicElements['title']>
                      | HeadMeta<'style', JSX.IntrinsicElements['style']>
                      | HeadMeta<'base', JSX.IntrinsicElements['base']>
                      | HeadMeta<'link', JSX.IntrinsicElements['link']>
                      | HeadMeta<'meta', JSX.IntrinsicElements['meta']>
                      | HeadMeta<'script', JSX.IntrinsicElements['script']>
                      | HeadMeta<'noscript', JSX.IntrinsicElements['noscript']>


export type HeadProps = HelmetProps & { // TODO: use ComponentWithItems
  title?: React.ReactNode
  items?: HeadItem[]
}

/**
 * Allows add application metadata.
 *
 * How to use
 * @example
 * <Head />
 */
export function Head(props: HeadProps): JSX.Element {
  const { title, items = [], children, ...otherProps } = props
  const metaItems = useMemo(() => items.map(({ v: Tag, ...metaProps }) => <Tag {...metaProps as JSX.IntrinsicAttributes} />), [items])

  return (
    <Helmet {...otherProps}>
      { title && <title>{title}</title> }
      {metaItems}
      {children}
    </Helmet>
  )
}

Head.displayName = 'Head'

export default Head
