import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useWidget, useWidgetMutations } from 'api'
import { useNavigate, useParams } from 'router'

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
 *
 * How to use
 * @example
 * <WidgetPage />
 */
export function WidgetPage(props: WidgetPageProps) {
  const { children, className, ...otherProps } = props
  const _className = cn(css.WidgetPage, className)
  const { id } = useParams()
  const navigate = useNavigate()
  const widget = useWidget(id)
  const mutations = useWidgetMutations()

  // TODO: add WRAPPER WHICH CAN BE CHANGED SIZE BY VERTICAL AND HORIZONTAL AND ALIGN IT BY CENTER

  // TODO: security | Data safety | https://play.google.com/store/apps/datasafety?id=org.telegram.messenger
  return (
    <FeaturePage
      className={_className}
      options={widget.data}
      onRemove={() => {
        mutations.remove(widget.data)
        navigate('WIDGETS')
      }}
      onClone={() => console.log('CREATE CLONE')}
      onInherit={() => console.log('INHERIT')}
      {...otherProps}
    >
      <Playground previewId={FEATURE_SNAPSHOT_ID} />
      {children}
    </FeaturePage>
  )
}

WidgetPage.displayName = 'WidgetPage'

export default WidgetPage
