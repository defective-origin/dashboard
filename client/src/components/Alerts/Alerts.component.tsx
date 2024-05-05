import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockProps } from 'components/Block'
import Repeat, { PropsWithItems } from 'components/Repeat'

// ---| self |---
import css from './Alerts.module.scss'
import Alert, { AlertProps } from 'components/Alert'

export type AlertColor = AlertProps['color']
export type AlertItem = AlertProps | string

export type AlertsProps = PropsWithItems<AlertItem, BlockProps> & {
  color?: AlertColor
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Alerts />
 */
export function Alerts(props: AlertsProps): JSX.Element {
  const { items = [], color = 'primary', children, className, ...otherProps } = props
  const _className = cn(css.Alerts, className)
  const alerts = useMemo(() =>
    items.map((content) =>
      typeof content === 'string'
        ? ({ color, content })
        : content,
    ), [color, items]) as AlertProps[]

  return (
    <Block className={_className} {...otherProps}>
      <Repeat cmp={Alert} items={alerts} />

      {children}
    </Block>
  )
}

Alerts.Item = Alert

Alerts.displayName = 'Alerts'

export default Alerts
