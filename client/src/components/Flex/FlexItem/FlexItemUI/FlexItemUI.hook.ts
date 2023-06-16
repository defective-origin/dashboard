// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'
import { BoxUIConf, BoxUIProps, useBoxUIProps } from 'components/Box'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import {
  FlexItemAlignTypes,
  FlexItemJustifyTypes,
  FlexItemAlignMap,
  FlexItemJustifyMap
} from './FlexItemUI.constant'

export type FlexItemUIConf = BoxUIConf & {
  grow?: React.CSSProperties['flexGrow']
  order?: React.CSSProperties['order']
  basis?: React.CSSProperties['flexBasis']
  shrink?: React.CSSProperties['flexShrink']
  align?: FlexItemAlignTypes
  justify?: FlexItemJustifyTypes
}

export type FlexItemUIProps = GeneralUIProps & FlexItemUIConf & BoxUIProps

export default function useFlexItemUIProps<T extends FlexItemUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<FlexItemUIConf, T> {
  const { ui, grow, order, basis, shrink, align, justify, style, className, ...otherProps } = useBoxUIProps({ ...init, ...props })
  const _ui = { ...ui, grow, order, basis, shrink, align, justify }
  const _style = _.omitBy({ grow, order, basis, shrink, ...style }, _.isNil)
  const _className = cn(
    _.get(FlexItemAlignMap, align as string),
    _.get(FlexItemJustifyMap, justify as string),
    className,
  )

  return { ui: _ui, className: _className, style: _style, ...otherProps } as ReturnUIProps<FlexItemUIConf, T>
}
