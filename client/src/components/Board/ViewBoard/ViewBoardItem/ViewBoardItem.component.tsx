import React from 'react'

// ---| core |---
import { xy } from 'tools'

// ---| components |---
import Item from 'components/Item'

// ---| self |---
import css from './ViewBoardItem.module.scss'

export type ViewBoardItemProps<I extends Record<string, unknown>> = {
  options: I
  /** Place selector */
  placeKey?: string,
  /** Component to render */
  widget?: React.ElementType
}

function ViewBoardItem<I extends Record<string, unknown>>(props: ViewBoardItemProps<I>): JSX.Element | null {
  const { widget: Widget, options, placeKey = '', ...otherProps } = props // FIXME: rename margin to indent
  const place = (options[placeKey] ?? options) as xy.Square
  const area = `${place.v1.y + 1} / ${place.v1.x + 1} / ${place.v2.y + 1} / ${place.v2.x + 1}`

  if (!Widget) {
    return null
  }

  return (
    <Item className={css.ViewBoardItem} area={area} {...otherProps}>
      <Widget {...options} />
    </Item>
  )
}

ViewBoardItem.displayName = 'ViewBoardItem'

export default ViewBoardItem
