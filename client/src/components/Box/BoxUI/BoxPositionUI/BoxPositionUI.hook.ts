// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import {
  BoxPositionTypes,
  BoxPositionShiftSizeTypes,
  BoxPositionPlacementTypes,
  BoxPositionMap,
  BoxPositionPlacementMap,
  BoxPositionShiftSizeMap,
} from './BoxPositionUI.constant'

export type BoxPositionUIConf = {
  position?: BoxPositionTypes
  placement?: BoxPositionPlacementTypes
  top?: BoxPositionShiftSizeTypes
  bottom?: BoxPositionShiftSizeTypes
  left?: BoxPositionShiftSizeTypes
  right?: BoxPositionShiftSizeTypes
  zIndex?: number
}

export type BoxPositionUIProps = GeneralUIProps & BoxPositionUIConf

export default function useBoxPositionUIProps<T extends BoxPositionUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<BoxPositionUIConf, T> {
  const { position, top, bottom, left, right, placement, zIndex, ui, style, className, ...otherProps } = { ...init, ...props }
  const _ui = { ...ui, position, top, bottom, left, right, placement, zIndex }
  const _className = cn(
    _.get(BoxPositionMap, position as string),
    _.get(BoxPositionPlacementMap, placement as string),
    className,
  )
  const _style = _.omitBy({
    top: _.get(BoxPositionShiftSizeMap, top as string),
    bottom: _.get(BoxPositionShiftSizeMap, bottom as string),
    left: _.get(BoxPositionShiftSizeMap, left as string),
    right: _.get(BoxPositionShiftSizeMap, right as string),
    zIndex,
    ...style,
  }, _.isNil)

  return { ui: _ui, className: _className, style: _style, ...otherProps } as ReturnUIProps<BoxPositionUIConf, T>
}
