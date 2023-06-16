import { compareAndSelectBy, eqBy, geBy, gtBy, leBy, ltBy } from './common'
import { maxByXY, minByXY, rotateVectors, scaleVectors, vector, Vector, ZeroVector } from './vector'

export type Line = {
  v1: Vector
  v2: Vector
}

export function line(line_or_vectors: Line | Vector[]): Line
export function line(v1: number | Vector, v2: number | Vector): Line
export function line(arg1: any, arg2?: any): Line {
  // by another line - line
  if (arg1.v1, arg1.v2) {
    return { ...arg1 }

  // by vector array - vectors[]
  } else if (Array.isArray(arg1)) {
    const max = maxByXY(arg1) ?? ZeroVector
    const min = minByXY(arg1) ?? ZeroVector

    return { v1: min, v2: max }
  }

  // by two vectors - vector, vector
  return { v1: vector(arg1), v2: vector(arg2) }
}

export default line

// ---------------------- COMPARISON ----------------------

/**
 * Compare two objects and return true if two lines are equal by line length line otherwise false.
 *
 * @param { Line } a Object with Line
 * @param { Line } b Object with Line
 * @returns { boolean } Return true if two lines are equal by line length line otherwise false.
 */
export const eqByLength = (a: Line, b: Line): boolean => eqBy(a, b, lineLength)

/**
  * Compare two objects and return true if line a less then b by line length line otherwise false.
  *
  * @param { Line } a Object with Line
  * @param { Line } b Object with Line
  * @returns { boolean } Return true if line a less then b by line length line otherwise false.
  */
export const ltByLength = (a: Line, b: Line): boolean => ltBy(a, b, lineLength)

/**
  * Compare two objects and return true if line a great then b by line length line otherwise false.
  *
  * @param { Line } a Object with Line
  * @param { Line } b Object with Line
  * @returns { boolean } Return true if line a great then b by line length line otherwise false.
  */
export const gtByLength = (a: Line, b: Line): boolean => gtBy(a, b, lineLength)

/**
  * Compare two objects and return true if line a less then b or equal by line length line otherwise false.
  *
  * @param { Line } a Object with Line
  * @param { Line } b Object with Line
  * @returns { boolean } Return true if line a less then b or equal by line length line otherwise false.
  */
export const leByLength = (a: Line, b: Line): boolean => leBy(a, b, lineLength)

/**
  * Compare two objects and return true if line a great then b or equal by line length line otherwise false.
  *
  * @param { Line } a Object with Line
  * @param { Line } b Object with Line
  * @returns { boolean } Return true if line a great then b or equal by line length line otherwise false.
  */
export const geByLength = (a: Line, b: Line): boolean => geBy(a, b, lineLength)

/**
 * Return true if lines are crossed otherwise false.
 *
 * @param { Line[] } a Line
 * @param { Line[] } b Line
 * @returns { Line } Return true if line is crossed otherwise false.
 */
export const crossByLine = (a: Line, b: Line): boolean => {
  const det = (a.v2.x - a.v1.x) * (b.v2.y - b.v1.y) - (b.v2.x - b.v1.x) * (a.v2.y - a.v1.y);
  if (det === 0) {
    return false;
  }

  const lambda = ((b.v2.y - b.v1.y) * (b.v2.x - a.v1.x) + (b.v1.x - b.v2.x) * (b.v2.y - a.v1.y)) / det;
  const gamma = ((a.v1.y - a.v2.y) * (b.v2.x - a.v1.x) + (a.v2.x - a.v1.x) * (b.v2.y - a.v1.y)) / det;

  return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
};

// ---------------------- SELECTION ----------------------

/**
 * Return Line with maximal length.
 *
 * @param { Line[] } items Line items
 * @returns { Line } Return maximal Line
 */
export const maxByLength = (items: Line[]): Line | null => compareAndSelectBy(items, gtByLength)

/**
 * Return Line with minimal length.
 *
 * @param { Line[] } items Line items
 * @returns { Line } Return minimal Line
 */
export const minByLength = (items: Line[]): Line | null => compareAndSelectBy(items, ltByLength)

export const lineLength =(line: Line): number => Math.sqrt(Math.pow(line.v2.x - line.v1.x, 2) + Math.pow(line.v2.y - line.v1.y, 2))

export const lineVectors =(line: Line): Vector[] => [line.v1, line.v2]

// ---------------------- MOVING ----------------------

/**
 * Rotates line relative to a vector by a given angle.
 *
 * @param { number } degree Angle to rotate
 * @param { Line } l Line
 * @param { Vector } center Center offset vector
 * @returns { Line } Return rotated Line
 */
export const rotateSquare = (degree: number, l: Line, center: Vector = ZeroVector): Line => {
  return line(rotateVectors(degree, lineVectors(l), center))
}

/**
 * Change coordinates.
 *
 * @param { Line } l Line
 * @param { number } zoom Scale
 * @returns { Line } Return scaled Line
 */
export const scaleLine = (l: Line, zoom: number): Line => {
  return line(scaleVectors(lineVectors(l), zoom))
}
