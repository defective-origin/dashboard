import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { PortalReturnOptions, usePortal } from 'hooks'

// ---| self |---
import css from './Portal.module.scss'

export type PortalName = 'page-name' | 'page-actions'

export const initPortalKey = (name: PortalName) => `portal-${name}`

export type PortalProps = {
  name: PortalName
  disable?: boolean
  content?: React.ReactNode
  children?: React.ReactNode
}

/**
 * Allows portal content if into portal container.
 *
 * How to use
 * @example
 * <Portal name='page-name'>Content</Portal>
 * <Portal name='page-name' content="Content" />
 */
export function Portal(props: PortalProps): PortalReturnOptions {
  const { name, disable, content, children = content } = props

  return usePortal(children, { ref: () => document.getElementById(initPortalKey(name)), disable })
}

Portal.displayName = 'Portal'

export type PortalContainerProps = {
  name: PortalName
  className?: string
  children?: React.ReactNode
}

/**
 * Create portal container.
 *
 * How to use
 * @example
 * <Portal.Container name='page-name' />
 */
export function PortalContainer(props: PortalContainerProps): JSX.Element {
  const { name, children, className, ...otherProps } = props
  const _className = cn(css.PortalContainer, className)

  return <div id={initPortalKey(name)} className={_className} {...otherProps}>{children}</div>
}

PortalContainer.displayName = 'PortalContainer'

Portal.Container = PortalContainer

export default Portal
