import React from 'react'

// ---| components |---
import { GridCell, GridItem } from 'common/hooks'
import { react } from 'common/tools'

export type ViewBoardItemPrototype = React.ComponentType<react.GeneralProps>

export type ViewBoardItemProps = GridItem & {
  // margin around widget
  margin?: number,
  // size of one block on board
  cell: GridCell,
  // item which should be displayed
  as?: ViewBoardItemPrototype
}

function ViewBoardItem(props: ViewBoardItemProps): JSX.Element | null {
  const { placement, as: Widget, cell, margin = 0, ...otherWidgetProps } = props

  if (!Widget) {
    return null
  }

  const left = (placement.v1.x * cell.width) + margin
  const top = (placement.v1.y * cell.height) + margin
  const left2 = (placement.v2.x * cell.width) - margin
  const top2 = (placement.v2.y * cell.height) - margin
  const widgetStyle: React.CSSProperties = {
    left,
    top,
    width: left2 - left,
    height: top2 - top,
    position: 'absolute',
    overflow: 'hidden',
  }

  return <Widget {...otherWidgetProps} style={widgetStyle} />
}

ViewBoardItem.displayName = 'ViewBoardItem'

export default ViewBoardItem
