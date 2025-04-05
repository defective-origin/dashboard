import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Feature } from 'api'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import PreviewCard from 'screens/cards/PreviewCard'

// ---| components |---
import { TextField } from 'components/forms/fields/TextField'

// ---| self |---
import css from './SearchPage.module.scss'

export type SearchPageProps<T> = PageProps & {
  items?: T[]
  to?: string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <SearchPage />
 */
export function SearchPage<T extends Feature>(props: SearchPageProps<T>): JSX.Element {
  const { to, items, children, className, ...otherProps } = props
  const _className = cn(css.SearchPage, className)

  return (
    <Page
      className={_className}
      nav={
        <TextField />
      }
      {...otherProps}
    >
      <Page.Content v='columns' columns={5} scroll='y' p='xs' g='md'>
        {items?.map((item, index) => <PreviewCard key={item.id ?? index} options={item} to={to} params={item} />)}
      </Page.Content>

      {children}
    </Page>
  )
}

SearchPage.displayName = 'SearchPage'

export default SearchPage
