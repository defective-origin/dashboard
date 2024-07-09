import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { Widget } from 'api'

// ---| pages |---
// ---| screens |---
import FeatureModalForm, { FeatureModalFormProps } from '../FeatureModalForm'

// ---| components |---
// ---| self |---
import css from './WidgetModalForm.module.scss'

export type WidgetModalFormProps = FeatureModalFormProps<Widget>

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

  // const versionOptions = releases.map(release => ({ value: release.version, children: release.version }))

  return (
    <FeatureModalForm className={_className} name='widget-settings' title={t('FORM.WIDGET_SETTINGS')} {...otherProps}>
      {/* <Field.Select path='version' label={t('FIELD.VERSION')} items={versionOptions} value={options?.version} />
      <Field.Text path='key' label={t('FIELD.KEY')} value={options?.key} />
      <Field.Text path='endpoint' label={t('FIELD.ENDPOINT')} value={options?.endpoint} />
      <Field.Text path='description' label={t('FIELD.DESCRIPTION')} value={options?.description} multiline /> */}

      {children}
    </FeatureModalForm>
  )
}

WidgetModalForm.displayName = 'WidgetModalForm'

export default WidgetModalForm
