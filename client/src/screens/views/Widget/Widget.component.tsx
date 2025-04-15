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

  return (
    <Item className={cn(css.Widget, className)} {...otherProps}>
      {children}
    </Item>
  )
}

Widget.displayName = 'Widget'

export default Widget
