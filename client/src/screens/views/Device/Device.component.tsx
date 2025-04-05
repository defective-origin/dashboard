import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { BoardMarkupDevice } from 'api'
import { TranslateKeys, t } from 'locale'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Tooltip from 'components/popups/Tooltip'
import Icon, { DeviceIconVariant, IconProps } from 'components/views/Icon'

// ---| self |---
import css from './Device.module.scss'

export type DeviceVariant = BoardMarkupDevice

const DEVICE_MAP: Record<DeviceVariant, { v: DeviceIconVariant, tooltip: TranslateKeys }> = {
  tv: { v: 'tv', tooltip: 'DEVICE.TV' },
  computer: { v: 'computer', tooltip: 'DEVICE.COMPUTER' },
  tablet: { v: 'tablet_mac', tooltip: 'DEVICE.TABLET' },
  mobile: { v: 'phone_iphone', tooltip: 'DEVICE.MOBILE' },
  watch: { v: 'watch', tooltip: 'DEVICE.WATCH' },
}

export type DeviceProps = Omit<IconProps, 'v'> & {
  v: BoardMarkupDevice
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Device />
 */
export function Device(props: DeviceProps): JSX.Element {
  const { v, className, ...otherProps } = props
  const _className = cn(css.Device, className)
  const option = DEVICE_MAP[v]

  return (
    <Tooltip content={t(option.tooltip)}>
      <Icon className={_className} v={option.v} {...otherProps} />
    </Tooltip>
  )
}

Device.displayName = 'Device'

export default Device
