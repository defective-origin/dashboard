import React from 'react'

// ---| core |---
import { t } from 'locale'
import { cn } from 'tools'
import { Feature } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Field from 'components/forms/fields'
import Layout from 'components/layouts/Layout'
import FormModal, { FormModalProps } from 'components/popups/FormModal'

// ---| self |---
import css from './FeatureModal.module.scss'

export type FeatureModalProps<T extends Feature> = FormModalProps<T>

/**
 * Component description.
 *
 * How to use
 * @example
 * <FeatureModal />
 */
export function FeatureModal<T extends Feature>(props: FeatureModalProps<T>): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.FeatureModal, className)
  const VISIBILITY_OPTIONS = [
    { value: false, children: t('ACCESS.PRIVATE') },
    { value: true, children: t('ACCESS.PUBLIC') },
  ]

  // TODO: who can change field

  return (
    <FormModal className={_className} {...otherProps}>
      <Field.Text path='id' label={t('FIELD.ID')} disabled />
      <Field.Text path='name' label={t('FIELD.NAME')} />

      <Layout v='board' columns={2} g='sm'>
        <Field.Select path='access' label={t('FIELD.ACCESS')} items={VISIBILITY_OPTIONS} />
        <Field.Number path='price' label={t('FIELD.PRICE')} />
      </Layout>

      <Field.Text path='content' label={t('FIELD.CONTENT')} multiline />

      <Field.Json path='options' label={t('FIELD.OPTIONS')} />

      {children}
    </FormModal>
  )
}

FeatureModal.displayName = 'FeatureModal'

export default FeatureModal
