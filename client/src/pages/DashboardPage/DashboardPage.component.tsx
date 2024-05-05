import React, { useCallback, useState } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
import BasePage, { BasePageProps } from 'screens/BasePage'

// ---| components |---
import Board, { BoardItem } from 'components/Board'
import Widget from 'components/Widget'
import { ActionItem } from 'components/Actions'

// ---| self |---
import css from './DashboardPage.module.scss'

export type DashboardPageProps = BasePageProps

const cards: BoardItem[] = [
  { place: { v1: { x: 0, y: 0 }, v2: { x: 3, y: 3 } } },
  { place: { v1: { x: 0, y: 4 }, v2: { x: 1, y: 5 } } },
  { place: { v1: { x: 1, y: 4 }, v2: { x: 2, y: 5 } } },
  { place: { v1: { x: 2, y: 4 }, v2: { x: 3, y: 5 } } },
  { place: { v1: { x: 3, y: 4 }, v2: { x: 4, y: 5 } } },
  { place: { v1: { x: 4, y: 4 }, v2: { x: 5, y: 5 } } },
  { place: { v1: { x: 5, y: 4 }, v2: { x: 6, y: 5 } } },
  { place: { v1: { x: 0, y: 5 }, v2: { x: 6, y: 6 } } },
  { place: { v1: { x: 0, y: 6 }, v2: { x: 6, y: 9 } } },
  { place: { v1: { x: 9, y: 0 }, v2: { x: 18, y: 4 } } },
  { place: { v1: { x: 6, y: 4 }, v2: { x: 14, y: 7 } } },
  { place: { v1: { x: 6, y: 7 }, v2: { x: 14, y: 9 } } },
  { place: { v1: { x: 14, y: 4 }, v2: { x: 18, y: 9 } } },
]

/**
 * Component description.
 *
 * How to use
 * @example
 * <DashboardPage />
 */
export function DashboardPage(props: DashboardPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.DashboardPage, className)
  const [isEditMode, setIsEditMode] = useState(false)
  const switchMode = useCallback(() => setIsEditMode((flag) => !flag), [])


  // temporary
  const [items, setItems] = useState([...cards])
  const handleSelect = (place: any) => { setItems([...items, { place }]) }
  const handleReselect = (item: BoardItem, oldItem: BoardItem) => {
    setItems(items.map((i) => (i === oldItem ? item : i)))
  }
  const handleError = (error: any) => { console.log('handleError', error) }

  const actions: ActionItem[] = [
    { start: 'dashboard_customize', tooltip: 'Add Widget' },
    {
      start: 'computer', items: [
        { start: 'tv', content: 'Television' },
        { start: 'computer', content: 'Computer' },
        { start: 'tablet_mac', content: 'Tablet [vertical]' },
        { start: 'tablet_mac', content: 'Tablet [horizontal]' },
        { start: 'phone_iphone', content: 'Mobile [vertical]' },
        { start: 'phone_iphone', content: 'Mobile [horizontal]' },
      ],
    },
    { start: 'beenhere', tooltip: 'Add to Menu' },
    { start: 'book', tooltip: 'Docs' },
    { start: 'settings', tooltip: 'Settings' },
    { start: 'delete', tooltip: 'Remove' },
  ]

  return (
    <BasePage className={_className} name='PAGES.DASHBOARDS' actions={actions} noFooter {...otherProps}>
      <Board
        className={_className}
        padding={8}
        rows={10}
        columns={20}
        items={items}
        select={isEditMode && items[0]}
        widget={Widget}
        onSelect={handleSelect}
        onReselect={handleReselect}
        onError={handleError}
      />

      {children}
    </BasePage>
  )
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
