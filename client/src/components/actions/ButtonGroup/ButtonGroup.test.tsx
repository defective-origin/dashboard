import ButtonGroup from './ButtonGroup.component'


describe('[ButtonGroup] component', () => {
  it('should render component', () => {
    const container = render(<ButtonGroup />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
