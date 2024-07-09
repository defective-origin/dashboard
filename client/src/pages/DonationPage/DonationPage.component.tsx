import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import DonationTable from 'screens/tables/DonationTable'
import PlaceholderCard from 'screens/cards/PlaceholderCard'

// ---| components |---
import Block from 'components/Block'

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
    <Page
      className={_className}
      name='PAGES.DONATION'
      menu={[{ start: 'add', tooltip: 'new request', tooltipSide: 'right', size: 'lg' }]}
      {...otherProps}
    >
      <Page.Content p='sm'>
        <Page.Section title='List of expenses' v='row' g='xs' area='1 / 1 / 3 / 4'>
          <PlaceholderCard name='Plans' />
          <PlaceholderCard name='Needs' />
          <PlaceholderCard name='Others' />

          {/* <PlaceholderCard name='History' area='3 / 1 / 4 / 4' /> */}
        </Page.Section>

        <DonationTable area='3 / 1 / 7 / 4' />

        {children}
      </Page.Content>
    </Page>
  )
}

DonationPage.displayName = 'DonationPage'

export default DonationPage
