import Dropdown from './Dropdown.component'


describe('[Dropdown] component', () => {
  it('should render component', () => {
    const container = render(<Dropdown />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
