// ---| self |---
import css from './IconUI.module.scss'

export const IconSize = {
  xs: css.xsIconSize,
  sm: css.smIconSize,
  md: css.mdIconSize,
  lg: css.lgIconSize,
  xl: css.xlIconSize,
}

export const IconSizeMap = {
  xs: 'i-xs',
  sm: 'i-sm',
  md: 'i-md',
  lg: 'i-lg',
  xl: 'i-xl',
}

export type IconSizeTypes = keyof typeof IconSizeMap

export const IconStatusMap = {
  secondary: 'i-secondary',
  success: 'i-success',
  warning: 'i-warning',
  danger: 'i-danger',
  info: 'i-info',
  disable: 'i-disable',
}

export type IconStatusTypes = keyof typeof IconStatusMap

export type IconRotateTypes = 45 | 90 | 135 | 180 | 225 | 270 | 315 | 360 | number
