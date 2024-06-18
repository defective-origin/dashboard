import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useWidget } from 'api'
import { useParams } from 'router'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import Reviews from 'screens/views/Reviews'

// ---| components |---
import Text from 'components/Text'
import Block from 'components/Block'
import Section from 'components/Section'
import Actions from 'components/Actions'

// ---| self |---
import css from './WidgetPage.module.scss'
import PlaceholderCard from 'screens/cards/PlaceholderCard'

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

  // TODO: Logo
  // TODO: counters [installed, stars, reviews, rating]
  // TODO: security | Data safety | https://play.google.com/store/apps/datasafety?id=org.telegram.messenger

  return (
    <Page className={_className} name={widget.name} p='md' {...otherProps}>
      <Page.Content scroll='y' g='lg'>
        <Block v='x' justifies='space-between'>
          <Block>
            <Text v='h3' content={widget.name} />
            <Text v='h6' content='Author' />
          </Block>

          <Text v='h6' content='Version 0.0.0' />
        </Block>

        <Actions items={[
          { variant: 'button', content: 'use', v: 'outlined', color: 'success' },
          { variant: 'button', content: 'Storybook/Playground', v: 'outlined', color: 'success' },
          { variant: 'button', content: 'Releases', v: 'outlined', color: 'success' },
          { variant: 'button', start: 'share', content: 'share'},
          { variant: 'button', start: 'payments', content: 'buy' },
        ]} size='xs' g='xs' />

        <Text v='body2' content={widget.description} />

        <Section title='Screens' scroll='x'>
          <PlaceholderCard height={300} width={150} />
          <PlaceholderCard height={300} width={150} />
          <PlaceholderCard height={300} width={150} />
          <PlaceholderCard height={300} width={150} />
          <PlaceholderCard height={300} width={150} />
          <PlaceholderCard height={300} width={150} />
          <PlaceholderCard height={300} width={150} />
          <PlaceholderCard height={300} width={150} />
          <PlaceholderCard height={300} width={150} />
          <PlaceholderCard height={300} width={150} />
          <PlaceholderCard height={300} width={150} />
          <PlaceholderCard height={300} width={150} />
        </Section>

        <Reviews />

        {children}
      </Page.Content>

      <Page.RightAside scroll='y' p='md' g='lg'>
        <Section title='Releases' v='column'>
          <PlaceholderCard height={200} />
          <PlaceholderCard height={200} />
          <PlaceholderCard height={200} />
          <PlaceholderCard height={200} />
          <PlaceholderCard height={200} />
        </Section>
      </Page.RightAside>
    </Page>
  )
}

WidgetPage.displayName = 'WidgetPage'

export default WidgetPage
