import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { DashboardDevice, DashboardDevices } from 'api'

// ---| pages |---
// ---| screens |---
import Device from 'screens/views/Device'

// ---| components |---
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import css from './Devices.module.scss'

export type DeviceItems = DashboardDevices

export type DevicesProps = BlockProps & {
  items?: DeviceItems
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Devices />
 */
export function Devices(props: DevicesProps): JSX.Element {
  const { items, children, className, ...otherProps } = props
  const _className = cn(css.Devices, className)

  return (
    <Block className={_className} v='x' g='xxs' fit {...otherProps}>
      {Object.keys(items ?? {}).map((key) => items?.[key as DashboardDevice].active && <Device key={key} v={key as DashboardDevice} />)}

      {children}
    </Block>
  )
}

Devices.displayName = 'Devices'

export default Devices
