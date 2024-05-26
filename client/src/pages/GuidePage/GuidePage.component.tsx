import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import PlaceholderCard from 'screens/cards/PlaceholderCard'

// ---| components |---
// ---| self |---
import css from './GuidePage.module.scss'

export type GuidePageProps = PageProps

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
    <Page className={_className} name='PAGES.GUIDE' {...otherProps}>
      <Page.Content v='board' columns={8}>
        <PlaceholderCard name='Page Menu' area='1 / 1 / 2 / 2' />
        <PlaceholderCard name='Content' area='1 / 2 / 2 / 8' />
        <PlaceholderCard name='Content Menu' area='1 / 8 / 2 / 9' />

        {children}
      </Page.Content>
    </Page>
  )
}

GuidePage.displayName = 'GuidePage'

export default GuidePage
