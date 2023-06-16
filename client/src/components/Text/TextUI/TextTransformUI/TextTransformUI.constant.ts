// ---| self |---
import css from './TextTransformUI.module.scss'

export const TextFontSize = {
  xs: css.xsFontSize,
  sm: css.xsFontSize,
  md: css.xsFontSize,
  lg: css.xsFontSize,
  xl: css.xsFontSize,
}

export const TextTransformFontSizeMap = {
  xs: 'tt-fs-xs',
  sm: 'tt-fs-sm',
  md: 'tt-fs-md',
  lg: 'tt-fs-lg',
  xl: 'tt-fs-xl',
}

export type TextTransformFontSizeTypes = keyof typeof TextTransformFontSizeMap

export const TextTransformFontWeightMap = {
  1: 'tt-fw-1',
  2: 'tt-fw-2',
  3: 'tt-fw-3',
  4: 'tt-fw-4',
  5: 'tt-fw-5',
  6: 'tt-fw-6',
  7: 'tt-fw-7',
  8: 'tt-fw-8',
  9: 'tt-fw-9',
}

export type TextTransformFontWeightTypes = keyof typeof TextTransformFontWeightMap

export const TextTransformCaseMap = {
  lower: 'tt-c-l',
  upper: 'tt-c-u',
  capital: 'tt-c-c',
}

export type TextTransformCaseTypes = keyof typeof TextTransformCaseMap

export const TextTransformDirectionMap = {
  left: 'tt-d-l',
  right: 'tt-d-r',
}

export type TextTransformDirectionTypes = keyof typeof TextTransformDirectionMap
