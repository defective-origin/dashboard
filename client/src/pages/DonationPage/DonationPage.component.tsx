import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import BasePage, { BasePageProps } from 'pages/BasePage'

// ---| screens |---
import PlaceholderCard from 'screens/PlaceholderCard'

// ---| components |---
import Layout from 'components/Layout'

// ---| self |---
import css from './DonationPage.module.scss'

export type DonationPageProps = BasePageProps

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
    <BasePage className={_className} name='PAGES.DONATION' {...otherProps}>
      <Layout g='xxs' v='board' columns={3} stretch>
        <PlaceholderCard name='Plans' area='1 / 1 / 3 / 2' />
        <PlaceholderCard name='Needs' area='1 / 2 / 3 / 3' />
        <PlaceholderCard name='Others' area='1 / 3 / 3 / 4' />

        <PlaceholderCard name='History' area='3 / 1 / 4 / 4' />
        <PlaceholderCard name='Donations' area='4 / 1 / 7 / 4' />

        {children}
      </Layout>
    </BasePage>
  )
}

DonationPage.displayName = 'DonationPage'

export default DonationPage
