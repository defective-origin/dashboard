import React, { useCallback, useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { useLocale } from 'locale'

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
  { place: { v1: { x: 0, y: 6 }, v2: { x: 6, y: 10 } } },
  { place: { v1: { x: 9, y: 0 }, v2: { x: 18, y: 4 } } },
  { place: { v1: { x: 6, y: 4 }, v2: { x: 14, y: 7 } } },
  { place: { v1: { x: 6, y: 7 }, v2: { x: 14, y: 10 } } },
  { place: { v1: { x: 14, y: 4 }, v2: { x: 20, y: 5 } } },
  { place: { v1: { x: 14, y: 5 }, v2: { x: 20, y: 6 } } },
  { place: { v1: { x: 14, y: 6 }, v2: { x: 20, y: 7 } } },
  { place: { v1: { x: 14, y: 7 }, v2: { x: 17, y: 10 } } },
  { place: { v1: { x: 17, y: 7 }, v2: { x: 20, y: 10 } } },
  { place: { v1: { x: 18, y: 0 }, v2: { x: 20, y: 4 } } },
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
  const locale = useLocale()
  const [mode, setMode] = useState<boolean | object>(false)
  const switchSelect = useCallback(() => setMode((flag) => !flag), [])
  const switchReselect = useCallback(() => setMode((flag) => !flag ? cards[0] : false), [])


  // temporary
  const [items, setItems] = useState([...cards])
  const handleSelect = (place: any) => {
    setItems([...items, { place }])
    switchSelect()
  }
  const handleReselect = (item: BoardItem, oldItem: BoardItem) => {
    setItems(items.map((i) => (i === oldItem ? item : i)))
  }
  const handleError = (error: any) => { console.log('handleError', error) }

  const actions: ActionItem[] = [
    { start: 'dashboard_customize', tooltip: locale.t('ACTION.ADD_WIDGET'), onClick: switchSelect },
    {
      start: 'computer', items: [
        { start: 'tv', content: locale.t('DEVICE.TV') },
        { start: 'computer', content: locale.t('DEVICE.COMPUTER') },
        { start: 'tablet_mac', content: locale.t('DEVICE.TABLET_VERTICAL') },
        { start: 'tablet_mac', content: locale.t('DEVICE.TABLET_HORIZONTAL') },
        { start: 'phone_iphone', content: locale.t('DEVICE.MOBILE_VERTICAL') },
        { start: 'phone_iphone', content: locale.t('DEVICE.MOBILE_HORIZONTAL') },
      ],
    },
    { start: 'beenhere', tooltip: locale.t('ACTION.ADD_TO_MENU') },
    { start: 'book', tooltip: locale.t('ACTION.DOCS') },
    { start: 'settings', tooltip: locale.t('ACTION.SETTINGS') },
    { start: 'delete', tooltip: locale.t('ACTION.REMOVE') },
  ]

  return (
    <BasePage className={_className} name='PAGES.DASHBOARDS' actions={actions} noFooter {...otherProps}>
      <Board
        className={_className}
        padding={8}
        rows={10}
        columns={20}
        items={items}
        select={mode as any}
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
