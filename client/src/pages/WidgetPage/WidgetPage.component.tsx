import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useWidget, useWidgetMutations } from 'api'
import { useAppNavigate, useParams } from 'router'

// ---| pages |---
import FeaturePage, { FEATURE_SNAPSHOT_ID, FeaturePageProps } from 'pages/FeaturePage'
// ---| screens |---
import Playground from 'screens/views/Playground'
// ---| components |---

// ---| self |---
import css from './WidgetPage.module.scss'

export type WidgetPageProps = FeaturePageProps

/**
 * Component description.
 * @example
 * <WidgetPage />
 */
export function WidgetPage(props: WidgetPageProps) {
  const { children, className, ...otherProps } = props
  const { id } = useParams()
  const navigate = useAppNavigate()
  const widget = useWidget(id)
  const mutations = useWidgetMutations()

  // TODO: add WRAPPER WHICH CAN BE CHANGED SIZE BY VERTICAL AND HORIZONTAL AND ALIGN IT BY CENTER

  // TODO: security | Data safety | https://play.google.com/store/apps/datasafety?id=org.telegram.messenger
  return (
    <FeaturePage
      className={cn(css.WidgetPage, className)}
      options={widget.data}
      onRemove={() => {
        mutations.remove(widget.data)
        navigate({ to: 'WIDGETS' })
      }}
      onClone={() => console.log('CREATE CLONE')}
      onInherit={() => console.log('INHERIT')}
      {...otherProps}
    >
      <Playground previewId={FEATURE_SNAPSHOT_ID} stretch />
      {children}
    </FeaturePage>
  )
}

WidgetPage.displayName = 'WidgetPage'

export default WidgetPage
