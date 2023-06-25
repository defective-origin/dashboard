import React, { useState } from 'react'

// ---| Components |---
import Table from 'components/Table'
import AppPage from '../AppPage'
import Board, { BoardItem } from 'components/Board'

// ---| self |---
import './App.module.scss'
import { Square } from 'common/tools/Placement'
import { Placement } from 'common/tools'

const cards: BoardItem[] = [
  { placement: {
    v1: { x: 0, y: 0 },
    v2: { x: 3, y: 3 },
  } },
  { placement: {
    v1: { x: 3, y: 3 },
    v2: { x: 6, y: 6 },
  } },
  { placement: {
    v1: { x: 6, y: 6 },
    v2: { x: 9, y: 9 },
  } },
]

export default function App(): JSX.Element {
  const [items, setItems] = useState(cards)
  const handleSelect = (placement: Placement.Square) => { setItems([...items, { placement }]) }
  const handleReselect = (item: BoardItem, oldItem: BoardItem) => {
    setItems(items.map((i) => (i === oldItem ? item : i)))
  }
  const TestComponent = (props = {}) => <div {...props}>TEST ITEM</div>
  return (
    <AppPage />
    // <Board
    //   rows={9}
    //   columns={9}
    //   gap={10}
    //   widget={TestComponent}
    //   reselect={items[0]}
    //   items={items}
    //   select
    //   onSelect={handleSelect as any}
    // />
  )
}
