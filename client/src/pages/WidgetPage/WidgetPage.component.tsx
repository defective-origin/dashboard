import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useWidget } from 'api'
import { useParams } from 'router'
import { t } from 'locale'
import { useApp } from 'App'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'

// ---| screens |---
import PlaceholderCard from 'screens/cards/PlaceholderCard'
import WidgetModal from 'screens/modals/WidgetModal'
import ReviewsModal from 'screens/modals/ReviewsModal'
import User from 'screens/views/User'

// ---| components |---
import Tag from 'components/views/Tag'
import Text from 'components/views/Text'
import Block from 'components/layouts/Block'
import Label from 'components/views/Label'
import Section from 'components/layouts/Section'

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
  const app = useApp()
  const { id } = useParams()
  const widget = useWidget(id)

  // options: object;
  // releases

  // TODO: security | Data safety | https://play.google.com/store/apps/datasafety?id=org.telegram.messenger

  return (
    <Page
      className={_className}
      name={widget.data?.name}
      p='md'
      menu={[
        { start: 'download', tooltip: t('ACTION.INSTALL') },
        { start: 'beenhere', tooltip: t('ACTION.ADD_BOOKMARK') },
        { start: 'settings', tooltip: t('ACTION.SETTINGS'), onClick: () => app.modal({ name: WidgetModal.modalName, payload: widget.data }) },
        { start: 'delete_forever', tooltip: t('ACTION.REMOVE') },
        { start: 'payments', tooltip: t('ACTION.PAY') },
        { start: 'reviews', tooltip: t('ACTION.REVIEWS'), onClick: () => app.modal({ name: ReviewsModal.modalName, payload: widget.data?.reviews }) },
      ]}
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
                <Label icon='schedule' content={widget.data?.updatedAt} format='day-of-month-year' tooltip={t('FIELD.LAST_UPDATE')} />

                <Block v='x' g='xxs'>
                  <Label icon='star' content={widget.data?.rate} format='number' tooltip={t('FIELD.RATE')} />
                  <Label icon='payments' content={widget.data?.price} format='currency' tooltip={t('FIELD.PRICE')} />
                </Block>
              </Block>
            </Block>
          </Block>

          <Text v='body2' size='xs' content={widget.data?.content} />
        </Section>

        <Block v='x' g='xxs'>
          {widget.data?.tags.map(tag => <Tag key={tag} v='body2' size='xxs' content={tag} />)}
        </Block>

        <ReviewsModal />
        <WidgetModal />

        {children}
      </Page.Content>
    </Page>
  )
}

WidgetPage.displayName = 'WidgetPage'

export default WidgetPage
