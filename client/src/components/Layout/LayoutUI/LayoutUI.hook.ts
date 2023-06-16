// ---| components |---
import { BoxUIProps, useBoxUIProps } from 'components/Box'
import { GeneralUIProps, ReturnUIProps } from 'components/Component'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import { LayoutTemplateMap, LayoutTemplateTypes } from './LayoutUI.constant'

export type LayoutUIConf = {
  template?: LayoutTemplateTypes
}

export type LayoutUIProps = GeneralUIProps & LayoutUIConf & BoxUIProps

export default function useLayoutUIProps<T extends LayoutUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<LayoutUIConf, T> {
  const { template = 'row', className, ui, ...otherProps } = useBoxUIProps({ ...init, ...props })
  const _ui = { ...ui, template }
  const _className = cn(
    'layout',
    _.get(LayoutTemplateMap, template as string),
    className,
  )

  return { ui: _ui, className: _className, ...otherProps } as ReturnUIProps<LayoutUIConf, T>
}
