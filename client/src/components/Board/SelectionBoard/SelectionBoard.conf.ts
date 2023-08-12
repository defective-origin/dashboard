// ---| common |---
import { GridCell, UsePropertyReturnOptions } from 'common/hooks'
import { canvas, placement } from 'common/tools'

export const BOARD_PROPERTY_NAMES = {
  INVALID_AREA_COLOR: '--invalid-area-color',
  SELECTED_AREA_COLOR: '--selected-area-color',
  REPLACE_AREA_COLOR: '--replace-area-color',
  DIVIDER_COLOR: '--divider-color',
}

export type SelectionBoardStyles = {
  area?: {
    radius?: number
    invalid?: canvas.ShapeStyleOptions
    selected?: canvas.ShapeStyleOptions
    replace?: canvas.ShapeStyleOptions
  }
  grid?: canvas.ShapeStyleOptions
}

export const grid = (color?: string, line = 1) => ({
  strokeStyle: color,
  lineWidth: line,
})

export const area = (color?: string, line = 2) => ({
  strokeStyle: color,
  fillStyle: color,
  lineWidth: line,
})

export const initBoardStyles = (property: UsePropertyReturnOptions): Required<SelectionBoardStyles> => ({
  area: {
    radius: 2,
    invalid: area(property(BOARD_PROPERTY_NAMES.INVALID_AREA_COLOR)),
    selected: area(property(BOARD_PROPERTY_NAMES.SELECTED_AREA_COLOR)),
    replace: area(property(BOARD_PROPERTY_NAMES.REPLACE_AREA_COLOR)),
  },
  grid: grid(property(BOARD_PROPERTY_NAMES.DIVIDER_COLOR)),
})

export type AreaOptions = {
  place: placement.Square
  cell: GridCell
  margin: number
  radius?: number
}

export const initAreaOptions = ({ place, cell, margin, radius }: AreaOptions): canvas.SquareShapeOptions => ({
  ...placement.square(
    place.v1.x * cell.width + margin,
    place.v1.y * cell.height + margin,
    place.v2.x * cell.width - margin,
    place.v2.y * cell.height - margin,
  ),
  radius,
})
