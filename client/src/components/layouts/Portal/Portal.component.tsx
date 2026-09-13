import React from 'react'
import { createPortal } from 'react-dom'

// ---| components |---
import Block, { BlockProps } from 'components/layouts/Block'

// ---| core |---
import { cn, react } from 'tools'

// ---| self |---
import css from './Portal.module.scss'

export type PortalName = 'page-name' | 'page-extra' | 'page-nav'

export const initPortalKey = (name: PortalName) => `portal-${name}`

export type PortalProps = {
  name: PortalName
  disable?: boolean
  content?: React.ReactNode
  children?: React.ReactNode
}

/**
 * Allows portal content if into portal container.
 * @example
 * <Portal.Container name='page-name' />
 *
 * <Portal name='page-name'>Content</Portal>
 * <Portal name='page-name' content="Content" />
 * <Portal name='page-name' content="Content" disabled={isAdmin} />
 */
export function Portal(props: PortalProps) {
  const { name, disable, content, children = content } = props

  if (disable) {
    return content
  }

  const elem = react.getElement(() => document.getElementById(initPortalKey(name)), document.body)

  return elem && createPortal(children, elem)
}

Portal.displayName = 'Portal'

export type PortalContainerProps = BlockProps & {
  name: PortalName
}

/**
 * Create portal container.
 * @example
 * <Portal.Container name='page-name' />
 */
Portal.Container = function PortalContainer(props: PortalContainerProps) {
  const { name, children, className, ...otherProps } = props

  return <Block id={initPortalKey(name)} className={cn(css.PortalContainer, className)} {...otherProps}>{children}</Block>
}

export default Portal
