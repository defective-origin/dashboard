// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import {
  BoxStyleStatusTypes,
  BoxStyleShapeTypes,
  BoxStyleStatusMap,
  BoxStyleShapeMap,
} from './BoxStyleUI.constant'

export type BoxStyleUIConf = {
  status?: BoxStyleStatusTypes
  shape?: BoxStyleShapeTypes
}

export type BoxStyleUIProps = GeneralUIProps & BoxStyleUIConf

export default function useBoxStyleUIProps<T extends BoxStyleUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<BoxStyleUIConf, T> {
  const { status, shape, ui, className, ...otherProps } = { ...init, ...props }
  const _ui = { ...ui, status, shape }
  const _className = cn(
    _.get(BoxStyleStatusMap, status as string),
    _.get(BoxStyleShapeMap, shape as string),
    className,
  )

  return { ui: _ui, className: _className, ...otherProps } as ReturnUIProps<BoxStyleUIConf, T>
}
