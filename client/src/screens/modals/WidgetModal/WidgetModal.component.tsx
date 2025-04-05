import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Ref, useWidget, useWidgetMutations, Widget } from 'api'

// ---| pages |---
// ---| screens |---
import FeatureModal, { FeatureModalProps } from 'screens/modals/FeatureModal'

// ---| components |---
import { useModalPayload } from 'components/popups/Modal'

// ---| self |---
import css from './WidgetModal.module.scss'

const MODAL_NAME = 'widget-settings'

export type WidgetModalProps = FeatureModalProps<Widget>

/**
 * Component description.
 *
 * How to use
 * @example
 * <WidgetModal />
 */
export function WidgetModal(props: WidgetModalProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.WidgetModal, className)
  const payload = useModalPayload<Ref>(MODAL_NAME)
  const widget = useWidget(payload?.id)
  const widgetMutations = useWidgetMutations()

  // const versionOptions = releases.map(release => ({ value: release.version, children: release.version }))

  // add tabs: General, Options

  return (
    <FeatureModal
      className={_className}
      name={MODAL_NAME}
      icon='insert_chart'
      title={widget.data?.name}
      init={widget.data}
      onSubmit={patch => widgetMutations.update.mutateAsync(patch)}
      {...otherProps}
    >
      {/* <Field.Select path='version' label={t('FIELD.VERSION')} items={versionOptions} value={options?.version} />
      <Field.Text path='key' label={t('FIELD.KEY')} value={options?.key} />
      <Field.Text path='endpoint' label={t('FIELD.ENDPOINT')} value={options?.endpoint} />
      <Field.Text path='description' label={t('FIELD.DESCRIPTION')} value={options?.description} multiline /> */}

      {children}
    </FeatureModal>
  )
}

WidgetModal.modalName = MODAL_NAME
WidgetModal.displayName = 'WidgetModal'

export default WidgetModal
