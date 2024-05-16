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
import css from './SupportPage.module.scss'

export type SupportPageProps = BasePageProps

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
    <BasePage className={_className} name='PAGES.SUPPORT' {...otherProps}>
      <Layout g='xxs' v='board' columns={3} stretch>
        <PlaceholderCard name='Stat Active' area='1 / 1 / 2 / 2' />
        <PlaceholderCard name='Stat Closed' area='1 / 2 / 2 / 3' />
        <PlaceholderCard name='Stat Open' area='1 / 3 / 2 / 4' />

        <PlaceholderCard name='Path' area='2 / 1 / 3 / 4' />
        <PlaceholderCard name='Requests' area='3 / 1 / 8 / 4' />

        {children}
      </Layout>
    </BasePage>
  )
}

SupportPage.displayName = 'SupportPage'

export default SupportPage
