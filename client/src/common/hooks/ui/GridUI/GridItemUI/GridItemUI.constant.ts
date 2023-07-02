// ---| self |---
import './GridItemUI.module.scss'

export const GridItemJustifyMap = {
  start: 'gi-j-s',
  center: 'gi-j-c',
  end: 'gi-j-e',
  stretch: 'gi-j-st',
}

export type GridItemJustifyTypes = keyof typeof GridItemJustifyMap

export const GridItemAlignMap = {
  start: 'gi-a-s',
  center: 'gi-a-c',
  end: 'gi-a-e',
  stretch: 'gi-a-st',
}

export type GridItemAlignTypes = keyof typeof GridItemAlignMap
