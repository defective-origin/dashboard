import React, { useCallback } from 'react'
import MuiPortal from '@mui/base/Portal'

// ---| core |---
import { cn } from 'tools'

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
  const initContainer = useCallback(() => document.getElementById(initPortalKey(name)), [name])

  return <MuiPortal container={initContainer}>{children}</MuiPortal>
}

export type PortalContainerProps = {
  name: PortalName
  className?: string
  children?: React.ReactNode
}

Portal.Container = function Portal(props: PortalContainerProps): JSX.Element {
  const { name, children, className, ...otherProps } = props
  const _className = cn(css.PortalContainer, className)

  return <div id={initPortalKey(name)} className={_className} {...otherProps}>{children}</div>
}

Portal.displayName = 'Portal'

export default Portal
