import { useCallback } from 'react'

// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'
import { BoxUIConf, BoxUIProps, useBoxUIProps } from 'components/Box'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import {
  GridGapSizeTypes,
  GridAlignItemsTypes,
  GridJustifyItemsTypes,
  GridJustifyContentTypes,
  GridAlignContentTypes,
  GridAlignItemsMap,
  GridJustifyItemsMap,
  GridAlignContentMap,
  GridJustifyContentMap,
  GridGapSizeMap,
} from './GridUI.constant'

export type GridUIConf = BoxUIConf & {
  gap?: GridGapSizeTypes
  rgap?: GridGapSizeTypes
  cgap?: GridGapSizeTypes

  items?: React.CSSProperties['placeItems']
  aitems?: GridAlignItemsTypes
  jitems?: GridJustifyItemsTypes

  template?: React.CSSProperties['gridTemplate']
  rtemplate?: React.CSSProperties['gridTemplateRows']
  ctemplate?: React.CSSProperties['gridTemplateColumns']
  areas?: React.CSSProperties['gridTemplateAreas']

  content?: React.CSSProperties['placeContent']
  jcontent?: GridJustifyContentTypes
  acontent?: GridAlignContentTypes
}

export type GridUIProps = GeneralUIProps & GridUIConf & BoxUIProps

export default function useGridUIProps<T extends GridUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<GridUIConf, T> {
  const {
    ui,
    gap,
    rgap,
    cgap,
    items,
    aitems,
    jitems,
    content,
    acontent,
    jcontent,
    template,
    rtemplate,
    ctemplate,
    areas,
    style,
    className,
    ...otherProps
  } = useBoxUIProps({ ...init, ...props })
  const _ui = { ...ui, gap, rgap, cgap, items, aitems, jitems, content, acontent, jcontent, template, rtemplate, ctemplate, areas }
  const _className = cn(
    'grid',
    _.get(GridAlignItemsMap, aitems as string),
    _.get(GridJustifyItemsMap, jitems as string),
    _.get(GridAlignContentMap, acontent as string),
    _.get(GridJustifyContentMap, jcontent as string),
    className,
  )

  const getGap = useCallback((g?: GridGapSizeTypes) => g && GridGapSizeMap[g], [])
  const _gap = getGap(gap)
  const _rgap = getGap(rgap)
  const _cgap = getGap(cgap)
  const _style = _.omitBy({
    gap: _gap,
    rowGap: _rgap,
    columnGap: _cgap,
    placeItems: items,
    placeContent: content,
    gridTemplate: template,
    gridTemplateRows: rtemplate,
    gridTemplateColumns: ctemplate,
    gridTemplateAreas: areas,
    ...style,
  }, _.isNil)

  return { ui: _ui, className: _className, style: _style, ...otherProps } as ReturnUIProps<GridUIConf, T>
}
