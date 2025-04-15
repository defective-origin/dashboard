import React, { useState } from 'react'

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
  onCreate?: () => void
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <SearchPage />
 */
export function SearchPage<T extends Feature>(props: SearchPageProps<T>) {
  const { to, items, onCreate, children, className, ...otherProps } = props
  const _className = cn(css.SearchPage, className)
  const [filter, setFilter] = useState<string | undefined>('bookmarks')
  const change = (value: string) =>setFilter(old => old === value ? undefined : value)

  return (
    <Page
      className={_className}
      menu={[
        { start: 'add', tooltip: t('ACTION.CREATE_NEW'), onClick: onCreate },
      ]}
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
                      { start: 'person', tooltip: t('LABEL.PERSONAL'), active: filter === 'personal', onClick: () => change('personal') },
                      { start: 'beenhere', tooltip: t('LABEL.BOOKMARKS'), active: filter === 'bookmarks', onClick: () => change('bookmarks') },
                      { start: 'payments', tooltip: t('LABEL.PAID'), active: filter === 'paid', onClick: () => change('paid') },
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
