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
import Label from 'components/views/Label'
import Image from 'components/views/Image'
import Field from 'components/forms/fields'
import Block from 'components/layouts/Block'
import { Form } from 'components/forms/Form'
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
  onClone?: () => void
  onRemove?: () => void
  onInherit?: () => void
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <FeaturePage />
 */
export function FeaturePage<T extends Feature>(props: FeaturePageProps<T>) {
  const { snapshotId = FEATURE_SNAPSHOT_ID, menu = [], options, onInherit, onClone, onRemove, children, className, ...otherProps } = props
  const _className = cn(css.FeaturePage, className)
  const bookmark = useBookmark(options?.id)
  const info = useToggler()
  const edit = useToggler()
  const settings = useToggler()

  // TODO: add save icon after info changes
  // TODO: reset options
  // TODO: build table options by options attached with component
  // TODO: update snapshot on save?

  const ACCESS_SELECT_ITEMS = [
    { value: true, children: t('LABEL.PUBLIC') },
    { value: false, children: t('LABEL.PRIVATE') },
  ]

  return (
    <Page
      className={_className}
      as={Form}
      title={
        <Block v='x' aligns='center'>
          {edit.isOff && options?.name}
          {edit.isOn && <Field.Text path='name' placeholder={t('LABEL.NAME')} />}
          <Clipboard content={options?.id} />
        </Block>
      }
      init={options}
      m='xs'
      menu={[
        ...menu,
        !!menu.length && { variant: 'divider', v: 'y' },
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
        onClone && {
          // start: 'library_add',
          start: 'content_copy',
          tooltip: t('ACTION.CREATE_CLONE'),
          onClick: onClone,
        },
        onInherit && {
          start: 'tenancy',
          tooltip: t('ACTION.INHERIT'),
          onClick: onInherit,
        },
        onRemove && {
          start: 'delete_forever',
          tooltip: t('ACTION.REMOVE'),
          onClick: () => modal({
            name: 'confirm',
            content: t('MESSAGE.CONFIRM.REMOVE'),
            onSuccess: onRemove,
          }),
        },
        { variant: 'divider', v: 'y' },
        { start: 'save', tooltip: t('ACTION.SAVE'), disabled: true },
        { start: 'undo', tooltip: t('ACTION.UNDO') },
        { start: 'redo', tooltip: t('ACTION.REDO') },
        { start: 'edit_square', tooltip: t('ACTION.EDIT'), active: edit.isOn, onClick: edit.toggle },
        { variant: 'divider', v: 'y' },
        { start: 'fullscreen', tooltip: t('ACTION.FULLSCREEN') },
        { start: 'refresh', tooltip: t('ACTION.REFRESH') },
        { start: 'settings', tooltip: t('ACTION.SETTINGS'), active: settings.isOn, onClick: settings.toggle },
        { start: 'description', info: 'sync', tooltip: info.isOn ? t('ACTION.SHOW_PREVIEW') : t('ACTION.SHOW_INFO'), active: info.isOn, onClick: info.toggle },
        { start: 'reviews', tooltip: t('ACTION.SHOW_REVIEWS'), onClick: () => modal({ name: 'feature-review', options: options?.reviews }) },
        { start: 'beenhere', tooltip: t('ACTION.ADD_BOOKMARK'), active: bookmark.isOn, onClick: () => bookmark.toggle(options) },
        { start: 'payments', tooltip: t('ACTION.PAY') },
      ]}
      {...otherProps}
    >
      <Page.Content className={css.Content} g='lg' p='sm'>
        <Scroll v='y' size='xxs' />

        <Section visible={info.isOn} maxWidth={760} justify='center' g='xs'>
          <Image src='https://i.pinimg.com/736x/4e/8c/21/4e8c211774adefa4ca67d77e6eabd031.jpg' width='100%' />
          <Block v='x' g='xxs'>
            <User id={options?.createdBy?.id} />

            {edit.isOff && (
              <Block v='y'>
                <Block v='x' g='xxs'>
                  <Label icon='star' content={options?.rate} format='number' tooltip={t('LABEL.RATE')} />
                  <Label icon='payments' content={options?.price} format='currency' tooltip={t('LABEL.PRICE')} />
                  <Label icon='visibility' content={ACCESS_SELECT_ITEMS.find(i => i.value === options?.public)?.children} tooltip={t('LABEL.ACCESS')} />
                </Block>
                <Label icon='schedule' content={options?.updatedAt} format='day-of-month-year' tooltip={t('LABEL.LAST_UPDATE')} />
              </Block>
            )}
            {edit.isOn && (
              <Layout columns={2} g='xxs'>
                <Field.Select path='public' label={t('LABEL.PUBLIC')} items={ACCESS_SELECT_ITEMS} />
                <Field.Number path='price' label={t('LABEL.PRICE')} />
              </Layout>
            )}
          </Block>

          {edit.isOn && <Field.Tags path='tags' label={t('LABEL.TAGS')} options={options?.tags} />}
          {edit.isOff && (
            <Block v='x' g='xxs'>
              {options?.tags.map(tag => <Tag key={tag} v='body2' size='xxs' content={tag} />)}
            </Block>
          )}

          {edit.isOff && <Text v='body2' size='xs' content={options?.content} />}
          {edit.isOn && <Field.Text path='content' label={t('LABEL.CONTENT')} multiline />}
        </Section>

        <Block visible={info.isOff}>{children}</Block>
      </Page.Content>

      <Page.RightAside className={css.Options} visible={settings.isOn} rows='auto 1fr' g='xxs' width={500}>
        <Block v='x' g='xxs' p='xs'>
          <Icon v='data_object' size='xs' />
          <Text content={t('LABEL.OPTIONS')} />
        </Block>

        <Block v='y' g='xxs' p='xs' justify='stretch'>
          <Scroll v='y' size='xxs' />
          {/* TODO: highlight if options is not matched */}
          <Field.Json path='options' disabled={edit.isOff} />
        </Block>
      </Page.RightAside>

      <ReviewsModal />
      <ConfirmModal />
    </Page>
  )
}

FeaturePage.displayName = 'FeaturePage'

export default FeaturePage
