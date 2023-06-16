// ---| components |---
import { BoxUIProps, useBoxUIProps } from 'components/Box'
import { GeneralUIProps, ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |--
import {
  LayoutItemTypes,
  LayoutItemTypeMap,
} from './LayoutItemUI.constant'

export type LayoutItemUIConf = {
  type?: LayoutItemTypes
}

export type LayoutItemUIProps = GeneralUIProps & LayoutItemUIConf & BoxUIProps

export default function useLayoutItemUIProps<T extends LayoutItemUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<LayoutItemUIConf, T> {
  const { type = 'content', className, ui, ...otherProps } = useBoxUIProps({ ...init, ...props })
  const _ui = { ...ui, type }
  const _className = cn(
    'layout-item',
    _.get(LayoutItemTypeMap, type as string),
    className,
  )

  return { ui: _ui, className: _className, ...otherProps } as ReturnUIProps<LayoutItemUIConf, T>
}
