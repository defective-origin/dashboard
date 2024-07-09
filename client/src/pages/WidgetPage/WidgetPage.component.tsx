import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useWidgetView } from 'api'
import { useParams } from 'router'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import PlaceholderCard from 'screens/cards/PlaceholderCard'
import Reviews from 'screens/views/Reviews'
import User from 'screens/views/User'

// ---| components |---
import Tag from 'components/Tag'
import Text from 'components/Text'
import Block from 'components/Block'
import Label from 'components/Label'
import Section from 'components/Section'

// ---| self |---
import css from './WidgetPage.module.scss'
import Actions from 'components/Actions'

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
  const widget = useWidgetView(id)

  // options: object;
  // releases

  // TODO: security | Data safety | https://play.google.com/store/apps/datasafety?id=org.telegram.messenger

  return (
    <Page
      className={_className}
      name={widget.data?.name}
      p='md'
      menu={[{ start: 'add', tooltip: 'Add Widget', tooltipSide: 'right', size: 'lg' }]}
      {...otherProps}
    >
      <Page.Content scroll='y' g='lg' v='y'>
        {/* add slider to change width and height */}
        <PlaceholderCard height={300} name='PLAYGROUND' />

        <Section title='Description'>
          <Block v='x' g='xxs' justifies='space-between'>
            <Block v='x' g='xxs'>
              <User id={widget.data?.id} />

              <Block v='y' g='xxs'>
                <Label icon='schedule' content={widget.data?.updatedAt} format='day-of-month-year' />

                <Block v='x' g='xxs'>
                  <Label icon='star' content={widget.data?.rate} format='number' />
                  <Label icon='payments' content={widget.data?.price} format='currency' />
                  <Label icon='confirmation_number' content={widget.data?.releases.at(-1)?.version} />
                </Block>
              </Block>
            </Block>

            <Actions
              size='xs'
              items={[
                { variant: 'button', start: 'payments', content: 'pay' },
                { variant: 'button', start: 'share', content: 'share'},
              ]}
            />
          </Block>

          <Text v='body2' size='xs' content={widget.data?.content} />
        </Section>

        <Block v='x' g='xxs'>
          {widget.data?.tags.map(tag => <Tag key={tag} v='body2' size='xxs' content={tag} />)}
        </Block>

        <Section title='Reviews'>
          <Reviews items={widget.data?.reviews} />
        </Section>

        {children}
      </Page.Content>
    </Page>
  )
}

WidgetPage.displayName = 'WidgetPage'

export default WidgetPage
