import MenuItem from './MenuItem.component'

describe('[MenuItem] component', () => {
  it('should render component', () => {
    const container = render(<MenuItem />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
