// ---| core |---
import { xy } from 'tools'
import { Color } from 'theme'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---


export type ShapeColor = Color
export type ShapeStyle = {
  fill?: ShapeColor
  stroke?: ShapeColor
  color?: ShapeColor
  line?: number
}

export type StyledShape<O extends object> = O & ShapeStyle
export type PointShape = StyledShape<xy.Vector & { radius?: number }>
export type SquareShape = StyledShape<xy.Square & { radius?: number }>
export type GridShape = StyledShape<{ columns?: number, rows?: number, cell?: xy.Vector }>
export type Shape = SquareShape | GridShape

export type Painter<S extends Shape = Shape> = (context: CanvasRenderingContext2D, item: S, colors: Record<string, string>) => void


const prepare: Painter = (context, item, colors) => {
  // Note: Be aware that clearRect() may cause unintended
  // side effects if you're not using paths properly.
  // Make sure to call beginPath() before
  // starting to draw new items after calling clearRect().
  context.beginPath()

  // set styles
  context.strokeStyle = colors[item.stroke ?? item.color ?? 'bg']
  context.fillStyle = colors[item.fill ?? item.color ?? 'bg']
  context.lineWidth = item.line ?? 1
}


export const point: Painter<PointShape> = (context, item, colors) => {
  const { x, y, radius = 0.5 } = item

  prepare(context, item, colors)

  context.arc(x, y, radius, 0, 2 * Math.PI)

  context.fill()
}

export const grid: Painter<GridShape> = (context, item, colors) => {
  const { columns = 0, rows = 0, cell = xy.vector(1, 1), ...styles } = item

  for (let column = 0; column <= columns; column += 1) {
    for (let row = 0; row <= rows; row += 1) {
      point(context, {
        x: column * cell.x,
        y: row * cell.y,
        ...styles,
      }, colors)
    }
  }
}

export const square: Painter<SquareShape> = (context, item, colors) => {
  const { v1, v2, radius = 0 } = item
  const width = xy.squareWidth(item)
  const height = xy.squareHeight(item)

  prepare(context, item, colors)

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

  context.fill()
  context.stroke()
}
