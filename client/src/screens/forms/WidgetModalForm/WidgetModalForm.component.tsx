import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { Ref, useWidget, useWidgetMutations, Widget } from 'api'

// ---| pages |---
// ---| screens |---
import FeatureModalForm, { FeatureModalFormProps } from 'screens/forms/FeatureModalForm'

// ---| components |---
import { useModalPayload } from 'components/popups/Modal'

// ---| self |---
import css from './WidgetModalForm.module.scss'

const WIDGET_MODAL_NAME = 'widget-settings'

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
  const payload = useModalPayload<Ref>(WIDGET_MODAL_NAME)
  const widget = useWidget(payload?.id)
  const widgetMutations = useWidgetMutations()

  // const versionOptions = releases.map(release => ({ value: release.version, children: release.version }))

  // add tabs: General, Options

  return (
    <FeatureModalForm
      className={_className}
      name={WIDGET_MODAL_NAME}
      title={t('FORM.WIDGET_SETTINGS')}
      init={widget.data}
      onSubmit={patch => widgetMutations.update.mutateAsync(patch)}
      {...otherProps}
    >
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
