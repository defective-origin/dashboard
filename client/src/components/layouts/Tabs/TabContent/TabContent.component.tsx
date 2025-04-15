import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| self |---
import css from './TabContent.module.scss'
import { useTabs } from '../Tabs.context'

export type TabContentProps = {
  value?: any
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <TabContent />
 */
export function TabContent(props: TabContentProps) {
  const tabs = useTabs()

  return props.value === tabs?.value && props?.children
}

TabContent.displayName = 'TabContent'

export default TabContent
