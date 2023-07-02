// ---| self |---
import css from './BoxPositionUI.module.scss'

export const BoxPositionShiftSizeMap = {
  xs: css.xsShift,
  sm: css.smShift,
  md: css.mdShift,
  lg: css.lgShift,
  xl: css.xlShift,
}

export type BoxPositionShiftSizeTypes = keyof typeof BoxPositionShiftSizeMap

export const BoxPositionMap = {
  static: 'bp-pos-s',
  relative: 'bp-pos-r',
  absolute: 'bp-pos-a',
  fixed: 'bp-pos-f',
  sticky: 'bp-pos-st',
}

export type BoxPositionTypes = keyof typeof BoxPositionMap

export const BoxPositionPlacementMap = {
  'start-start': 'bp-p-ss',
  'start-center': 'bp-p-sc',
  'start-end': 'bp-p-se',
  'center-start': 'bp-p-cs',
  'center-center': 'bp-p-cc',
  'center-end': 'bp-p-ce',
  'end-start': 'bp-p-es',
  'end-center': 'bp-p-ec',
  'end-end': 'bp-p-ee',
  left: 'bp-p-lt',
  right: 'bp-p-rt',
  top: 'bp-p-tp',
  bottom: 'bp-p-bm',
  stretch: 'bp-p-st',
}

export type BoxPositionPlacementTypes = keyof typeof BoxPositionPlacementMap
