// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import {
  ScrollSizeTypes,
  ScrollDirectionTypes,
  ScrollSizeMap,
  ScrollDirectionMap,
} from './ScrollUI.constant'

export type ScrollUIConf = {
  size?: ScrollSizeTypes
  direction?: ScrollDirectionTypes
}

export type ScrollUIProps = GeneralUIProps & ScrollUIConf

export default function useScrollUIProps<T extends ScrollUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<ScrollUIConf, T> {
  const { size = 'sm', direction, className, ui, ...otherProps } = { ...init, ...props }
  const _ui = { ...ui, size, direction }
  const _className = cn(
    'scroll',
    _.get(ScrollSizeMap, size as string),
    _.get(ScrollDirectionMap, direction as string),
    className,
  )

  return { ui: _ui, className: _className, ...otherProps } as ReturnUIProps<ScrollUIConf, T>
}
