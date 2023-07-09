import { compareAndSelectBy, degToRadian, eqBy, geBy, gtBy, isNumber, leBy, ltBy, radianToDeg, simplifyAngle } from './common'

export type Vector = {
  x: number
  y: number
}

export function vector(point: number | Vector): Vector
export function vector(x: number, y: number): Vector
export function vector(x_or_point: number | Vector, y?: number) {
  if (isNumber(y)) {
    return { x: x_or_point, y }
  } else if (isNumber(x_or_point)) {
    return { x: x_or_point, y: x_or_point }
  }

  return { ...x_or_point }
}

export default vector

export const ZeroVector = vector(0, 0)
export const MinimalVector = vector(-Infinity)
export const MaximalVector = vector(Infinity)

export type VectorKeys = keyof Vector

// ---------------------- MOVING ----------------------

/**
 * Change coordinates.
 *
 * @param { Vector } v Vector
 * @param { number } zoom Scale
 * @returns { Vector } Return rotated vector
 */
export const scale = (v: Vector, zoom: number): Vector => {
  return {
    ...v,
    x: v.x * zoom,
    y: v.y * zoom,
  }
}

/**
 * Change coordinates.
 *
 * @param { Vector[] } vectors Vectors
 * @param { number } zoom Scale
 * @returns { Vector } Return scaled vector
 */
export const scaleVectors = (vectors: Vector[], zoom: number): Vector[] => {
  return vectors.map((v) => scale(v, zoom))
}

/**
 * Rotates a vector relative to a vector by a given angle.
 *
 * @param { number } degree Angle to rotate
 * @param { Vector } v Vector
 * @param { Vector } center Center offset vector
 * @returns { Vector } Return rotated vector
 */
export const rotate = (degree: number, v: Vector, center: Vector = ZeroVector): Vector => {
  const angle = degToRadian(degree)
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)

  return {
    ...v,
    x: (cos * (v.x - center.x)) - (sin * (v.y - center.y)) + center.x,
    y: (cos * (v.y - center.y)) + (sin * (v.x - center.x)) + center.y,
  }
}

/**
 * Rotates vectors relative to a vector by a given angle.
 *
 * @param { number } degree Angle to rotate
 * @param { Vector[] } vectors Vectors
 * @param { Vector } center Center offset vector
 * @returns { Vector[] } Return rotated vector
 */
export const rotateVectors = (degree: number, vectors: Vector[], center: Vector = ZeroVector): Vector[] => {
  return vectors.map((v) => rotate(degree, v, center))
}

/**
 * Calculate angle between two vectors.
 *
 * @param { Vector } v1 Vector
 * @param { Vector } v2 Vector
 * @returns { Vector } Return angle between two vectors
 */
export const angleBetween = (v1: Vector, v2: Vector) => {
  const angle = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x)

  return simplifyAngle(radianToDeg(angle))
}

