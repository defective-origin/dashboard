import React from 'react'

// ---| core |---
import { t } from 'locale'
import { cn, h2i } from 'tools'
import { useToggler } from 'hooks'
import { Feature, useBookmark } from 'api'

// ---| pages |---
import Page, { PageProps } from 'pages/Page'
// ---| screens |---
import User from 'screens/views/User'
import ReviewsModal from 'screens/modals/ReviewsModal'
import ConfirmModal from 'screens/modals/ConfirmModal'
// ---| components |---
import Tag from 'components/views/Tag'
import Text from 'components/views/Text'
import Icon from 'components/views/Icon'
import Tabs from 'components/layouts/Tabs'
import Label from 'components/views/Label'
import Image from 'components/views/Image'
import Field from 'components/forms/fields'
import Block from 'components/layouts/Block'
import { Form } from 'components/forms/Form'
import Button from 'components/actions/Button'
import Scroll from 'components/layouts/Scroll'
import Layout from 'components/layouts/Layout'
import { modal } from 'components/popups/Modal'
import Section from 'components/layouts/Section'
import Clipboard from 'components/actions/Clipboard'

// ---| self |---
import css from './FeaturePage.module.scss'

export const FEATURE_SNAPSHOT_ID = 'FEATURE_SNAPSHOT_ID'

export type FeaturePageProps<T extends Feature = Feature> = PageProps & {
  snapshotId?: string
  options?: T
  onRemove?: () => void
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <FeaturePage />
 */
export function FeaturePage<T extends Feature>(props: FeaturePageProps<T>) {
  const { snapshotId = FEATURE_SNAPSHOT_ID, menu = [], options, onRemove, children, className, ...otherProps } = props
  const _className = cn(css.FeaturePage, className)
  const bookmark = useBookmark(options?.id)
  const info = useToggler()
  const mode = useToggler()

  // TODO: add save icon after info changes
  // TODO: reset options
  // TODO: add slider to change width and height
  // TODO: build table options by options attached with component

  return (
    <Page
      className={_className}
      as={Form}
      title={
        <Block v='x'>
          {options?.name}
          <Clipboard content={options?.id} />
        </Block>
      }
      init={options}
      m='xs'
      menu={[
        ...menu,
        { variant: 'divider', v: 'y' },
        { start: 'save', tooltip: t('ACTION.SAVE'), disabled: true },
        {
          start: 'photo_camera', tooltip: t('ACTION.UPDATE_SNAPSHOT'), onClick: () => h2i.toPng(document.getElementById(snapshotId) as HTMLElement)
            .then(dataUrl => {
              // TODO: save file
              const img = new Image()
              img.src = dataUrl
              img.width = 300
              // img.height = 300
              img.style.position = 'absolute'
              img.style.top = '50%'
              img.style.left = '50%'
              document.body.appendChild(img)
            }),
        },
        {
          start: 'delete_forever',
          tooltip: t('ACTION.REMOVE'),
          onClick: () => modal({
            name: 'confirm',
            content: t('MESSAGE.REMOVE_CONFIRM'),
            onSuccess: onRemove,
          }),
        },
        { variant: 'divider', v: 'y' },
        { start: 'tune', tooltip: t('ACTION.SHOW_INFO'), active: info.isOn, onClick: info.toggle },
        { start: 'reviews', tooltip: t('ACTION.SHOW_REVIEWS'), onClick: () => modal({ name: 'feature-review', options: options?.reviews }) },
        { start: 'beenhere', tooltip: t('ACTION.ADD_BOOKMARK'), active: bookmark.isOn, onClick: () => bookmark.toggle(options) },
        { start: 'payments', tooltip: t('ACTION.PAY') },
      ]}
      {...otherProps}
    >
      <Page.Content className={css.Content} g='lg' p='sm'>
        {info.isOn && <Button className={css.Mode} start='sync' tooltip={mode.isOn ? t('ACTION.SHOW_PREVIEW') : t('ACTION.SHOW_INFO')} onClick={mode.toggle} />}
        <Section visible={mode.isOn} maxWidth={760} justify='center'>

          <Image src='https://i.pinimg.com/736x/4e/8c/21/4e8c211774adefa4ca67d77e6eabd031.jpg' height={300} />
          <Block v='y' g='xxs'>
            <Label icon='schedule' content={options?.updatedAt} format='day-of-month-year' tooltip={t('FIELD.LAST_UPDATE')} />

            <Block v='x' g='xxs'>
              <Label icon='star' content={options?.rate} format='number' tooltip={t('FIELD.RATE')} />
              <Label icon='payments' content={options?.price} format='currency' tooltip={t('FIELD.PRICE')} />
            </Block>
          </Block>

          <Block v='x' g='xxs'>
            {options?.tags.map(tag => <Tag key={tag} v='body2' size='xxs' content={tag} />)}
          </Block>

          <Text v='body2' size='xs' content={options?.content} />
        </Section>

        <Block visible={mode.isOff}>{children}</Block>
      </Page.Content>

      <Page.RightAside className={css.Options} visible={info.isOn} rows='auto 1fr' g='xxs' width={500}>
        <Tabs.Provider value='OPTIONS'>
          <Tabs p='xs'>
            <Tabs.Tab label='Options' value='OPTIONS' icon={<Icon v='data_object' />} iconPosition='start' />
            <Tabs.Tab label='Details' value='DETAILS' icon={<Icon v='info' />} iconPosition='start' />
          </Tabs>

          <Block v='y' g='xxs' p='xs' justify='stretch'>
            <Scroll v='y' size='xxs' />

            <Tabs.TabContent value='OPTIONS'>
              {/* TODO: highlight if options is not matched */}
              <Field.Json path='options' />
            </Tabs.TabContent>
            <Tabs.TabContent value='DETAILS'>
              <User id={options?.id} />
              <Layout columns={3} g='xxs'>
                <Field.Checkbox path='public' label={t('LABEL.PUBLIC')} />
                <Field.Number path='price' label={t('FIELD.PRICE')} />
                <Field.Text path='updatedAt' label={t('LABEL.LAST_UPDATE')} disabled />
              </Layout>
              <Field.Text path='name' label={t('FIELD.NAME')} />
              <Field.Tags path='tags' label={t('FIELD.TAGS')} options={options?.tags} />
            </Tabs.TabContent>
          </Block>
        </Tabs.Provider>
      </Page.RightAside>

      <ReviewsModal />
      <ConfirmModal />
    </Page>
  )
}

FeaturePage.displayName = 'FeaturePage'

export default FeaturePage
