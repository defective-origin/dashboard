import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockProps } from 'components/Block'
import Repeat, { ComponentWithItems } from 'components/Repeat'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Alerts.module.scss'
import Alert, { AlertProps } from 'components/Alert'

export type AlertColor = AlertProps['color']
export type AlertItem = AlertProps

export type AlertsProps = ComponentWithItems<BlockProps, AlertItem>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Alerts />
 */
export function Alerts(props: AlertsProps): JSX.Element {
  const { items, children, className, ...otherProps } = props
  const _className = cn(css.Alerts, className)

  return (
    <Block className={_className} {...otherProps}>
      <Repeat cmp={Alert} items={items} />

      {children}
    </Block>
  )
}

Alerts.Alert = Alert
Alerts.Divider = Block.Divider
Alerts.Spacer = Block.Spacer

Alerts.displayName = 'Alerts'

export default Alerts
