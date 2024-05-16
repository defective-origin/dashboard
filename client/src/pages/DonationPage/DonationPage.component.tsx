import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import PlaceholderCard from 'screens/PlaceholderCard'

// ---| components |---
// ---| self |---
import css from './DonationPage.module.scss'

export type DonationPageProps = PageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <DonationPage />
 */
export function DonationPage(props: DonationPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.DonationPage, className)

  return (
    <Page className={_className} name='PAGES.DONATION' {...otherProps}>
      <Page.Content v='board' columns={3}>
        <PlaceholderCard name='Plans' area='1 / 1 / 3 / 2' />
        <PlaceholderCard name='Needs' area='1 / 2 / 3 / 3' />
        <PlaceholderCard name='Others' area='1 / 3 / 3 / 4' />

        <PlaceholderCard name='History' area='3 / 1 / 4 / 4' />
        <PlaceholderCard name='Donations' area='4 / 1 / 7 / 4' />

        {children}
      </Page.Content>
    </Page>
  )
}

DonationPage.displayName = 'DonationPage'

export default DonationPage
