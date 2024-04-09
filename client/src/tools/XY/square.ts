import { line } from './line'
import { eqByXY, leByXY, ltByXY, maxByXY, minByXY, rotateVectors, scaleVectors, Vector, vector, ZeroVector } from './vector'

export type Square = {
  v1: Vector
  v2: Vector
}

export function square(square_or_vectors: Square | Vector[]): Square
export function square(v1: number | Vector, v2: number | Vector): Square
export function square(v1: number | Vector, width: number, height: number): Square
export function square(x1: number, y1: number, x2: number, y2: number): Square
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function square(arg1: any, v2_or_width?: any, height?: number, y2?: number): Square {
  const vectors: Vector[] = []

  // by another square - square
  if (arg1.v1, arg1.v2) {
    return { ...arg1 }

  // by coordinates - x1, y1, x2, y2
  } else if (y2 && height) {
    vectors.push(vector(arg1, v2_or_width), vector(height, y2))

  // by vector and size - vector, width, height
  } else if (height) {
    const v1 = vector(arg1)

    vectors.push(vector(arg1), vector(v1.x + v2_or_width, v1.y + height))

  // by two vectors - vector, vector
  } else if(v2_or_width) {
    vectors.push(vector(arg1), vector(v2_or_width))

  // by vector array - vectors[]
  } else if (Array.isArray(arg1)) {
    vectors.push(...arg1)
  }

  const max = maxByXY(vectors) ?? ZeroVector
  const min = minByXY(vectors) ?? ZeroVector

  return { v1: min, v2: max }
}

export default square

// ---------------------- COMPARISON ----------------------

export const equalSquare = (a: Square, b: Square): boolean => eqByXY(a.v1, b.v1) && eqByXY(a.v2, b.v2)

export const inSquare = (a: Square, b: Square): boolean => leByXY(a.v1, b.v1) && leByXY(b.v2, a.v2)

export const outSquare = (a: Square, b: Square): boolean => !inSquare(a, b)

export const crossSquare = (a: Square, b: Square): boolean => ltByXY(a.v1, b.v2) && ltByXY(b.v1, a.v2)

export const pointInSquare = (a: Square, b: Vector): boolean => leByXY(a.v1, b) && leByXY(b, a.v2)

// ---------------------- SELECTION ----------------------

/**
 * Return object size offset Vector.
 *
 * @param { Square } item Square object
 * @returns { Vector } Return object start Vector.
 */
export const squareSizeVector = (square: Square) => vector(squareWidth(square), squareHeight(square))

export const squareWidth = (square: Square) => Math.abs(square.v1.x - square.v2.x)

export const squareHeight = (square: Square) => Math.abs(square.v1.y - square.v2.y)

export type LineVector = 'start' | 'center' | 'end'

const LineVectorHandler: Record<LineVector, (pos: number, length: number) => number> = {
  start: (pos) => pos,
  center: (pos, length) => pos + (length / 2),
  end: (pos, length) => pos + length,
}

/**
 * Return object Vector related to orientation.
 *
 * ------------------
 * |s-s   c-s   e-s |
 * |s-c   c-c   e-c |
 * |s-e   c-e   e-e |
 * ------------------
 *
 * @param { Square } item Square object
 * @param { LineVector } x Orientation type
 * @param { LineVector } y Orientation type
 * @returns { Vector } Return oriented Vector.
 */
export const bySquarePoint = (item: Square, x: LineVector, y: LineVector): Vector =>
  vector(
    LineVectorHandler[x](item.v1.x, squareWidth(item)),
    LineVectorHandler[y](item.v1.y, squareHeight(item)),
  )

/**
 * Create outer bounding box.
 *
 * @param { Square[] } items Square items
 * @returns { Vector } Return outer bounding box
 */
export const outerBox = (items: Square[]): Square => {
  const vectors = items.flatMap(squareCornerPoints)

  return square(vectors)
}

/**
 * Return all main lines in square.
 *
 * @param { Square[] } items Square items
 * @returns { Vector } Return all main lines in square.
 */
export const squareLines = (item: Square) => ({
  vertical: [
    line(bySquarePoint(item, 'start', 'start'), bySquarePoint(item, 'start', 'end')),
    line(bySquarePoint(item, 'center', 'start'), bySquarePoint(item, 'center', 'end')),
    line(bySquarePoint(item, 'end', 'start'), bySquarePoint(item, 'end', 'end')),
  ],
  horizontal: [
    line(bySquarePoint(item, 'start', 'start'), bySquarePoint(item, 'end', 'start')),
    line(bySquarePoint(item, 'start', 'center'), bySquarePoint(item, 'end', 'center')),
    line(bySquarePoint(item, 'start', 'end'), bySquarePoint(item, 'end', 'end')),
  ],
  diagonal: [
    line(bySquarePoint(item, 'start', 'start'), bySquarePoint(item, 'end', 'end')),
    line(bySquarePoint(item, 'end', 'start'), bySquarePoint(item, 'start', 'end')),
  ],
})

/**
 * Return all main points in square.
 *
 * @param { Square[] } items Square items
 * @returns { Vector } Return all main points in square.
 */
export const squareCornerPoints = (item: Square): Vector[] => [
  bySquarePoint(item, 'start', 'start'),
  bySquarePoint(item, 'start', 'end'),
  bySquarePoint(item, 'end', 'start'),
  bySquarePoint(item, 'end', 'end'),
]

/**
 * Return all center points in square.
 *
 * @param { Square[] } items Square items
 * @returns { Vector } Return all center points in square.
 */
export const squareCenterPoints = (item: Square): Vector[] => [
  bySquarePoint(item, 'start', 'center'),
  bySquarePoint(item, 'center', 'start'),
  bySquarePoint(item, 'center', 'center'),
  bySquarePoint(item, 'center', 'end'),
  bySquarePoint(item, 'end', 'center'),
]

/**
 * Return all main points in square.
 *
 * @param { Square[] } items Square items
 * @returns { Vector } Return all main points in square.
 */
export const squarePoints = (item: Square): Vector[] => [
  ...squareCornerPoints(item),
  ...squareCenterPoints(item),
]

// ---------------------- MOVING ----------------------

/**
 * Rotates square relative to a vector by a given angle.
 *
 * @param { number } degree Angle to rotate
 * @param { Square } s Square
 * @param { Vector } center Center offset vector
 * @returns { Square } Return rotated Square
 */
export const rotateSquare = (degree: number, s: Square, center: Vector = ZeroVector): Square => {
  return square(rotateVectors(degree, squareCornerPoints(s), center))
}

/**
 * Change coordinates.
 *
 * @param { Square } s Square
 * @param { number } zoom Scale
 * @returns { Square } Return scaled Square
 */
export const scaleSquare = (s: Square, zoom: number): Square => {
  return square(scaleVectors(squareCornerPoints(s), zoom))
}
