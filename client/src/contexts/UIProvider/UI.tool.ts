// ---| self |---
import { Base } from './UI.constant'

/// Calculate size.
///
/// @param {integer (unitless)} $exponent The number of `$base`s to multiply together.
/// @param {integer (unitless)} $base The number of pixels.
/// @return {number} Calculated size.
export function size(exponent: number, base = Number(Base.size)): number {
  return base * exponent
}

/// Calculate size without including border sizes.
///
/// @param {integer (unitless)} $exponent The number of `$base`s to multiply together.
/// @param {integer (unitless)} $border The number of border pixels.
/// @param {integer (unitless)} $base The number of pixels.
/// @return {number} Calculated size without border.
export function borderedSize(exponent: number, border = Number(Base.borderSize), base = Number(Base.size)): number {
  return size(exponent, base) - (border * 2)
}
