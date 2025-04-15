import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { Feature } from 'api'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'
// ---| screens |---
import PreviewCard from 'screens/cards/PreviewCard'
// ---| components |---
import { Form } from 'components/forms/Form'
import ButtonGroup from 'components/actions/ButtonGroup'
import SearchField from 'components/forms/fields/SearchField'

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
export function SearchPage<T extends Feature>(props: SearchPageProps<T>) {
  const { to, items, children, className, ...otherProps } = props
  const _className = cn(css.SearchPage, className)

  return (
    <Page
      className={_className}
      nav={
        <Form onChange={console.log}>
          <SearchField
            className={css.Search}
            path='search'
            slotProps={{
              input: {
                endAdornment: (
                  <ButtonGroup
                    className={css.Filters}
                    items={[
                      { start: 'person', tooltip: t('LABEL.PERSONAL'), active: true },
                      { start: 'beenhere', tooltip: t('LABEL.BOOKMARKS'), active: false },
                      { start: 'payments', tooltip: t('LABEL.PAID'), active: false },
                    ]}
                  />
                ),
              },
            }}
          />
        </Form>
      }
      {...otherProps}
    >
      <Page.Content v='columns' columns={3} scroll='y' p='xs' g='md'>
        {items?.map((item, index) => <PreviewCard key={item.id ?? index} options={item} to={to} params={item} />)}
      </Page.Content>

      {children}
    </Page>
  )
}

SearchPage.displayName = 'SearchPage'

export default SearchPage
