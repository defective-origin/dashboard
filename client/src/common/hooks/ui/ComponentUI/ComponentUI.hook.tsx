// ---| common |---
import { _ } from 'common/tools'

// ---| self |---
import { clearProps } from './ComponentUI.tool'
import { GeneralUIProps } from './ComponentUI.model'

export type ComponentUIConf<T extends Record<string, unknown> = Record<string, unknown>> = {
  // Map with custom components
  map?: T
  // Tag of Map with custom components
  type?: keyof T
  // Render as custom base component
  as?: string | React.ComponentType
  // Should props be cleared from undefined values
  dirty?: boolean
  // Assign ref on  html element
  elem?: React.MutableRefObject<HTMLElement | null>
  // Should component be rendered
  open?: boolean
}

export type ComponentUIProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = GeneralUIProps & ComponentUIConf<T>

export default function useComponentUIProps<
  TProps extends ComponentUIProps<Record<string, unknown>> = ComponentUIProps<Record<string, unknown>>,
>(
  props: TProps,
  init?: Partial<TProps>
): JSX.Element | null {
  const combinedProps = { ...init, ...props }
  const refProps = typeof combinedProps.as === 'string' ? { ref: props.elem } : { elem:  props.elem }
  const { open = true, map, type, as = 'div', dirty, elem, ...otherProps } = { ...combinedProps, ...refProps }
  const _props = dirty ? otherProps : clearProps(otherProps)
  const Tag = (_.get(map, type as string) || as) as React.ComponentType<Record<string, unknown>> | undefined

  if (!Tag || !open) {
    return null
  }

  //  FIXME: ref does not work for common tags for example 'div' because we create it as component
  return <Tag {..._props} />
}
