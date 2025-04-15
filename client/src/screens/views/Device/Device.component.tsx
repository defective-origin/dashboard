import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { BoardMarkupDevice } from 'api'
import { TranslateKeys, t } from 'locale'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Tooltip from 'components/popups/Tooltip'
import Icon, { IconProps, IconVariant } from 'components/views/Icon'

// ---| self |---
import css from './Device.module.scss'

export type DeviceVariant = BoardMarkupDevice

const DEVICE_MAP: Record<DeviceVariant, { v: IconVariant, tooltip: TranslateKeys }> = {
  BOARD: { v: 'high_quality', tooltip: 'DEVICE.BOARD' },
  TV: { v: 'live_tv', tooltip: 'DEVICE.TV' },
  COMPUTER: { v: 'desktop_windows', tooltip: 'DEVICE.COMPUTER' },
  LAPTOP: { v: 'laptop_chromebook', tooltip: 'DEVICE.LAPTOP' },
  TABLET: { v: 'tablet_mac', tooltip: 'DEVICE.TABLET' },
  MOBILE: { v: 'phone_iphone', tooltip: 'DEVICE.MOBILE' },
  WATCH: { v: 'watch', tooltip: 'DEVICE.WATCH' },
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
export function Device(props: DeviceProps) {
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
