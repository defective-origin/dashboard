import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { BoardMarkup } from 'api'

// ---| pages |---
// ---| screens |---
import Device from 'screens/views/Device'
// ---| components |---
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import css from './Devices.module.scss'

export type DeviceItems = BoardMarkup[]

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
export function Devices(props: DevicesProps) {
  const { items, children, className, ...otherProps } = props
  const _className = cn(css.Devices, className)

  return (
    <Block className={_className} v='x' g='xxs' fit {...otherProps}>
      {items?.map(item => item.visible && <Device key={item.device} v={item.device} />)}

      {children}
    </Block>
  )
}

Devices.displayName = 'Devices'

export default Devices
