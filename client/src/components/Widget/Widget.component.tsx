import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Menu, { MenuItem } from 'components/Menu'

// ---| self |---
import css from './Widget.module.scss'

export type WidgetProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Widget />
 */
export function Widget(props: WidgetProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const actions: MenuItem[] = [
    { start: 'resize', tooltip: 'Replace' },
    { start: 'zoom_out_map', tooltip: 'Full screen' },
    { start: 'favorite', tooltip: 'Like' },
    { start: 'book', tooltip: 'Docs' },
    { start: 'settings', tooltip: 'Settings' },
    { start: 'close', tooltip: 'Remove' },
  ]

  return (
    <Menu
      horizontal
      v='top-start'
      tooltipSide='top'
      items={actions}
      trigger={(o) => (
        <div className={cn(css.Widget, o.open && css.Active, className)} {...otherProps}>
          {children}
        </div>
      )}
    />
  )
}

Widget.displayName = 'Widget'

export default Widget
