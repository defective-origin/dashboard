import React from 'react'

// ---| components |---
import { ComponentUIProps, useComponentUIProps } from 'components/Component'

// ---| self |---
import useLayoutItemUIProps, { LayoutItemUIProps } from './LayoutItemUI'

export type LayoutItemProps =  ComponentUIProps & LayoutItemUIProps

export const LayoutElementMap = {
  'right-aside': 'aside',
  'left-aside': 'aside',
  footer: 'footer',
  header: 'header',
  content: 'main',
} as const

export default function LayoutItem(props: LayoutItemProps): JSX.Element | null {
  const _props = useLayoutItemUIProps(props, { map: LayoutElementMap })

  return useComponentUIProps(_props)
}
