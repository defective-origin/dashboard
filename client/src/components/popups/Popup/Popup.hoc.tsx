import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import Popup, { PopupProps } from './Popup.component'

export type WithPopupProps = {
  popup?: React.ReactNode | PopupProps
}

/**
 * @example
 * export default withPopup(Button, () => ({ className: css.name }))
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const withPopup = <P extends {}>(
  WrappedComponent: React.ComponentType<P>,
  mapper?: (props: P) => PopupProps,
) => {
  const hoc = (props: P & Omit<WithPopupProps, 'v'>) => {
    const { popup, ...other } = props
    const item = <WrappedComponent {...(other as P)} />
    const tooltipProps = typeof popup === 'object' ? popup : { content: popup }

    if (popup !== null && popup !== undefined && popup !== false) {
      return (
        <Popup {...tooltipProps} {...mapper?.(other as P)}>
          {item}
        </Popup>
      )
    }

    return item
  }
  hoc.displayName = `withPopup(${WrappedComponent.displayName || WrappedComponent.name})`

  return hoc
}
