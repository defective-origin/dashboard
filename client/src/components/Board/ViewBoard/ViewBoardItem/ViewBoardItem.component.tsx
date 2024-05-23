import React from 'react'

// ---| core |---
import { xy } from 'tools'

// ---| components |---
// ---| self |---
import css from './ViewBoardItem.module.scss'

export type ViewBoardItemProps<I extends Record<string, unknown>> = {
  /** Item options */
  options: I
  /** Place selector */
  placeKey?: string,
  /** Component to render. Should have forwardRef */
  widget?: React.ElementType<{ options: I, className?: string, area: string }>
}

function ViewBoardItem<I extends Record<string, unknown>>(props: ViewBoardItemProps<I>): JSX.Element | null {
  const { widget: Widget, options, placeKey = '', ...otherProps } = props
  const place = (options[placeKey] ?? options) as xy.Square
  const area = `${place.v1.y + 1} / ${place.v1.x + 1} / ${place.v2.y + 1} / ${place.v2.x + 1}`

  if (!Widget) {
    return null
  }

  return (
    <Widget className={css.ViewBoardItem} area={area} options={options} {...otherProps} />
  )
}

ViewBoardItem.displayName = 'ViewBoardItem'

export default ViewBoardItem
