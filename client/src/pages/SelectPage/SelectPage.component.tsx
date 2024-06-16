import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
// ---| components |---
// ---| self |---
import css from './SelectPage.module.scss'

export type SelectPageProps<T> = PageProps & {
  items: T[]
  as: React.ElementType
  keygen?: (item: T, index: number) => React.Key
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <SelectPage />
 */
export function SelectPage<T>(props: SelectPageProps<T>): JSX.Element {
  const { items, as: Tag, keygen, children, className, ...otherProps } = props
  const _className = cn(css.SelectPage, className)

  return (
    <Page className={_className} {...otherProps}>
      <Page.Content columns={5} scroll='y' p='xs' g='md'>
        {items.map((item, index) => <Tag key={keygen?.(item, index) ?? index} options={item} />)}
      </Page.Content>

      {children}
    </Page>
  )
}

SelectPage.displayName = 'SelectPage'

export default SelectPage
