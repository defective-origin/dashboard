import React, { LegacyRef, forwardRef } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Item, { ItemProps } from 'components/Item'

// ---| self |---
import css from './Widget.module.scss'

export type WidgetProps<O> = ItemProps & {
  options?: O
  active?: boolean
}

// TODO: remove forwardRef after migrating to react 19

/**
 * Component description.
 *
 * How to use
 * @example
 * <Widget />
 */
export const Widget = forwardRef(<O,>(props: WidgetProps<O>, ref: LegacyRef<unknown>): JSX.Element => {
  const { active, options, children, className, ...otherProps } = props

  // TODO: provide data for widget: breakpoint, theme, language, key, endpoint, version

  return (
    <Item ref={ref} className={cn(css.Widget, active && css.Active, className)} {...otherProps}>
      {children}
    </Item>
  )
})

Widget.displayName = 'Widget'

export default Widget
