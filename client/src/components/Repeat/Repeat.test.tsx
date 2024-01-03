// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Repeat, { RepeatItem } from './Repeat.component'

type ItemProps = { content: React.ReactNode }

describe('[Repeat] component', () => {
  const Item = (props: ItemProps) => <p data-testid='item'>{props.content}</p>
  const ItemA = (props: { a?: React.ReactNode } & ItemProps) => <p data-testid='itemA'>{props.a} - {props.content}</p>
  const ItemB = (props: { b?: React.ReactNode } & ItemProps) => <p data-testid='itemB'>{props.b} - {props.content}</p>

  const itemMap = {
    a: ItemA,
    b: ItemB,
  }

  it('should render items with item component', () => {
    const items: RepeatItem<typeof Item>[] = [
      { content: '1' },
      { content: '2' },
    ]
    const container = render(<Repeat cmp={Item} items={items} />)

    expect(container.getAll('item')).toHaveLength(2)
    expect(container.snapshot()).toMatchSnapshot()
  })

  it('should render items with item component from map', () => {
    const items: RepeatItem<typeof itemMap>[] = [
      { v: 'a', a: '1', content: '1' },
      { v: 'b', b: '2', content: '2' },
    ]
    const container = render(<Repeat cmp={itemMap} items={items} />)

    expect(container.getAll('itemA')).toHaveLength(1)
    expect(container.getAll('itemB')).toHaveLength(1)
    expect(container.snapshot()).toMatchSnapshot()
  })

  it('should render items with default component type', () => {
    const items: RepeatItem<typeof itemMap>[] = [
      { content: '1' },
      { content: '2', v: 'b' },
    ]
    const container = render(<Repeat cmp={itemMap} items={items} v='a' />)

    expect(container.getAll('itemA')).toHaveLength(1)
    expect(container.getAll('itemB')).toHaveLength(1)
    expect(container.snapshot()).toMatchSnapshot()
  })

  it('should render with same named props', () => {
    const items: RepeatItem<typeof itemMap>[] = [
      { content: '1', v: 'a' },
      { content: '2', v: 'b' },
    ]
    const container = render(<Repeat cmp={itemMap} items={items} />)

    expect(container.getAll('itemA')).toHaveLength(1)
    expect(container.getAll('itemB')).toHaveLength(1)
  })

  it('should works with different types of components', () => {
    class Cmp { render() { return 'CLASS COMPONENT' } }
    const itemMap = {
      instinct: 'span',
      function: function() { return 'function'},
      arrowFunction: () => 'arrow function',
      class: Cmp,
      // TODO: with React.memo, React.forwardRef
    }
    const items: RepeatItem<typeof itemMap>[] = [
      { v: 'instinct' },
      { v: 'function' },
      { v: 'arrowFunction' },
      { v: 'class' },
    ]
    const container = render(<Repeat cmp={itemMap} items={items} />)

    expect(container.getAll('instinct')).toHaveLength(1)
    expect(container.getAll('function')).toHaveLength(1)
    expect(container.getAll('arrowFunction')).toHaveLength(1)
    expect(container.getAll('class')).toHaveLength(1)
  })
})
