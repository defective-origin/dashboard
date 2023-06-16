// ---| self |---
import css from './TextAlignmentUI.module.scss'

export const TextIndent = {
  xs: css.xsIndent,
  sm: css.smIndent,
  md: css.mdIndent,
  lg: css.lgIndent,
  xl: css.xlIndent,
}

export const TextAlignmentIndentMap = {
  xs: 'ta-ti-xs',
  sm: 'ta-ti-sm',
  md: 'ta-ti-md',
  lg: 'ta-ti-lg',
  xl: 'ta-ti-xl',
}

export type TextAlignmentIndentTypes = keyof typeof TextAlignmentIndentMap

export const TextAlignmentAlignMap = {
  start: 'ta-a-s',
  end: 'ta-a-e',
  center: 'ta-a-c',
  justify: 'ta-a-j',
}

export type TextAlignmentAlignTypes = keyof typeof TextAlignmentAlignMap

export const TextAlignmentAlignLastMap = {
  start: 'ta-al-s',
  end: 'ta-al-e',
  center: 'ta-al-c',
  justify: 'ta-al-j',
}

export type TextAlignmentAlignLastTypes = keyof typeof TextAlignmentAlignLastMap

export const TextAlignmentJustifyMap = {
  word: 'ta-j-iw',
  character: 'ta-j-ic',
}

export type TextAlignmentJustifyTypes = keyof typeof TextAlignmentJustifyMap

export const TextAlignmentVerticalMap = {
  top: 'ta-v-t',
  middle: 'ta-v-m',
  bottom: 'ta-v-b',
  sub: 'ta-v-sb',
  sup: 'ta-v-sp',
}

export type TextAlignmentVerticalTypes = keyof typeof TextAlignmentVerticalMap
