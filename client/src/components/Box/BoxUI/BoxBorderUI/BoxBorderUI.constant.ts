// ---| self |---
import css from './BoxBorderUI.module.scss'

export const BoxBorder = {
  size: css.borderSize,
  color: css.borderColor,
}

export const BoxShadowAlpha = {
  first: css.firstShadowAlpha,
  second: css.secondShadowAlpha,
  third: css.thirdShadowAlpha,
}

export const BoxShadow = {
  xs: css.xsShadow,
  sm: css.smShadow,
  md: css.mdShadow,
  lg: css.lgShadow,
  xl: css.xlShadow,
}

export const BoxShadowInset = {
  xs: css.xsShadowInset,
  sm: css.smShadowInset,
  md: css.mdShadowInset,
  lg: css.lgShadowInset,
  xl: css.xlShadowInset,
}

export const BoxBorderMap = {
  dotted: 'bb-b-d',
  dashed: 'bb-b-ds',
  solid: 'bb-b-s',
}

export type BoxBorderTypes = keyof typeof BoxBorderMap

export const BoxBorderSideMap = {
  y: 'bb-b-y',
  x: 'bb-b-x',
  top: 'bb-b-t',
  bottom: 'bb-b-b',
  left: 'bb-b-l',
  right: 'bb-b-r',
}

export type BoxBorderSideTypes = keyof typeof BoxBorderSideMap

export const BoxBorderShadowMap = {
  xs: 'bb-sh-xs',
  sm: 'bb-sh-sm',
  md: 'bb-sh-md',
  lg: 'bb-sh-lg',
  xl: 'bb-sh-xl',
}

export type BoxBorderShadowTypes = keyof typeof BoxBorderShadowMap

export const BoxBorderInsetShadowMap = {
  xs: 'bb-shi-xs',
  sm: 'bb-shi-sm',
  md: 'bb-shi-md',
  lg: 'bb-shi-lg',
  xl: 'bb-shi-xl',
}

export type BoxBorderInsetShadowTypes = keyof typeof BoxBorderInsetShadowMap
