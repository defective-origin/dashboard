/* eslint-disable @typescript-eslint/no-explicit-any */
export type Selector<T> = keyof T | ((obj: T) => any)

/**
 * select value  from  object.
 *
 * @param { object } obj Object
 * @param { string | function } selector Key from object
 * @returns { boolean } Return value selected from object.
 */
export const select = <T>(obj: T, selector: Selector<T>): any => {
  if (typeof selector === 'function') {
    return selector(obj)
  }

  return obj[selector]
}

// ---------------------- COMPARISON ----------------------

/**
 * Compare two objects and return true if two objects are equal by one parameter otherwise false.
 *
 * @param { object } a Object
 * @param { object } b Object
 * @param { string } selector Key from object
 * @returns { boolean } Return true if two objects are equal by one parameter otherwise false.
 */
export const eqBy = <T>(a: T, b: T, selector: Selector<T>): boolean => select(a, selector) === select(b, selector)

/**
 * Compare two objects and return true if object a less then object b otherwise false.
 *
 * @param { object } a Object
 * @param { object } b Object
 * @param { string } selector Key from object
 * @returns { boolean } Return true if object a less then object b otherwise false.
 */
export const ltBy = <T>(a: T, b: T, selector: Selector<T>): boolean => select(a, selector) < select(b, selector)

/**
 * Compare two objects and return true if object a great then object b otherwise false.
 *
 * @param { object } a Object
 * @param { object } b Object
 * @param { string } selector Key from object
 * @returns { boolean } Return true if object a great then object b otherwise false.
 */
export const gtBy = <T>(a: T, b: T, selector: Selector<T>): boolean => select(a, selector) > select(b, selector)

/**
  * Compare two objects and return true if object a less then b or equal otherwise false.
  *
  * @param { object } a Object
  * @param { object } b Object
  * @param { string } selector Key from object
  * @returns { boolean } Return true if object a less then b or equal otherwise false.
  */
export const leBy = <T>(a: T, b: T, selector: Selector<T>): boolean => ltBy(a, b, selector) || eqBy(a, b, selector)

/**
   * Compare two objects and return true if object a great then b or equal otherwise false.
   *
   * @param { object } a Object
   * @param { object } b Object
   * @param { string } selector Key from object
   * @returns { boolean } Return true if object a great then b or equal otherwise false.
   */
export const geBy = <T>(a: T, b: T, selector: Selector<T>): boolean => gtBy(a, b, selector) || eqBy(a, b, selector)

export const isNumber = (value: unknown): value is number => typeof value === 'number'

/**
 * Compare items and return item which is compared and return true.
 *
 * @param { Array<Vector> } items Items
 * @returns { Vector } Return selected item
 */
export const compareAndSelectBy = <T>(items: Array<T>, compare: (a: T, b: T) => boolean): T | null => {
  if (!items.length) {
    return null
  }

  let line: T = items[0]

  for (const item of items) {
    if (compare(item, line)) {
      line = item
    }
  }

  return line
}

// ---------------------- ANGLES ----------------------

/**
 * Convert degrees to radian.
 *
 * @param { number } deg Degree
 * @returns { number } Return converted value
 */
export const degToRadian = (deg: number): number => (deg * Math.PI) / 180

/**
 * Convert radian to degrees.
 *
 * @param { number } radian Radian
 * @returns { number } Return converted value
 */
export const radianToDeg = (radian: number): number => (radian / Math.PI) * 180

/**
 * Convert huge angle to small one.
 *
 * @example
 * simplifyAngle(-500) // 220
 *
 * @param { number } angle Angle
 * @returns { number } Return converted value
 */
export const simplifyAngle = (angle: number): number => ((angle % 360) + 360) % 360
