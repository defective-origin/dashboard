import React from 'react'

// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Repeat, { RepeatItem } from './Repeat.component'

type ItemProps = { content: React.ReactNode }

describe('[Repeat] component', () => {
  const Item = (props: ItemProps) => <p data-testid='item'>{props.content}</p>
  class ItemClass extends React.Component { render() { return 'CLASS COMPONENT' } }

  const itemMap = {
    a: (props: { a?: React.ReactNode } & ItemProps) => <p data-testid='itemA'>{props.a} - {props.content}</p>,
    b: (props: { b?: React.ReactNode } & ItemProps) => <p data-testid='itemB'>{props.b} - {props.content}</p>,

    // should work with native items
    instinct: 'div',
    function: function({ name = 'function' }) { return name },
    arrowFunction: ({ name = 'arrow function'}) => name,
    class: ItemClass,
  }

  it('should render items with item component', () => {
    // type casting can be omitted if we work with component
    const items = [
      { content: '1' },
      { content: '2' },
    ]
    const container = render(<Repeat cmp={Item} items={items} />)

    expect(container.getAll('item')).toHaveLength(2)
    expect(container.snapshot()).toMatchSnapshot()
  })

  it('should render items with item component from map', () => {
    // type casting can not be omitted if we work with component map
    const items: RepeatItem<typeof itemMap>[] = [
      { variant: 'a', a: '1', content: '1' },
      { variant: 'b', b: '2', content: '2' },
    ]
    const container = render(<Repeat cmp={itemMap} items={items} />)

    expect(container.getAll('itemA')).toHaveLength(1)
    expect(container.getAll('itemB')).toHaveLength(1)
    expect(container.snapshot()).toMatchSnapshot()
  })

  it('should render items with default component type', () => {
    const items: RepeatItem<typeof itemMap>[] = [
      { content: '1' },
      { content: '2', variant: 'b' },
    ]
    const container = render(<Repeat cmp={itemMap} items={items} variant='a' />)

    expect(container.getAll('itemA')).toHaveLength(1)
    expect(container.getAll('itemB')).toHaveLength(1)
    expect(container.snapshot()).toMatchSnapshot()
  })

  it('should render with same named props', () => {
    const items: RepeatItem<typeof itemMap>[] = [
      { content: '1', variant: 'a' },
      { content: '2', variant: 'b' },
    ]
    const container = render(<Repeat cmp={itemMap} items={items} />)

    expect(container.getAll('itemA')).toHaveLength(1)
    expect(container.getAll('itemB')).toHaveLength(1)
  })

  it('should works with different types of components', () => {
    const container = render(<Repeat cmp={itemMap} items={[
      { variant: 'instinct' },
      { variant: 'function' },
      { variant: 'arrowFunction' },
      { variant: 'class' },
    ]} />)

    expect(container.getAll('instinct')).toHaveLength(1)
    expect(container.getAll('function')).toHaveLength(1)
    expect(container.getAll('arrowFunction')).toHaveLength(1)
    expect(container.getAll('class')).toHaveLength(1)
  })
})
