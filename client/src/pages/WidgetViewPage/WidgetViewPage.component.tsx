import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useWidgetView, useWidgetViewMutations } from 'api'
import { useNavigate, useParams } from 'router'

// ---| pages |---
import FeaturePage, { FEATURE_SNAPSHOT_ID, FeaturePageProps } from 'pages/FeaturePage'
// ---| screens |---
import Playground from 'screens/views/Playground'
// ---| components |---

// ---| self |---
import css from './WidgetViewPage.module.scss'

export type WidgetViewPageProps = FeaturePageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <WidgetViewPage />
 */
export function WidgetViewPage(props: WidgetViewPageProps) {
  const { children, className, ...otherProps } = props
  const _className = cn(css.WidgetViewPage, className)
  const { id } = useParams()
  const navigate = useNavigate()
  const widget = useWidgetView(id)
  const mutations = useWidgetViewMutations()

  // TODO: security | Data safety | https://play.google.com/store/apps/datasafety?id=org.telegram.messenger

  return (
    <FeaturePage
      className={_className}
      options={widget.data}
      menu={[
        { start: 'add', tooltip: 'Create widget based on current widget' },
      ]}
      onRemove={() => {
        mutations.remove(widget.data)
        navigate('WIDGET_VIEWS')
      }}
      {...otherProps}
    >
      <Playground previewId={FEATURE_SNAPSHOT_ID} />
      {children}
    </FeaturePage>
  )
}

WidgetViewPage.displayName = 'WidgetViewPage'

export default WidgetViewPage
