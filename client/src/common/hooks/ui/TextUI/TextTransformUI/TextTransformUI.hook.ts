// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import {
  TextTransformFontSizeTypes,
  TextTransformFontWeightTypes,
  TextTransformCaseTypes,
  TextTransformDirectionTypes,
  TextTransformFontSizeMap,
  TextTransformFontWeightMap,
  TextTransformCaseMap,
  TextTransformDirectionMap,
} from './TextTransformUI.constant'

export type TextTransformUIConf = {
  size?: TextTransformFontSizeTypes
  weight?: TextTransformFontWeightTypes
  case?: TextTransformCaseTypes
  direction?: TextTransformDirectionTypes
}

export type TextTransformUIProps = GeneralUIProps & TextTransformUIConf

export default function useTextTransformUIProps<T extends TextTransformUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<TextTransformUIConf, T> {
  const { ui, size = 'sm', weight, case: textCase, direction, className, ...otherProps } = { ...init, ...props }
  const _ui = { ...ui, size, weight, case: textCase, direction }
  const _className = cn(
    _.get(TextTransformFontSizeMap, size as string),
    _.get(TextTransformFontWeightMap, weight as number),
    _.get(TextTransformCaseMap, textCase as string),
    _.get(TextTransformDirectionMap, direction as string),
    className,
  )

  return { ui: _ui, className: _className, ...otherProps } as ReturnUIProps<TextTransformUIConf, T>
}
