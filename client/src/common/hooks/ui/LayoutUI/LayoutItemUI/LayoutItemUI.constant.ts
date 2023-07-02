// ---| self |---
import './LayoutItemUI.module.scss'

export const LayoutItemTypeMap = {
  'left-aside': 'li-t-la',
  'right-aside': 'li-t-ra',
  footer: 'li-t-f',
  header: 'li-t-h',
  content: 'li-t-c',
}

export type LayoutItemTypes = keyof typeof LayoutItemTypeMap
