// ---| self |---
import './LayoutUI.module.scss'

export const LayoutTemplateMap = {
  row: 'l-t-r',
  column: 'l-t-c',
  'left-aside': 'l-t-la',
  'right-aside': 'l-t-ra',
}

export type LayoutTemplateTypes = keyof typeof LayoutTemplateMap
