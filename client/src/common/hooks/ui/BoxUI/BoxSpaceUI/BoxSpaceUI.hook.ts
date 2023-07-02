// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import {
  BoxSpacePaddingSizeTypes,
  BoxSpacePaddingSideTypes,
  BoxSpaceMarginSizeTypes,
  BoxSpaceMarginSideTypes,
  BoxSpaceStretchTypes,
  BoxSpaceWidthTypes,
  BoxSpacePaddingSizeMap,
  BoxSpacePaddingSideMap,
  BoxSpaceMarginSizeMap,
  BoxSpaceMarginSideMap,
  BoxSpaceStretchMap,
  BoxSpaceWidthMap,
  BoxSpaceOverflowTypes,
  BoxSpaceOverflowMap,
  BoxSpaceOverflowXMap,
  BoxSpaceOverflowYMap,
} from './BoxSpaceUI.constant'

export type BoxSpaceUIConf = {
  padding?: BoxSpacePaddingSizeTypes
  padded?: BoxSpacePaddingSideTypes
  margin?: BoxSpaceMarginSizeTypes
  marged?: BoxSpaceMarginSideTypes
  stretch?: BoxSpaceStretchTypes
  width?: BoxSpaceWidthTypes
  overflow?: BoxSpaceOverflowTypes
  overflowX?: BoxSpaceOverflowTypes
  overflowY?: BoxSpaceOverflowTypes
}

export type BoxSpaceUIProps = GeneralUIProps & BoxSpaceUIConf

export default function useBoxSpaceUIProps<T extends BoxSpaceUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<BoxSpaceUIConf, T> {
  const { padding, padded, margin, marged, width, stretch, overflow, overflowX, overflowY, ui, className, ...otherProps } = { ...init, ...props }
  const _ui = { ...ui, padding, padded, margin, marged, width, stretch }
  const _className = cn(
    _.get(BoxSpacePaddingSizeMap, padding as string),
    _.get(BoxSpacePaddingSideMap, padded as string),
    _.get(BoxSpaceMarginSizeMap, margin as string),
    _.get(BoxSpaceMarginSideMap, marged as string),
    _.get(BoxSpaceStretchMap, stretch as string),
    _.get(BoxSpaceWidthMap, width as string),
    _.get(BoxSpaceOverflowMap, overflow as string),
    _.get(BoxSpaceOverflowXMap, overflowX as string),
    _.get(BoxSpaceOverflowYMap, overflowY as string),
    className,
  )

  return { ui: _ui, className: _className, ...otherProps } as ReturnUIProps<BoxSpaceUIConf, T>
}
