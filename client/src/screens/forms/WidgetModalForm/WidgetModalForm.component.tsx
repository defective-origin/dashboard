import React, { useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { useLocale } from 'locale'
import { DashboardWidget, useReleases } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Field from 'components/fields'
import Layout from 'components/Layout'
import ModalForm, { ModalFormProps } from 'components/ModalForm'

// ---| self |---
import css from './WidgetModalForm.module.scss'

export type WidgetModalFormProps = ModalFormProps<DashboardWidget>

/**
 * Component description.
 *
 * How to use
 * @example
 * <WidgetModalForm />
 */
export function WidgetModalForm(props: WidgetModalFormProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.WidgetModalForm, className)
  const locale = useLocale()
  const [options, setOptions] = useState<DashboardWidget>()
  const releases = useReleases(options?.id)

  const versionOptions = releases.map((release) => ({ value: release.version, children: release.version }))
  const ACCESS_OPTIONS = [
    { value: 'private', children: locale.t('ACCESS.PRIVATE') },
    { value: 'public', children: locale.t('ACCESS.PUBLIC') },
    { value: 'subscription', children: locale.t('ACCESS.SUBSCRIPTION') },
  ]

  // TODO: generate from data
  // Select should allows to get simple items and convert them [1,2] => [{ value: 1, children: 1 }, { value: 2, children: 2 }]
  // TODO: add presets endpoints on account settings
  // TODO: who can change field
  // TODO: add save as preset button

  return (
    <ModalForm className={_className} name='widget-settings' title={locale.t('FORM.WIDGET_SETTINGS')} onOpen={setOptions} {...otherProps}>
      <Field.Text path='id' label={locale.t('FIELD.ID')} value={options?.id.toString()} disabled />
      <Layout v='board' columns={3} g='sm'>
        <Field.Text path='author' label={locale.t('FIELD.AUTHOR')} value={options?.author.toString()} disabled />
        <Field.Select path='access' label={locale.t('FIELD.ACCESS')} items={ACCESS_OPTIONS} value={options?.access} />
        <Field.Select path='version' label={locale.t('FIELD.VERSION')} items={versionOptions} value={options?.version} />
      </Layout>

      <Field.Text path='name' label={locale.t('FIELD.NAME')} value={options?.name} />
      <Field.Text path='key' label={locale.t('FIELD.KEY')} value={options?.key} />
      <Field.Text path='endpoint' label={locale.t('FIELD.ENDPOINT')} value={options?.endpoint} />
      <Field.Text path='description' label={locale.t('FIELD.DESCRIPTION')} value={options?.description} multiline />

      {children}
    </ModalForm>
  )
}

WidgetModalForm.displayName = 'WidgetModalForm'

export default WidgetModalForm
