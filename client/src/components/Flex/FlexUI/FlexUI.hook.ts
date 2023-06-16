import { useCallback } from 'react'

// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'
import { BoxUIConf, BoxUIProps, useBoxUIProps } from 'components/Box'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import {
  FlexWrapTypes,
  FlexAlignItemsTypes,
  FlexAlignContentTypes,
  FlexJustifyContentTypes,
  FlexDirectionTypes,
  FlexGapSizeTypes,
  FlexWrapMap,
  FlexAlignItemsMap,
  FlexAlignContentMap,
  FlexJustifyContentMap,
  FlexDirectionMap,
  FlexGapSizeMap
} from './FlexUI.constant'

export type FlexUIConf = BoxUIConf & {
  wrap?: FlexWrapTypes
  aitems?: FlexAlignItemsTypes
  acontent?: FlexAlignContentTypes
  jcontent?: FlexJustifyContentTypes
  direction?: FlexDirectionTypes
  gap?: FlexGapSizeTypes
  rgap?: FlexGapSizeTypes
  cgap?: FlexGapSizeTypes
}

export type FlexUIProps = GeneralUIProps & FlexUIConf & BoxUIProps

export default function useFlexUIProps<T extends FlexUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<FlexUIConf, T> {
  const { ui, wrap, gap, rgap, cgap, aitems, acontent, jcontent, direction = 'y', style, className, ...otherProps } = useBoxUIProps({ ...init, ...props })
  const _ui = { ...ui, wrap, gap, rgap, cgap, aitems, acontent, jcontent, direction }
  const _className = cn(
    'flex',
    _.get(FlexWrapMap, wrap as string),
    _.get(FlexAlignItemsMap, aitems as string),
    _.get(FlexAlignContentMap, acontent as string),
    _.get(FlexJustifyContentMap, jcontent as string),
    _.get(FlexDirectionMap, direction as string),
    className,
  )

  const getGap = useCallback((g?: FlexGapSizeTypes) => g && FlexGapSizeMap[g], [])
  const _gap = getGap(gap)
  const _rgap = getGap(rgap)
  const _cgap = getGap(cgap)
  const _style = _.omitBy({
    gap: _gap,
    rowGap: _rgap,
    columnGap: _cgap,
    ...style,
  }, _.isNil)

  return { ui: _ui, className: _className, style: _style, ...otherProps } as ReturnUIProps<FlexUIConf, T>
}
