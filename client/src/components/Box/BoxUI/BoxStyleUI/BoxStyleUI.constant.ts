// ---| self |---
import css from './BoxStyleUI.module.scss'

export const BoxStyleShape = {
  round: css.shapeRound,
  square: css.shapeSquare,
  circle: css.shapeCircle,
}

export const BoxStyleStatusMap = {
  secondary: 'bs-secondary',
  success: 'bs-success',
  warning: 'bs-warning',
  danger: 'bs-danger',
  info: 'bs-info',
  disable: 'bs-disable',
}

export type BoxStyleStatusTypes = keyof typeof BoxStyleStatusMap

export const BoxStyleShapeMap = {
  round: 'bs-sp-r',
  square: 'bs-sp-s',
  circle: 'bs-sp-c',
}

export type BoxStyleShapeTypes = keyof typeof BoxStyleShapeMap
