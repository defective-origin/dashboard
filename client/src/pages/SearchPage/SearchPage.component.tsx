import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
// ---| components |---
// ---| self |---
import css from './SearchPage.module.scss'

export type SearchPageProps<T> = PageProps & {
  items: T[]
  as: React.ElementType
  keygen?: (item: T, index: number) => React.Key
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <SearchPage />
 */
export function SearchPage<T>(props: SearchPageProps<T>): JSX.Element {
  const { items, as: Tag, keygen, children, className, ...otherProps } = props
  const _className = cn(css.SearchPage, className)

  return (
    <Page className={_className} {...otherProps}>
      <Page.Content columns={3} scroll='y'>
        {items.map((item, index) => <Tag key={keygen?.(item, index) ?? index} options={item} />)}
      </Page.Content>

      {children}
    </Page>
  )
}

SearchPage.displayName = 'SearchPage'

export default SearchPage
