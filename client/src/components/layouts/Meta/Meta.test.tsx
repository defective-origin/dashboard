// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Meta, { MetaItem } from './Meta.component'

describe('[Meta] component', () => {
  const items: MetaItem[] = [
    { v: 'meta', name: 'name1', content: 'name1' },
    { v: 'meta', name: 'name2', content: 'name2' },
  ]

  it('should render component', async () => {
    const container = render(
      <Meta title='TITLE' items={items}>
        <meta name='name3' content='name3' />
      </Meta>,
      { container: document.head },
    )

    expect(container.snapshot()).toMatchSnapshot()
  })

  it('should add items to head tag', async () => {
    const container = render(
      <Meta
        title='TITLE'
        description='DESCRIPTION'
        keywords='KEY1, KEY2'
        viewport={0.5}
        locale='EN'
        type='ARTICLE'
        items={items}
      >
        <meta name='name3' content='name3' />
      </Meta>,
      {
        container: document.head,
      },
    )

    await container.waitFor(() => {
      expect(document.head.querySelector('meta')).toBeTruthy()
    })

    expect(document.head).toMatchSnapshot()
    expect(document.head.children.length).toEqual(13)
  })
})
