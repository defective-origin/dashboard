import Item from './Item.component'


describe('[Item] component', () => {
  it('should render component', () => {
    const container = render(<Item />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
