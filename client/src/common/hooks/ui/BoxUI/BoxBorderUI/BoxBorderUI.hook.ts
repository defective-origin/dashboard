// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import {
  BoxBorderInsetShadowMap,
  BoxBorderMap,
  BoxBorderShadowMap,
  BoxBorderShadowTypes,
  BoxBorderSideMap,
  BoxBorderSideTypes,
  BoxBorderTypes,
} from './BoxBorderUI.constant'

export type BoxBorderUIConf = {
  border?: BoxBorderTypes
  bordered?: BoxBorderSideTypes
  shadow?: BoxBorderShadowTypes
  inset?: boolean
}

export type BoxBorderUIProps = GeneralUIProps & BoxBorderUIConf

export default function useBoxBorderUIProps<T extends BoxBorderUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<BoxBorderUIConf, T> {
  const { border, bordered, shadow, inset, ui, className, ...otherProps } = { ...init, ...props }
  const shadowMap = inset ? BoxBorderInsetShadowMap : BoxBorderShadowMap
  const _ui = { ...ui, border, bordered, shadow, inset }
  const _className = cn(
    _.get(BoxBorderMap, border as string),
    _.get(BoxBorderSideMap, bordered as string),
    _.get(shadowMap, shadow as string),
    className,
  )

  return { ui: _ui, className: _className, ...otherProps } as ReturnUIProps<BoxBorderUIConf, T>
}
