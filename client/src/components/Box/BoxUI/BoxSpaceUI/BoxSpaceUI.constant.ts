// ---| self |---
import css from './BoxSpaceUI.module.scss'

export const BoxWidth = {
  xxs: css.xxsWidth,
  xs: css.xsWidth,
  sm: css.smWidth,
  md: css.mdWidth,
  lg: css.lgWidth,
  xl: css.xlWidth,
  xxl: css.xxlWidth,
}

export const BoxSpace = {
  xs: css.xsSpace,
  sm: css.smSpace,
  md: css.mdSpace,
  lg: css.lgSpace,
  xl: css.xlSpace,
}

export const BoxSpaceWidthMap = {
  xs: 'bs-w-xs',
  sm: 'bs-w-sm',
  md: 'bs-w-md',
  lg: 'bs-w-lg',
  xl: 'bs-w-xl',
}

export type BoxSpaceWidthTypes = keyof typeof BoxSpaceWidthMap

export const BoxSpacePaddingSizeMap = {
  xs: 'bs-p-xs',
  sm: 'bs-p-sm',
  md: 'bs-p-md',
  lg: 'bs-p-lg',
  xl: 'bs-p-xl',
}

export type BoxSpacePaddingSizeTypes = keyof typeof BoxSpacePaddingSizeMap

export const BoxSpacePaddingSideMap = {
  y: 'bs-p-y',
  x: 'bs-p-x',
  top: 'bs-p-t',
  bottom: 'bs-p-b',
  left: 'bs-p-l',
  right: 'bs-p-r',
}

export type BoxSpacePaddingSideTypes = keyof typeof BoxSpacePaddingSideMap

export const BoxSpaceMarginSizeMap = {
  xs: 'bs-m-xs',
  sm: 'bs-m-sm',
  md: 'bs-m-md',
  lg: 'bs-m-lg',
  xl: 'bs-m-xl',
}

export type BoxSpaceMarginSizeTypes = keyof typeof BoxSpaceMarginSizeMap

export const BoxSpaceMarginSideMap = {
  y: 'bs-m-y',
  x: 'bs-m-x',
  top: 'bs-m-t',
  bottom: 'bs-m-b',
  left: 'bs-m-l',
  right: 'bs-m-r',
}

export type BoxSpaceMarginSideTypes = keyof typeof BoxSpaceMarginSideMap

export const BoxSpaceStretchMap = {
  y: 'bs-s-y',
  x: 'bs-s-x',
  xy: 'bs-s-xy',
}

export type BoxSpaceStretchTypes = keyof typeof BoxSpaceStretchMap

export const BoxSpaceOverflowMap = {
  auto: 'bs-o-a',
  hidden: 'bs-o-h',
  scroll: 'bs-o-s',
  visible: 'bs-o-v',
}

export const BoxSpaceOverflowXMap = {
  auto: 'bs-ox-a',
  hidden: 'bs-ox-h',
  scroll: 'bs-ox-s',
  visible: 'bs-ox-v',
}

export const BoxSpaceOverflowYMap = {
  auto: 'bs-oy-a',
  hidden: 'bs-oy-h',
  scroll: 'bs-oy-s',
  visible: 'bs-oy-v',
}

export type BoxSpaceOverflowTypes = keyof typeof BoxSpaceOverflowMap
