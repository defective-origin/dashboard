import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockWithItemsProps } from 'components/Block'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Alerts.module.scss'
import Alert, { AlertProps } from 'components/Alert'

export type AlertStatus = AlertProps['status']
// TODO: move Alert component as sub component
export type AlertItem = AlertProps

// TODO: change to BlockProps<AlertItem>?
export type AlertsProps = BlockWithItemsProps<typeof Alert>

/**
 * Component description.
 *
 * How to use
 * @example
 * <Alerts />
 */
export function Alerts(props: AlertsProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.Alerts, className)

  return <Block className={_className} cmp={Alert} {...otherProps} />
}

Alerts.displayName = 'Alerts'

export default Alerts
