// ---| self |---
import css from './TextStyleUI.module.scss'

export const TextStyle = {
  shadow: css.textShadow,
  engraved: css.textEngraved,
}

export const TextStyleStatusMap = {
  secondary: 'ts-secondary',
  success: 'ts-success',
  warning: 'ts-warning',
  danger: 'ts-danger',
  info: 'ts-info',
  disable: 'ts-disable',
}

export type TextStyleStatusTypes = keyof typeof TextStyleStatusMap

export const TextStyleBorderMap = {
  shadow: 'ts-b-sh',
  engraved: 'ts-b-gr',
  contour: 'ts-b-cr',
}

export type TextStyleBorderTypes = keyof typeof TextStyleBorderMap
