// ---| components |---
import { ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './BoxUI.module.scss'
import useBoxSpaceUIProps, { BoxSpaceUIConf, BoxSpaceUIProps } from './BoxSpaceUI'
import useBoxBorderUIProps, { BoxBorderUIConf, BoxBorderUIProps } from './BoxBorderUI'
import useBoxPositionUIProps, { BoxPositionUIConf, BoxPositionUIProps } from './BoxPositionUI'
import useBoxStyleUIProps, { BoxStyleUIConf, BoxStyleUIProps } from './BoxStyleUI'

export type BoxUIProps = BoxSpaceUIProps & BoxBorderUIProps & BoxPositionUIProps & BoxStyleUIProps
export type BoxUIConf = BoxSpaceUIConf & BoxBorderUIConf & BoxPositionUIConf & BoxStyleUIConf

export default function useBoxUIProps<T extends BoxUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<BoxUIConf, T> {
  const _props = { ...init, ...props }
  const propsWithSpace = useBoxSpaceUIProps(_props)
  const propsWithBorder = useBoxBorderUIProps(propsWithSpace)
  const propsWithPosition = useBoxPositionUIProps(propsWithBorder)
  const propsWithStyle = useBoxStyleUIProps(propsWithPosition)
  const _className = cn('box', propsWithStyle.className)

  return { ...propsWithStyle, className: _className } as ReturnUIProps<BoxUIConf, T>
}
