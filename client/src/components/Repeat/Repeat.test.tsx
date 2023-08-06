// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Repeat, { RepeatItem } from './Repeat.component'

type ItemProps = { content: React.ReactNode }

describe('[Repeat] component', () => {
  it('should render items with item component', () => {
    const Item = (props: ItemProps) => <p data-testid='item'>{props.content}</p>
    const items: RepeatItem<typeof Item>[] = [
      { content: '1' },
      { content: '2' },
      { content: '3' },
    ]
    const container = render(<Repeat as={Item} items={items} />)

    expect(container.getAll('item')).toHaveLength(3)
    expect(container.snapshot()).toMatchSnapshot()
  })

  it('should render items with item component from map', () => {
    const ItemA = (props: { a: React.ReactNode }) => <p data-testid='itemA'>{props.a}</p>
    const ItemB = (props: { b: React.ReactNode }) => <p data-testid='itemB'>{props.b}</p>
    const ItemC = (props: { c: React.ReactNode }) => <p data-testid='itemC'>{props.c}</p>
    const itemMap = {
      a: ItemA,
      b: ItemB,
      c: ItemC,
    }
    const items: RepeatItem<typeof itemMap>[] = [
      { v: 'a', a: '1' },
      { v: 'b', b: '2' },
      { v: 'c', c: '3' },
    ]
    const container = render(<Repeat as={itemMap} items={items} />)

    expect(container.getAll('itemA')).toHaveLength(1)
    expect(container.getAll('itemB')).toHaveLength(1)
    expect(container.getAll('itemC')).toHaveLength(1)
    expect(container.snapshot()).toMatchSnapshot()
  })

  it('should render items with default component type', () => {
    const ItemA = (props: ItemProps) => <p data-testid='itemA'>{props.content}</p>
    const ItemB = (props: ItemProps) => <p data-testid='itemB'>{props.content}</p>
    const ItemC = (props: ItemProps) => <p data-testid='itemC'>{props.content}</p>
    const itemMap = {
      a: ItemA,
      b: ItemB,
      c: ItemC,
    }
    const items: RepeatItem<typeof itemMap>[] = [
      { content: '1' },
      { content: '2', v: 'b' },
      { content: '3' },
    ]
    const container = render(<Repeat as={itemMap} items={items} v='a' />)

    expect(container.getAll('itemA')).toHaveLength(2)
    expect(container.getAll('itemB')).toHaveLength(1)
    expect(container.snapshot()).toMatchSnapshot()
  })
})
