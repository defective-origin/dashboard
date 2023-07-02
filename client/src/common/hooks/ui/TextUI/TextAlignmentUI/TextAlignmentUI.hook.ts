// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import {
  TextAlignmentAlignTypes,
  TextAlignmentAlignLastTypes,
  TextAlignmentJustifyTypes,
  TextAlignmentVerticalTypes,
  TextAlignmentIndentTypes,
  TextAlignmentAlignMap,
  TextAlignmentAlignLastMap,
  TextAlignmentJustifyMap,
  TextAlignmentVerticalMap,
  TextAlignmentIndentMap,
} from './TextAlignmentUI.constant'

export type TextAlignmentUIConf = {
  align?: TextAlignmentAlignTypes
  lalign?: TextAlignmentAlignLastTypes
  justify?: TextAlignmentJustifyTypes
  vertical?: TextAlignmentVerticalTypes
  indent?: TextAlignmentIndentTypes
}

export type TextAlignmentUIProps = GeneralUIProps & TextAlignmentUIConf

export default function useTextAlignmentUIProps<T extends TextAlignmentUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<TextAlignmentUIConf, T> {
  const { ui, align, lalign, justify, vertical, indent, className, ...otherProps } = { ...init, ...props }
  const _ui = { ...ui, align, lalign, justify, vertical, indent }
  const _className = cn(
    _.get(TextAlignmentAlignMap, align as string),
    _.get(TextAlignmentAlignLastMap, lalign as string),
    _.get(TextAlignmentJustifyMap, justify as string),
    _.get(TextAlignmentVerticalMap, vertical as string),
    _.get(TextAlignmentIndentMap, indent as string),
    className,
  )

  return { ui: _ui, className: _className, ...otherProps } as ReturnUIProps<TextAlignmentUIConf, T>
}
