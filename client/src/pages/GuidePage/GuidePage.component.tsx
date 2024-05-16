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
import css from './GuidePage.module.scss'

export type GuidePageProps = BasePageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <GuidePage />
 */
export function GuidePage(props: GuidePageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.GuidePage, className)

  return (
    <BasePage className={_className} name='PAGES.GUIDE' scroll='y' {...otherProps}>
      <Layout g='xxs' v='board' columns={8} stretch>
        <PlaceholderCard name='Page Menu' area='1 / 1 / 2 / 2' />
        <PlaceholderCard name='Content' area='1 / 2 / 2 / 8' />
        <PlaceholderCard name='Content Menu' area='1 / 8 / 2 / 9' />

        {children}
      </Layout>
    </BasePage>
  )
}

GuidePage.displayName = 'GuidePage'

export default GuidePage