/**
 * Move vector like object by given delta.
 *
 * @param { Vector } item Object with Vector
 * @param { Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const moveByX = <
  T extends Vector
>(item: T, delta: number | Vector): T => {
  const deltaVector = vector(delta)

  return {
    ...item,
    x: item.x + deltaVector.x,
  }
}

/**
 * Move vector like object by given delta.
 *
 * @param { Vector } item Object with Vector
 * @param { Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const moveByY = <
  T extends Vector
>(item: T, delta: number | Vector): T => {
  const deltaVector = vector(delta)

  return {
    ...item,
    y: item.y + deltaVector.y,
  }
}

/**
 * Move vector like object by given delta.
 *
 * @param { Vector } item Object with Vector
 * @param { Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const moveByXY = <
  T extends Vector
>(item: T, delta: number | Vector): T => {
  const deltaVector = vector(delta)

  return {
    ...item,
    x: item.x + deltaVector.x,
    y: item.y + deltaVector.y,
  }
}

/**
 * Move vector like object by given delta. Alias for move().
 *
 * @param { Vector } item Object with Vector
 * @param { Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const addByX = <
  T extends Vector
>(item: T, delta: number | Vector): T => moveByX(item, delta)

/**
 * Move vector like object by given delta. Alias for move().
 *
 * @param { Vector } item Object with Vector
 * @param { Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const addByY = <
  T extends Vector
>(item: T, delta: number | Vector): T => moveByY(item, delta)

/**
 * Move vector like object by given delta. Alias for move().
 *
 * @param { Vector } item Object with Vector
 * @param { Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const addByXY = <
  T extends Vector
>(item: T, delta: number | Vector): T => moveByXY(item, delta)

/**
 * Move vector like object back by given delta.
 *
 * @param { Vector } item Object with Vector
 * @param { number | Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const subtractByX = <
  T extends Vector
>(item: T, delta: number | Vector): T => moveByX(item, multiplyByXY(vector(delta), -1))

/**
 * Move vector like object back by given delta.
 *
 * @param { Vector } item Object with Vector
 * @param { number | Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const subtractByY = <
  T extends Vector
>(item: T, delta: number | Vector): T => moveByY(item, multiplyByXY(vector(delta), -1))

/**
 * Move vector like object back by given delta.
 *
 * @param { Vector } item Object with Vector
 * @param { number | Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const subtractByXY = <
  T extends Vector
>(item: T, delta: number | Vector): T => moveByXY(item, multiplyByXY(vector(delta), -1))

/**
 * Shifts vector forward like object several times.
 *
 * @param { Vector } item Object with Vector
 * @param { number | Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const multiplyByX = <
  T extends Vector
>(item: T, delta: number | Vector): T => {
  const deltaVector = vector(delta)

  return {
    ...item,
    x: item.x * deltaVector.x,
  }
}

/**
 * Shifts vector forward like object several times.
 *
 * @param { Vector } item Object with Vector
 * @param { number | Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const multiplyByY = <
  T extends Vector
>(item: T, delta: number | Vector): T => {
  const deltaVector = vector(delta)

  return {
    ...item,
    y: item.y * deltaVector.y,
  }
}

/**
 * Shifts vector forward like object several times.
 *
 * @param { Vector } item Object with Vector
 * @param { number | Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const multiplyByXY = <
  T extends Vector
>(item: T, delta: number | Vector): T => {
  const deltaVector = vector(delta)

  return {
    ...item,
    x: item.x * deltaVector.x,
    y: item.y * deltaVector.y,
  }
}

/**
 * Shifts vector back like object several times.
 *
 * @param { Vector } item Object with Vector
 * @param { number | Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const divideByX = <
  T extends Vector
>(item: T, delta: number | Vector): T => {
  const deltaVector = vector(delta)

  return {
    ...item,
    x: deltaVector.x ? item.x / deltaVector.x : item.x,
  }
}

/**
 * Shifts vector back like object several times.
 *
 * @param { Vector } item Object with Vector
 * @param { number | Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const divideByY = <
  T extends Vector
>(item: T, delta: number | Vector): T => {
  const deltaVector = vector(delta)

  return {
    ...item,
    y: deltaVector.y ? item.y / deltaVector.y : item.y,
  }
}

/**
 * Shifts vector back like object several times.
 *
 * @param { Vector } item Object with Vector
 * @param { number | Vector } delta Offset vector
 * @returns { Vector } Return new vector object based on moved object
 */
export const divideByXY = <
  T extends Vector
>(item: T, delta: number | Vector): T => {
  const deltaVector = vector(delta)

  return {
    ...item,
    x: deltaVector.x ? item.x / deltaVector.x : item.x,
    y: deltaVector.y ? item.y / deltaVector.y : item.y,
  }
}

// ---------------------- COMPARISON ----------------------

/**
 * Compare two objects and return true if two vectors are equal by x vector otherwise false.
 *
 * @param { Vector } a Object with Vector
 * @param { Vector } b Object with Vector
 * @returns { boolean } Return true if two vectors are equal by x vector otherwise false.
 */
export const eqByX = (a: Vector, b: Vector): boolean => eqBy(a, b, 'x')

/**
 * Compare two objects and return true if two vectors are equal by y vector otherwise false.
 *
 * @param { Vector } a Object with Vector
 * @param { Vector } b Object with Vector
 * @returns { boolean } Return true if two vectors are equal by y vector otherwise false.
 */
export const eqByY = (a: Vector, b: Vector): boolean => eqBy(a, b, 'y')

