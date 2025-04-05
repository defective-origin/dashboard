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
import ModalForm, { ModalFormProps } from 'components/forms/ModalForm'

// ---| self |---
import css from './FeatureModalForm.module.scss'

export type FeatureModalFormProps<T extends Feature> = ModalFormProps<T>

/**
 * Component description.
 *
 * How to use
 * @example
 * <FeatureModalForm />
 */
export function FeatureModalForm<T extends Feature>(props: FeatureModalFormProps<T>): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.FeatureModalForm, className)
  const ACCESS_OPTIONS = [
    { value: 'PRIVATE', children: t('ACCESS.PRIVATE') },
    { value: 'PUBLIC', children: t('ACCESS.PUBLIC') },
  ]

  // TODO: who can change field

  return (
    <ModalForm className={_className} {...otherProps}>
      <Field.Text path='id' label={t('FIELD.ID')} disabled />
      <Field.Text path='name' label={t('FIELD.NAME')} />

      <Layout v='board' columns={2} g='sm'>
        <Field.Select path='access' label={t('FIELD.ACCESS')} items={ACCESS_OPTIONS} />
        <Field.Number path='price' label={t('FIELD.PRICE')} />
      </Layout>

      <Field.Text path='content' label={t('FIELD.CONTENT')} multiline />

      <Field.Json path='options' label={t('FIELD.OPTIONS')} />

      {children}
    </ModalForm>
  )
}

FeatureModalForm.displayName = 'FeatureModalForm'

export default FeatureModalForm
