import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useWidget } from 'api'
import { useParams } from 'router'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import PlaceholderCard from 'screens/PlaceholderCard'

// ---| components |---
// ---| self |---
import css from './WidgetPage.module.scss'

export type WidgetPageProps = PageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <WidgetPage />
 */
export function WidgetPage(props: WidgetPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.WidgetPage, className)
  const { id } = useParams()
  const widget = useWidget(id)

  return (
    <Page className={_className} name={widget.name} {...otherProps}>
      <Page.Content v='board' columns={3}>
        <PlaceholderCard name='Widget storybook' area='1 / 1 / 2 / 3' />
        <PlaceholderCard name='Widget settings' area='1 / 3 / 2 / 4' />
      </Page.Content>
      {children}
    </Page>
  )
}

WidgetPage.displayName = 'WidgetPage'

export default WidgetPage
