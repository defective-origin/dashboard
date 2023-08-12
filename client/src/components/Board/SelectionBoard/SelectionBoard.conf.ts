// ---| common |---
import { GridCell } from 'common/hooks'
import { canvas, placement } from 'common/tools'

/**
 * Allow create property getter
 * Approach allows to get css variables and other props [ex: for drawing in canvas]
 * https://stackoverflow.com/questions/71368314/can-i-set-a-canvas-fillstyle-with-a-variable-from-css
 */
export function uProperty<T extends string = string>(element: Element, defaultProperty?: T) {
  return function (property = defaultProperty) {
    if (!property || !element) {
      return undefined
    }

    return getComputedStyle(element).getPropertyValue(property)
  }
}

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

export function initBoardStyles(element: Element) {
  const property = uProperty(element)
  const styles: Required<SelectionBoardStyles> = {
    area: {
      radius: 2,
      invalid: area(property(BOARD_PROPERTY_NAMES.INVALID_AREA_COLOR)),
      selected: area(property(BOARD_PROPERTY_NAMES.SELECTED_AREA_COLOR)),
      replace: area(property(BOARD_PROPERTY_NAMES.REPLACE_AREA_COLOR)),
    },
    grid: grid(property(BOARD_PROPERTY_NAMES.DIVIDER_COLOR)),
  }

  return styles
}

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
