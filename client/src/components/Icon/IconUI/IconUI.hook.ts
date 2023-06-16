// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import {
  IconRotateTypes,
  IconSizeTypes,
  IconStatusTypes,
  IconSizeMap,
  IconStatusMap,
} from './IconUI.constant'

export type IconUIConf = {
  loading?: boolean
  rotate?: IconRotateTypes
  size?: IconSizeTypes
  status?: IconStatusTypes
}

export type IconUIProps = GeneralUIProps & IconUIConf

export default function useIconUIProps<T extends IconUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<IconUIConf, T> {
  const { rotate = 0, loading, status, size, ui, className, style, ...otherProps } = { ...init, ...props }
  const _style = _.omitBy({ transform: `rotate(${rotate}deg)`, ...style })
  const _ui = { ...ui, loading, rotate, size, status }
  const _className = cn(
    'icon',
    _.get(IconSizeMap, size as string),
    _.get(IconStatusMap, status as string),
    loading && 'i-l',
    className,
  )

  return { ui: _ui, className: _className, style: _style, ...otherProps } as ReturnUIProps<IconUIConf, T>
}
