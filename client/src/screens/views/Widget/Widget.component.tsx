import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Item, { ItemProps } from 'components/layouts/Item'

// ---| self |---
import css from './Widget.module.scss'

export type WidgetProps = ItemProps & {
  id?: string
}


/**
 * Component description.
 *
 * How to use
 * @example
 * <Widget />
 */
export const Widget = (props: WidgetProps) => {
  const { id, children, className, ...otherProps } = props

  // TODO: add banners: error, loading[title + animation background], no-data, under construction, no-access, not-paid[pay button]
  // TODO: if use self requests to prevent the same loadings how to manage create, read, update, delete
  // TODO: use context for widget, board, apps? each nested context mix store, state, options?
  // - request indicator[green/red/blue] [circle dot in the center of the top or left/right cirner]
  // - on click show drower with requests statuses [vertical timeline https://mui.com/material-ui/react-timeline/]
  // - on hover show last 3 request statuses

  // TODO: add svelte widgets: deploy [name, progress, info icon with tooltip, link], chat, charts, cold map, table, list, form, sound/video stream, реклама
  // TODO: onChange, onError, onLoading

  return (
    <Item className={cn(css.Widget, className)} {...otherProps}>
      {children}
    </Item>
  )
}

Widget.displayName = 'Widget'

export default Widget
