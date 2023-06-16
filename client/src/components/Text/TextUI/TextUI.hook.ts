// ---| components |---
import { ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './TextUI.module.scss'
import useTextWrapUIProps, { TextWrapUIConf, TextWrapUIProps } from './TextWrapUI'
import useTextStyleUIProps, { TextStyleUIConf, TextStyleUIProps } from './TextStyleUI'
import useTextAlignmentUIProps, { TextAlignmentUIConf, TextAlignmentUIProps } from './TextAlignmentUI'
import useTextTransformUIProps, { TextTransformUIConf, TextTransformUIProps } from './TextTransformUI'


export type TextUIProps = TextWrapUIProps & TextStyleUIProps & TextAlignmentUIProps & TextTransformUIProps
export type TextUIConf = TextWrapUIConf & TextStyleUIConf & TextAlignmentUIConf & TextTransformUIConf


export default function useTextUIProps<T extends TextUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<TextUIConf, T> {
  const _props = { ...init, ...props }
  const propsWithAlignment = useTextAlignmentUIProps(_props)
  const propsWithWrap = useTextWrapUIProps(propsWithAlignment)
  const propsWithTransform = useTextTransformUIProps(propsWithWrap)
  const propsWithStyle = useTextStyleUIProps(propsWithTransform)
  const _className = cn('text', propsWithStyle.className)

  return { ...propsWithStyle, className: _className } as ReturnUIProps<TextUIConf, T>
}
