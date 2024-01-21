import { useState, useEffect, useCallback } from 'react'

export enum DeviceType {
  DESKTOP = 'DESKTOP',
  TABLET = 'TABLET',
  MOBILE = 'MOBILE',
}

// Common breakpoints for widths of devices:
// 320px — 480px: Mobile devices
// 481px — 768px: iPads, Tablets
// 769px — 1024px: Small screens, laptops
// 1025px — 1200px: Desktops, large screens
// 1201px and more — Extra large screens, TV
const DEVICE_TYPE_CONFIGS = [
  {
    type: DeviceType.TABLET,
    regexp: /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i,
    minWidth: 481,
    maxWidth: 768,
  },
  {
    type: DeviceType.MOBILE,
    regexp: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i,
    minWidth: 0,
    maxWidth: 480,
  },
  {
    type: DeviceType.DESKTOP,
    regexp: new RegExp(''),
    minWidth: 769,
    maxWidth: 10000,
  },
]

function getDeviceType(agent: string, width: number): DeviceType {
  for (const deviceConfig of DEVICE_TYPE_CONFIGS) {
    if (deviceConfig.regexp.test(agent)
    || (deviceConfig.minWidth <= width && deviceConfig.maxWidth >= width)) {
      return deviceConfig.type
    }
  }

  return DeviceType.DESKTOP
}

export enum Orientation {
  VERTICAL = 'VERTICAL',
  HORIZONTAL = 'HORIZONTAL',
}

function getOrientation(width: number, height: number): Orientation {
  return width > height ? Orientation.HORIZONTAL : Orientation.VERTICAL
}

export type DeviceOptions = {
  type: DeviceType;
  orientation: Orientation;
  screenWidth: number,
  screenHeight: number,
  ratioWH: number,
  ratioHW: number,
}

export function useDeviceOptions(): DeviceOptions {
  const [options, setOptions] = useState<DeviceOptions>({
    type: getDeviceType(navigator.userAgent, window.innerWidth),
    orientation: getOrientation(window.innerWidth, window.innerHeight),
    screenWidth: 0,
    screenHeight: 0,
    ratioWH: 0,
    ratioHW: 0,
  })

  const onResize = useCallback(() => {
    const newOptions: DeviceOptions = {
      type: getDeviceType(navigator.userAgent, window.innerWidth),
      orientation: getOrientation(window.innerWidth, window.innerHeight),
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      ratioWH: window.innerWidth / window.innerHeight,
      ratioHW: window.innerHeight / window.innerWidth,
    }

    setOptions(newOptions)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    onResize()
    return () => window.removeEventListener('resize', onResize, false)
  }, [onResize])

  return options
}

export default useDeviceOptions
