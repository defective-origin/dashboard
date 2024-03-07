import React, { useMemo } from 'react'
import Helmet, { HelmetProps } from 'react-helmet'

// ---| self |---
import './Meta.module.scss'

export type MetaMeta<V extends string, P extends object> = { v: V } & P
export type MetaItem = MetaMeta<'title', JSX.IntrinsicElements['title']>
                      | MetaMeta<'style', JSX.IntrinsicElements['style']>
                      | MetaMeta<'base', JSX.IntrinsicElements['base']>
                      | MetaMeta<'link', JSX.IntrinsicElements['link']>
                      | MetaMeta<'meta', JSX.IntrinsicElements['meta']>
                      | MetaMeta<'script', JSX.IntrinsicElements['script']>
                      | MetaMeta<'noscript', JSX.IntrinsicElements['noscript']>


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
export function Meta(props: MetaProps): JSX.Element {
  const { title, type='website', locale, description, keywords, viewport = 1, items = [], children, ...otherProps } = props

  const metaItems = useMemo(
    () => {
      const autoItems = [
        { v: 'meta', name: 'description', content: description },
        { v: 'meta', name: 'keywords', content: keywords?.toString() },
        { v: 'meta', name: 'viewport', content: `width=device-width, initial-scale=${viewport}}` },
        { v: 'meta', property: 'og:title', content: title },
        { v: 'meta', property: 'og:description', content: description },
        { v: 'meta', property: 'og:locale', content: locale },
        { v: 'meta', property: 'og:url', content: window.location.href },
        { v: 'meta', property: 'og:site_name', content: window.location.host },
        { v: 'meta', property: 'og:type', content: type },
      ].filter((item) => item.content) as MetaItem[]

      return [...autoItems, ...items]
        .map(({ v: Tag, ...metaProps }) => <Tag {...metaProps as JSX.IntrinsicAttributes} />)

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
