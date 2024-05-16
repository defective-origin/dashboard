import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import BasePage, { BasePageProps } from 'pages/BasePage'

// ---| screens |---
// ---| components |---
import Layout from 'components/Layout'

// ---| self |---
import css from './SearchPage.module.scss'

export type SearchPageProps<T> = BasePageProps & {
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
    <BasePage className={_className} scroll='y' {...otherProps}>
      <Layout g='xxs' columns={3} stretch>
        {items.map((item, index) => <Tag key={keygen?.(item, index) ?? index} options={item} />)}
      </Layout>

      {children}
    </BasePage>
  )
}

SearchPage.displayName = 'SearchPage'

export default SearchPage
