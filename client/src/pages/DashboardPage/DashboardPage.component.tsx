import React, { useState } from 'react'

// ---| core |---
import { RouteProps } from 'router'

// ---| pages |---
// ---| screens |---
import Page, { PageProps } from 'screens/Page'

// ---| components |---
import Board, { BoardItem } from 'components/Board'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './DashboardPage.module.scss'

export type DashboardPageProps = RouteProps & PageProps & {
  className?: string
  children?: React.ReactNode
}

const cards: BoardItem[] = [
  { placement: { v1: { x: 0, y: 0 }, v2: { x: 3, y: 3 } } },
  { placement: { v1: { x: 3, y: 3 }, v2: { x: 6, y: 6 } } },
  { placement: { v1: { x: 6, y: 6 }, v2: { x: 9, y: 9 } } },
]

/**
 * Component description.
 *
 * How to use
 * @example
 * <DashboardPage />
 */
export function DashboardPage(props: DashboardPageProps): JSX.Element {
  const { navigate, children, className, ...otherProps } = props
  const _className = cn(css.DashboardPage, className)
  const [items, setItems] = useState(cards)
  const handleError = (error: any) => { console.log('handleError', error) }
  const handleSelect = (placement: any) => { setItems([...items, { placement }]) }
  const handleReselect = (item: BoardItem, oldItem: BoardItem) => {
    setItems(items.map((i) => (i === oldItem ? item : i)))
  }
  const TestComponent = (props = {}) => <div {...props}>TEST ITEM</div>

  return (
    <Page className={_className} {...otherProps}>
      <Board
        className={_className}
        rows={9}
        columns={9}
        gap={10}
        widget={TestComponent}
        reselect={items[0]}
        items={items}
        select
        onSelect={handleSelect}
        onReselect={handleReselect}
        onError={handleError}
      >
        {children}
      </Board>
    </Page>
  )
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
