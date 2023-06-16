import { Line, Square, squareWidth, squareHeight } from '../Placement'
import { painter2D, ShapeStyleOptions } from './common'

// LINE
export type LineShapeOptions = Line

export const LinePainter2D = painter2D((context: CanvasRenderingContext2D, options: LineShapeOptions, styles: ShapeStyleOptions) => {
  const { v1, v2 } = options

  context.moveTo(v1.x, v1.y)
  context.lineTo(v2.x, v2.y)

  if (styles.strokeStyle) {
    context.stroke()
  }
})

// GRID
export type GridShapeOptions = Square & {
  columns?: number
  rows?: number
}

export const GridPainter2D = painter2D((context: CanvasRenderingContext2D, options: GridShapeOptions, styles: ShapeStyleOptions) => {
  const { v1, v2, columns, rows } = options
  const width = squareWidth(options)
  const height = squareHeight(options)

  if (!columns || !rows) {
    return
  }

  const cell = {
    width: width / columns,
    height: height / rows,
  }

  // vertical lines
  for (let current = v1.x; current <= width; current += cell.width) {
    context.moveTo(current, v1.y)
    context.lineTo(current, v2.y)
  }

  // horizontal lines
  for (let current = v1.y; current <= height; current += cell.height) {
    context.moveTo(v1.x, current)
    context.lineTo(v2.x, current)
  }

  if (styles.strokeStyle) {
    context.stroke()
  }
})

// CARD
export type SquareShapeOptions = Square & {
  radius?: number
}

export const SquarePainter2D = painter2D((context: CanvasRenderingContext2D, options: SquareShapeOptions, styles: ShapeStyleOptions) => {
  const { v1, v2, radius } = options
  const width = squareWidth(options)
  const height = squareHeight(options)

  if (!radius) {
    context.rect(v1.x, v1.y, width, height)
  } else {
    const xr = v1.x + radius
    const yr = v1.y + radius
    const xr2 = v2.x - radius
    const yr2 = v2.y - radius

    // draw figure
    context.moveTo(xr, v1.y)
    // top
    context.lineTo(xr2, v1.y)
    context.quadraticCurveTo(v2.x, v1.y, v2.x, yr)
    // right
    context.lineTo(v2.x, yr2)
    context.quadraticCurveTo(v2.x, v2.y, xr2, v2.y)
    // bottom
    context.lineTo(xr, v2.y)
    context.quadraticCurveTo(v1.x, v2.y, v1.x, yr2)
    // left
    context.lineTo(v1.x, yr)
    context.quadraticCurveTo(v1.x, v1.y, xr, v1.y)
  }

  if (styles.fillStyle) {
    context.fill()
  }

  if (styles.strokeStyle) {
    context.stroke()
  }
})
