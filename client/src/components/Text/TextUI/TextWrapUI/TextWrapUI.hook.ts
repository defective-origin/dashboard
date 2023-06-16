// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import './TextWrapUI.module.scss'
import {
  TextWrapWhiteSpaceTypes,
  TextWrapWrapTypes,
  TextWrapBreakTypes,
  TextWrapHyphenTypes,
  TextWrapWhiteSpaceMap,
  TextWrapWrapMap,
  TextWrapBreakMap,
  TextWrapHyphenMap,
} from './TextWrapUI.constant'

export type TextWrapUIConf = {
  space?: TextWrapWhiteSpaceTypes
  wrap?: TextWrapWrapTypes
  break?: TextWrapBreakTypes
  hyphen?: TextWrapHyphenTypes
  ellipses?: boolean
}

export type TextWrapUIProps = GeneralUIProps & TextWrapUIConf

export default function useTextWrapUIProps<T extends TextWrapUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<TextWrapUIConf, T> {
  const { ui, space, wrap, break: breakWord, hyphen, ellipses, className, ...otherProps } = { ...init, ...props }
  const _ui = { ...ui, space, wrap, break: breakWord, hyphen, ellipses }
  const _className = cn(
    _.get(TextWrapWhiteSpaceMap, space as string),
    _.get(TextWrapWrapMap, wrap as string),
    _.get(TextWrapBreakMap, breakWord as string),
    _.get(TextWrapHyphenMap, hyphen as string),
    ellipses && 'tw-e',
    className,
  )

  return { ui: _ui, className: _className, ...otherProps } as ReturnUIProps<TextWrapUIConf, T>
}
