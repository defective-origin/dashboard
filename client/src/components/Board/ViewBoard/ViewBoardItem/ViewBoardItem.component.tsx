import React from 'react'

// ---| core |---
import { xy } from 'tools'

// ---| self |---
import css from './ViewBoardItem.module.scss'

export type ViewBoardItemProps<I extends Record<string, unknown>> = {
  options: I
  // margin around widget
  margin?: number,
  /** Size of cell */
  cell?: xy.Vector
  /** Place selector */
  placeKey?: string,
}

function ViewBoardItem<I extends Record<string, unknown>>(props: ViewBoardItemProps<I>): JSX.Element | null {
  const { options, placeKey = '', cell = xy.vector(1, 1), margin = 0, ...otherProps } = props
  const place = (options[placeKey] ?? options) as xy.Square

  const left = (place.v1.x * cell.x) + margin
  const top = (place.v1.y * cell.y) + margin
  const left2 = (place.v2.x * cell.x) - margin
  const top2 = (place.v2.y * cell.y) - margin
  const style: React.CSSProperties = {
    left,
    top,
    width: left2 - left,
    height: top2 - top,
    position: 'absolute',
    overflow: 'hidden',
  }

  return <div className={css.ViewBoardItem} style={style} {...otherProps} />
}

ViewBoardItem.displayName = 'ViewBoardItem'

export default ViewBoardItem
