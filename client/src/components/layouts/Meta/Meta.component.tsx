import React, { useMemo } from 'react'
import { Helmet , HelmetProps } from 'react-helmet-async'

// ---| self |---
import './Meta.module.scss'

export type HeadMeta<V extends string, P extends object> = { v: V } & P
export type MetaItem
  = HeadMeta<'title', React.JSX.IntrinsicElements['title']>
  | HeadMeta<'style', React.JSX.IntrinsicElements['style']>
  | HeadMeta<'base', React.JSX.IntrinsicElements['base']>
  | HeadMeta<'link', React.JSX.IntrinsicElements['link']>
  | HeadMeta<'meta', React.JSX.IntrinsicElements['meta']>
  | HeadMeta<'script', React.JSX.IntrinsicElements['script']>
  | HeadMeta<'noscript', React.JSX.IntrinsicElements['noscript']>


export type MetaProps = HelmetProps & {
  title?: string
  description?: string
  keywords?: string | string[]
  viewport?: string | number
  locale?: string
  type?: string
  items?: MetaItem[]
}

/**
 * Allows add application metadata.
 *
 * How to use
 * @example
 * <Meta />
 */
export function Meta(props: MetaProps) {
  const { title, type='website', locale, description, keywords, viewport = 1, items = [], children, ...otherProps } = props

  const metaItems = useMemo(
    () => {
      const autoItems = [
        { v: 'meta', name: 'description', content: description },
        { v: 'meta', name: 'keywords', content: keywords?.toString() },
        { v: 'meta', name: 'viewport', content: `width=device-width, initial-scale=${viewport}` },
        { v: 'meta', property: 'og:title', content: title },
        { v: 'meta', property: 'og:description', content: description },
        { v: 'meta', property: 'og:locale', content: locale },
        { v: 'meta', property: 'og:url', content: window.location.href },
        { v: 'meta', property: 'og:site_name', content: window.location.host },
        { v: 'meta', property: 'og:type', content: type },
      ].filter(item => item.content) as MetaItem[]

      return [...autoItems, ...items]
        .map(({ v: Tag, ...metaProps }, idx) => <Tag key={idx} {...metaProps as React.JSX.IntrinsicAttributes} />)

    }, [description, items, keywords, locale, title, type, viewport])

  return (
    <Helmet {...otherProps}>
      { title && <title>{title}</title> }

      {metaItems}
      {children}
    </Helmet>
  )
}

Meta.displayName = 'Meta'

export default Meta
