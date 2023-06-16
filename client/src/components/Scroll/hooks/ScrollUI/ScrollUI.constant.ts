// ---| self |---
import css from './ScrollUI.module.scss'

export const ScrollSize = {
  xs: css.xsScrollSize,
  sm: css.smScrollSize,
  md: css.mdScrollSize,
  lg: css.lgScrollSize,
  xl: css.xlScrollSize,
}

export const ScrollStyle = {
  trackColor: css.scrollTrackColor,
  trackHoverColor: css.scrollTrackHoverColor,
  thumbColor: css.scrollThumbColor,
  thumbHoverColor: css.scrollThumbHoverColor,
}

export const ScrollSizeMap = {
  xs: 'sl-s-xs',
  sm: 'sl-s-sm',
  md: 'sl-s-md',
  lg: 'sl-s-lg',
  xl: 'sl-s-xl',
}

export type ScrollSizeTypes = keyof typeof ScrollSizeMap

export const ScrollDirectionMap = {
  x: 'sl-d-x',
  y: 'sl-d-y',
  xy: 'sl-d-xy',
}

export type ScrollDirectionTypes = keyof typeof ScrollDirectionMap
