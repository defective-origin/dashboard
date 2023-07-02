// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import {
  TextStyleStatusTypes,
  TextStyleBorderTypes,
  TextStyleStatusMap,
  TextStyleBorderMap,
} from './TextStyleUI.constant'

export type TextStyleUIConf = {
  status?: TextStyleStatusTypes
  border?: TextStyleBorderTypes

  // text-decoration-line - all elements
  // text-decoration-color - all elements
  // text-decoration-style - all elements
  // text-decoration-thickness - all elements
  // text-decoration - all elements
}

export type TextStyleUIProps = GeneralUIProps & TextStyleUIConf

export default function useTextStyleUIProps<T extends TextStyleUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<TextStyleUIConf, T> {
  const { ui, status, border, className, ...otherProps } = { ...init, ...props }
  const _ui = { ...ui, status, border }
  const _className = cn(
    _.get(TextStyleStatusMap, status as string),
    _.get(TextStyleBorderMap, border as string),
    className,
  )

  return { ui: _ui, className: _className, ...otherProps } as ReturnUIProps<TextStyleUIConf, T>
}
