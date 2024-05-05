import React from 'react'
import { createPortal } from 'react-dom'

// ---| core |---
import { ElementOptions, useElement } from 'hooks'


export type PortalOptions<E extends Element> = {
  ref?: ElementOptions<E>
  disable?: boolean;
}

export type PortalReturnOptions = React.ReactPortal | React.ReactNode | null

/**
 * Allows portal content if necessary.
 * Use document body by default.
 *
 * @example
 * const element = usePortal(content, { ref, disable })
 *
 * // component approach
 *
 * import React from 'react'
 * import { cn } from 'tools'
 * import { useFunc, usePortal, PortalReturnOptions } from 'hooks'
 * import css from './Portal.module.scss'
 *
 * export type PortalName = 'page-name' | 'page-actions' | 'main-menu' | 'aside'
 *
 * export const initPortalKey = (name: PortalName) => `portal-${name}`
 *
 * export type PortalProps = {
 *   name: PortalName
 *   disable?: boolean
 *   children?: React.ReactNode
 * }
 *
 * export function Portal(props: PortalProps): PortalReturnOptions {
 *   const { name, disable, children } = props
 *
 *   return usePortal(children, { ref: () => document.getElementById(initPortalKey(name)), disable })
 * }
 *
 * export type PortalContainerProps = {
 *   name: PortalName
 *   className?: string
 *   children?: React.ReactNode
 * }
 *
 * export function PortalContainer(props: PortalContainerProps): JSX.Element {
 *   const { name, children, className, ...otherProps } = props
 *   const _className = cn(css.PortalContainer, className)
 *
 *   return <div id={initPortalKey(name)} className={_className} {...otherProps}>{children}</div>
 * }
 *
 * Portal.Container = PortalContainer
 *
 * export default Portal
 *
 *
 * // usage
 * <Portal.Container name='page-name' />
 *
 * <Portal name='page-name'>Content</Portal>
 */
export const usePortal = <E extends Element>(content: React.ReactNode, options?: PortalOptions<E>): PortalReturnOptions => {
  const ref = useElement(options?.ref, document.body)

  if (options?.disable) {
    return content
  }

  return ref.current && createPortal(content, ref.current)
}

export default usePortal
