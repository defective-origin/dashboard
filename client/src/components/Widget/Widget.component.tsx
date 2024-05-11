import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useLocale } from 'locale'

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
  const locale = useLocale()
  const actions: MenuItem[] = [
    { start: 'resize', tooltip: locale.t('ACTION.REPLACE') },
    { start: 'zoom_out_map', tooltip: locale.t('ACTION.FULL_SCREEN') },
    { start: 'favorite', tooltip: locale.t('ACTION.FAVORITE') },
    { start: 'book', tooltip: locale.t('ACTION.DOCS') },
    { start: 'settings', tooltip: locale.t('ACTION.SETTINGS') },
    { start: 'close', tooltip: locale.t('ACTION.REMOVE') },
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
