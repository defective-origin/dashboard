// ---| self |---
import css from './FlexUI.module.scss'

export const FlexGapSizeMap = {
  xs: css.xsGap,
  sm: css.smGap,
  md: css.mdGap,
  lg: css.lgGap,
  xl: css.xlGap,
}

export type FlexGapSizeTypes = keyof typeof FlexGapSizeMap

export const FlexWrapMap = {
  wrap: 'f-fw-w',
  nowrap: 'f-fw-nw',
}

export type FlexWrapTypes = keyof typeof FlexWrapMap

export const FlexAlignItemsMap = {
  start: 'f-ai-s',
  center: 'f-ai-c',
  end: 'f-ai-e',
  stretch: 'f-ai-st',
  baseline: 'f-ai-b',
}

export type FlexAlignItemsTypes = keyof typeof FlexAlignItemsMap

export const FlexJustifyContentMap = {
  start: 'f-j-s',
  center: 'f-j-c',
  end: 'f-j-e',
  stretch: 'f-j-st',
  'space-between': 'f-j-sb',
  'space-around': 'f-j-sa',
  'space-evenly': 'f-j-se',
}

export type FlexJustifyContentTypes = keyof typeof FlexJustifyContentMap

export const FlexAlignContentMap = {
  start: 'f-a-s',
  center: 'f-a-c',
  end: 'f-a-e',
  stretch: 'f-a-st',
  'space-between': 'f-a-sb',
  'space-around': 'f-a-sa',
  'space-evenly': 'f-a-se',
}

export type FlexAlignContentTypes = keyof typeof FlexAlignContentMap

export const FlexDirectionMap = {
  y: 'f-d-y',
  x: 'f-d-x',
}

export type FlexDirectionTypes = keyof typeof FlexDirectionMap
