import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Item, { ItemProps } from 'components/layouts/Item'

// ---| self |---
import css from './Widget.module.scss'

export type WidgetProps<O> = ItemProps & {
  options?: O
  active?: boolean
}


/**
 * Component description.
 *
 * How to use
 * @example
 * <Widget />
 */
export const Widget = <O,>(props: WidgetProps<O>): JSX.Element => {
  const { active, options, children, className, ...otherProps } = props

  // TODO: provide data for widget: breakpoint, theme, language, key, endpoint, version

  return (
    <Item className={cn(css.Widget, active && css.Active, className)} {...otherProps}>
      {children}
    </Item>
  )
}

Widget.displayName = 'Widget'

export default Widget