/**
 * Compare two objects and return true if two vectors are equal otherwise false.
 *
 * @param { Vector } a Object with Vector
 * @param { Vector } b Object with Vector
 * @returns { boolean } Return true if two vectors are equal otherwise false.
 */
export const eqByXY = (a: Vector, b: Vector): boolean => eqByX(a, b) && eqByY(a, b)

/**
 * Compare two objects and return true if vector a less then b by x vector otherwise false.
 *
 * @param { Vector } a Object with Vector
 * @param { Vector } b Object with Vector
 * @returns { boolean } Return true if vector a less then b by x vector otherwise false.
 */
export const ltByX = (a: Vector, b: Vector): boolean => ltBy(a, b, 'x')

/**
 * Compare two objects and return true if vector a less then b by y vector otherwise false.
 *
 * @param { Vector } a Object with Vector
 * @param { Vector } b Object with Vector
 * @returns { boolean } Return true if vector a less then b by y vector otherwise false.
 */
export const ltByY = (a: Vector, b: Vector): boolean => ltBy(a, b, 'y')

/**
 * Compare two objects and return true if vector a less then b otherwise false.
 *
 * @param { Vector } a Object with Vector
 * @param { Vector } b Object with Vector
 * @returns { boolean } Return true if vector a less then b otherwise false.
 */
export const ltByXY = (a: Vector, b: Vector): boolean => ltByX(a, b) && ltByY(a, b)

/**
 * Compare two objects and return true if vector a great then b by x vector otherwise false.
 *
 * @param { Vector } a Object with Vector
 * @param { Vector } b Object with Vector
 * @returns { boolean } Return true if vector a great then b by x vector otherwise false.
 */
export const gtByX = (a: Vector, b: Vector): boolean => gtBy(a, b, 'x')

/**
 * Compare two objects and return true if vector a great then b by y vector otherwise false.
 *
 * @param { Vector } a Object with Vector
 * @param { Vector } b Object with Vector
 * @returns { boolean } Return true if vector a great then b by y vector otherwise false.
 */
export const gtByY = (a: Vector, b: Vector): boolean => gtBy(a, b, 'y')

/**
 * Compare two objects and return true if vector a great then b otherwise false.
 *
 * @param { Vector } a Object with Vector
 * @param { Vector } b Object with Vector
 * @returns { boolean } Return true if vector a great then b otherwise false.
 */
export const gtByXY = (a: Vector, b: Vector): boolean => gtByX(a, b) && gtByY(a, b)

/**
 * Compare two objects and return true if vector a less then b or equal by x vector otherwise false.
 *
 * @param { Vector } a Object with Vector
 * @param { Vector } b Object with Vector
 * @returns { boolean } Return true if vector a less then b or equal by x vector otherwise false.
 */
export const leByX = (a: Vector, b: Vector): boolean => leBy(a, b, 'x')

/**
 * Compare two objects and return true if vector a less then b or equal by y vector otherwise false.
 *
 * @param { Vector } a Object with Vector
 * @param { Vector } b Object with Vector
 * @returns { boolean } Return true if vector a less then b or equal by y vector otherwise false.
 */
export const leByY = (a: Vector, b: Vector): boolean => leBy(a, b, 'y')

/**
 * Compare two objects and return true if vector a less then b or equal otherwise false.
 *
 * @param { Vector } a Object with Vector
 * @param { Vector } b Object with Vector
 * @returns { boolean } Return true if vector a less then b or equal otherwise false.
 */
export const leByXY = (a: Vector, b: Vector): boolean => ltByXY(a, b) || eqByXY(a, b)

/**
 * Compare two objects and return true if vector a great then b or equal by x vector otherwise false.
 *
 * @param { Vector } a Object with Vector
 * @param { Vector } b Object with Vector
 * @returns { boolean } Return true if vector a great then b or equal by x vector otherwise false.
 */
export const geByX = (a: Vector, b: Vector): boolean => geBy(a, b, 'x')

/**
  * Compare two objects and return true if vector a great then b or equal by y vector otherwise false.
  *
  * @param { Vector } a Object with Vector
  * @param { Vector } b Object with Vector
  * @returns { boolean } Return true if vector a great then b or equal by y vector otherwise false.
  */
