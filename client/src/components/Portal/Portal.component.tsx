import React from 'react'
import { Portal as MuiPortal } from '@mui/base'

// ---| core |---
import { cn } from 'tools'
import { useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './Portal.module.scss'

export type PortalName = 'page-name' | 'page-actions'

export const initPortalKey = (name: PortalName) => `portal-${name}`

export type PortalProps = {
  name: PortalName
  content?: React.ReactNode
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Portal />
 */
export function Portal(props: PortalProps): JSX.Element {
  const { name, content, children = content } = props
  const initContainer = useFunc(() => document.getElementById(initPortalKey(name)))

  return <MuiPortal container={initContainer}>{children}</MuiPortal>
}

Portal.displayName = 'Portal'

export type PortalContainerProps = {
  name: PortalName
  className?: string
  children?: React.ReactNode
}

export function PortalContainer(props: PortalContainerProps): JSX.Element {
  const { name, children, className, ...otherProps } = props
  const _className = cn(css.PortalContainer, className)

  return <div id={initPortalKey(name)} className={_className} {...otherProps}>{children}</div>
}

PortalContainer.displayName = 'PortalContainer'

Portal.Container = PortalContainer

export default Portal
