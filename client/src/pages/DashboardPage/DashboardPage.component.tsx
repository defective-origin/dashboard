import React, { useState } from 'react'

// ---| core |---

// ---| pages |---
// ---| screens |---
import Page, { PageProps } from 'screens/Page'

// ---| components |---
import Board, { BoardItem } from 'components/Board'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './DashboardPage.module.scss'

export type DashboardPageProps = PageProps & {
  className?: string
  children?: React.ReactNode
}

const cards: BoardItem[] = [
  { place: { v1: { x: 0, y: 0 }, v2: { x: 3, y: 3 } } },
  { place: { v1: { x: 3, y: 3 }, v2: { x: 6, y: 6 } } },
  { place: { v1: { x: 6, y: 6 }, v2: { x: 9, y: 9 } } },
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
  const [items, setItems] = useState([...cards])
  const handleSelect = (place: any) => { setItems([...items, { place }]) }
  const handleReselect = (item: BoardItem, oldItem: BoardItem) => {
    setItems(items.map((i) => (i === oldItem ? item : i)))
  }
  const handleError = (error: any) => { console.log('handleError', error) }
  const TestComponent = (props = {}) => <div {...props}>TEST ITEM</div>

  return (
    <Page className={_className} name='PAGES.DASHBOARDS' {...otherProps}>
      {/* <AppMenuItem start={app.mode.is('edit') ? 'developer_mode_tv' : 'tv'} content={app.mode.mode.toUpperCase()} onClick={app.mode.toggle} /> */}

      <Board
        className={_className}
        rows={25}
        columns={50}
        items={items}
        select={items[0]}
        onSelect={handleSelect}
        onReselect={handleReselect}
        onError={handleError}
      />
      {/* <Board
        className={_className}
        rows={25}
        columns={50}
        items={items}
        select={items[0]}
        onSelect={handleSelect}
        onReselect={handleReselect}
        onError={handleError}
        style={{ height: '50%', marginBottom: 10 }}
      />
      <Board
        className={_className}
        rows={9}
        columns={9}
        items={items}
        select={app.isMode('edit')}
        onSelect={handleSelect}
        onReselect={handleReselect}
        onError={handleError}
        style={{ height: '50%' }}
      /> */}
    </Page>
  )
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