export const geByY = (a: Vector, b: Vector): boolean => geBy(a, b, 'y')

/**
  * Compare two objects and return true if vector a great then b or equal otherwise false.
  *
  * @param { Vector } a Object with Vector
  * @param { Vector } b Object with Vector
  * @returns { boolean } Return true if vector a great then b or equal otherwise false.
  */
export const geByXY = (a: Vector, b: Vector): boolean => gtByXY(a, b) || eqByXY(a, b)


// ---------------------- SELECTION ----------------------

/**
 * Return Vector with x coordinate.
 *
 * @param { Vector } item Vector item
 * @returns { Vector } Return Vector with x coordinate
 */
export const onlyX = (item: Vector): Vector | null => vector(item.x, 0)

/**
 * Return Vector with y coordinate.
 *
 * @param { Vector } item Vector item
 * @returns { Vector } Return Vector with y coordinate
 */
export const onlyY = (item: Vector): Vector | null => vector(0, item.y)

/**
 * Return maximal Vector by x.
 *
 * @param { Vector[] } items Vector items
 * @returns { Vector } Return maximal Vector by x
 */
export const maxByX = (items: Vector[]): Vector | null => compareAndSelectBy(items, gtByX)

/**
 * Return maximal Vector by y.
 *
 * @param { Vector[] } items Vector items
 * @returns { Vector } Return maximal Vector by y
 */
export const maxByY = (items: Vector[]): Vector | null => compareAndSelectBy(items, gtByY)

/**
 * Return maximal Vector.
 *
 * @param { Vector[] } items Vector items
 * @returns { Vector } Return maximal Vector
 */
export const maxByXY = (items: Vector[]): Vector | null => {
  if (!items.length) {
    return null
  }

  return {
    x: (maxByX(items) as Vector).x,
    y: (maxByY(items) as Vector).y,
  }
}

/**
 * Return minimal Vector by x.
 *
 * @param { Vector[] } items Vector items
 * @returns { Vector } Return minimal Vector by x
 */
export const minByX = (items: Vector[]): Vector | null => compareAndSelectBy(items, ltByX)

/**
* Return minimal Vector by y.
*
* @param { Vector[] } items Vector items
* @returns { Vector } Return minimal Vector by y
*/
export const minByY = (items: Vector[]): Vector | null => compareAndSelectBy(items, ltByY)

/**
 * Return minimal Vector.
 *
 * @param { Vector[] } items Vector items
 * @returns { Vector } Return minimal Vector
 */
export const minByXY = (items: Vector[]): Vector | null => {
  if (!items.length) {
    return null
  }

  return {
    x: (minByX(items) as Vector).x,
    y: (minByY(items) as Vector).y,
  }
}

/**
 * Return Vector in the middle of all points.
 *
 * @param { Vector[] } items Vector items
 * @returns { Vector } Return Vector in the middle of all points.
 */
export const avgByXY = (items: Vector[]): Vector | null => {
  if (!items.length) {
    return null
  }

  const maxVector = maxByXY(items) as Vector
  const minVector = minByXY(items) as Vector

  return {
    x: minVector.x + (maxVector.x - minVector.x) / 2,
    y: minVector.y + (maxVector.y - minVector.y) / 2,
  }
}

/**
 * Return Vectors which have the same x.
 *
 * @param { Vector[] } items Vector items
 * @param { Vector } item Vector item
 * @returns { Vector } Return Vectors which have the same x.
 */
export const sameByX = <
  T extends Vector
>(items: T[] = [], item: Vector): T[] => items.filter((i) => eqByX(item, i))

/**
 * Return Vectors which have the same y.
 *
 * @param { Vector[] } items Vector items
 * @param { Vector } item Vector item
 * @returns { Vector } Return Vectors which have the same y.
 */
export const sameByY = <
  T extends Vector
>(items: T[] = [], item: Vector): T[] => items.filter((i) => eqByY(item, i))

/**
 * Return same Vectors.
 *
 * @param { Vector[] } items Vector items
 * @param { Vector } item Vector item
 * @returns { Vector } Return same Vectors.
 */
export const sameByXY = <
  T extends Vector
>(items: T[] = [], item: Vector): T[] => items.filter((i) => eqByXY(item, i))
