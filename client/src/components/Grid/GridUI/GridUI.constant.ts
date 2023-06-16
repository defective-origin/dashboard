// ---| self |---
import css from './GridUI.module.scss'

export const GridGapSizeMap = {
  xs: css.xsGap,
  sm: css.smGap,
  md: css.mdGap,
  lg: css.lgGap,
  xl: css.xlGap,
}

export type GridGapSizeTypes = keyof typeof GridGapSizeMap

export const GridAlignItemsMap = {
  start: 'g-ai-s',
  center: 'g-ai-c',
  end: 'g-ai-e',
  stretch: 'g-ai-st',
  baseline: 'g-ai-b',
}

export type GridAlignItemsTypes = keyof typeof GridAlignItemsMap

export const GridJustifyItemsMap = {
  start: 'g-ji-s',
  center: 'g-ji-c',
  end: 'g-ji-e',
  stretch: 'g-ji-st',
}

export type GridJustifyItemsTypes = keyof typeof GridJustifyItemsMap

export const GridAlignContentMap = {
  start: 'g-ac-s',
  center: 'g-ac-c',
  end: 'g-ac-e',
  'space-between': 'g-ac-sb',
  'space-around': 'g-ac-sa',
  'space-evenly': 'g-ac-se',
  stretch: 'g-ac-st',
}

export type GridAlignContentTypes = keyof typeof GridAlignContentMap

export const GridJustifyContentMap = {
  start: 'g-jc-s',
  center: 'g-jc-c',
  end: 'g-jc-e',
  'space-between': 'g-jc-sb',
  'space-around': 'g-jc-sa',
  'space-evenly': 'g-jc-se',
  stretch: 'g-jc-st',
}

export type GridJustifyContentTypes = keyof typeof GridJustifyContentMap
