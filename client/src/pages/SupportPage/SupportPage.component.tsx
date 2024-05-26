import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import PlaceholderCard from 'screens/cards/PlaceholderCard'

// ---| components |---
// ---| self |---
import css from './SupportPage.module.scss'

export type SupportPageProps = PageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <SupportPage />
 */
export function SupportPage(props: SupportPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.SupportPage, className)

  return (
    <Page className={_className} name='PAGES.SUPPORT' {...otherProps}>
      <Page.Content v='board' columns={3}>
        <PlaceholderCard name='Stat Active' area='1 / 1 / 2 / 2' />
        <PlaceholderCard name='Stat Closed' area='1 / 2 / 2 / 3' />
        <PlaceholderCard name='Stat Open' area='1 / 3 / 2 / 4' />

        <PlaceholderCard name='Path' area='2 / 1 / 3 / 4' />
        <PlaceholderCard name='Requests' area='3 / 1 / 8 / 4' />

        {children}
      </Page.Content>
    </Page>
  )
}

SupportPage.displayName = 'SupportPage'

export default SupportPage
