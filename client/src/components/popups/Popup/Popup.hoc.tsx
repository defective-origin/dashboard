import React from 'react'

// ---| core |---
// ---| components |---

// ---| self |---
import Popup, { PopupProps } from './Popup.component'

export type WithPopupProps = {
  tooltip?: PopupProps
} | {
  tooltip?: React.ReactNode
  tooltipSide?: PopupProps['side']
}

/**
 * Extend any component by popup opportunity
 * @example
 * export default withPopup(Button)
 */
export function withPopup<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const hoc = (props: P & WithPopupProps) => {
    const { tooltip, tooltipSide, ...other } = props as any
    const trigger = <WrappedComponent {...other} />

    if (tooltip !== null && tooltip !== undefined && tooltip !== false) {
      const tooltipProps = typeof tooltip === 'object' ? tooltip : { content: tooltip, side: tooltipSide }

      return <Popup {...tooltipProps} trigger={trigger} arrow />
    }

    return trigger
  }
  hoc.displayName = `withPopup(${WrappedComponent.displayName || WrappedComponent.name})`

  return hoc
}
