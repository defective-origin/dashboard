import React, { useState } from 'react'

// ---| core |---
import { t } from 'locale'
import { cn } from 'tools'
import { Feature } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Field from 'components/fields'
import Layout from 'components/Layout'
import ModalForm, { ModalFormProps } from 'components/ModalForm'

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
  const [options, setOptions] = useState<Feature>()
  const ACCESS_OPTIONS = [
    { value: 'private', children: t('ACCESS.PRIVATE') },
    { value: 'public', children: t('ACCESS.PUBLIC') },
  ]

  // Select should allows to get simple items and convert them [1,2] => [{ value: 1, children: 1 }, { value: 2, children: 2 }]
  // TODO: who can change field
  // TODO: add save as preset button
  // TODO: init form via value={form}?

  return (
    <ModalForm className={_className} onOpen={setOptions} {...otherProps}>
      <Field.Text path='id' label={t('FIELD.ID')} value={options?.id.toString()} disabled />
      <Field.Text path='name' label={t('FIELD.NAME')} value={options?.name} />

      <Layout v='board' columns={2} g='sm'>
        <Field.Select path='access' label={t('FIELD.ACCESS')} items={ACCESS_OPTIONS} value={options?.access} />
        <Field.Number path='price' label={t('FIELD.PRICE')} value={options?.price} />
      </Layout>

      <Field.Text path='content' label={t('FIELD.CONTENT')} value={options?.content} multiline />

      {children}
    </ModalForm>
  )
}

FeatureModalForm.displayName = 'FeatureModalForm'

export default FeatureModalForm
