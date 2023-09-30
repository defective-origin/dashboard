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
  const { children, className, ...otherProps } = props
  const _className = cn(css.DashboardPage, className)
  const [items1, setItems1] = useState([...cards])
  const [items2, setItems2] = useState([...cards])
  const handleSelect1 = (placement: any) => { setItems1([...items1, { placement }]) }
  const handleReselect1 = (item: BoardItem, oldItem: BoardItem) => {
    setItems1(items1.map((i) => (i === oldItem ? item : i)))
  }
  const handleSelect2 = (placement: any) => { setItems2([...items2, { placement }]) }
  const handleReselect2 = (item: BoardItem, oldItem: BoardItem) => {
    setItems2(items2.map((i) => (i === oldItem ? item : i)))
  }
  const handleError = (error: any) => { console.log('handleError', error) }
  const TestComponent = (props = {}) => <div {...props}>TEST ITEM</div>

  return (
    <Page className={_className} name='PAGES.DASHBOARDS' {...otherProps}>
      <Board
        className={_className}
        rows={25}
        columns={50}
        gap={10}
        widget={TestComponent}
        reselect={items1[0]}
        items={items1}
        select
        onSelect={handleSelect1}
        onReselect={handleReselect1}
        onError={handleError}
        style={{ height: '50%', marginBottom: 10 }}
      >
        {children}
      </Board>
      <Board
        className={_className}
        rows={9}
        columns={9}
        gap={10}
        widget={TestComponent}
        items={items2}
        select
        onSelect={handleSelect2}
        onReselect={handleReselect2}
        onError={handleError}
        style={{ height: '50%' }}
      >
        {children}
      </Board>
    </Page>
  )
}

DashboardPage.displayName = 'DashboardPage'

export default DashboardPage
