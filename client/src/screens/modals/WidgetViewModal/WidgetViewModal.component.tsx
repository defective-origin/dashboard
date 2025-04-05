import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Ref, useWidgetView, useWidgetViewMutations, WidgetView } from 'api'

// ---| pages |---
// ---| screens |---
import FeatureModal, { FeatureModalProps } from 'screens/modals/FeatureModal'

// ---| components |---
import { useModalPayload } from 'components/popups/Modal'

// ---| self |---
import css from './WidgetViewModal.module.scss'

const MODAL_NAME = 'widget-view-settings'

export type WidgetViewModalProps = FeatureModalProps<WidgetView>

/**
 * Component description.
 *
 * How to use
 * @example
 * <WidgetViewModal />
 */
export function WidgetViewModal(props: WidgetViewModalProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.WidgetViewModal, className)
  const payload = useModalPayload<Ref>(MODAL_NAME)
  const widget = useWidgetView(payload?.id)
  const widgetMutations = useWidgetViewMutations()

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

WidgetViewModal.modalName = MODAL_NAME
WidgetViewModal.displayName = 'WidgetViewModal'

export default WidgetViewModal
