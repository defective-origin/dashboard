import Tag from './Tag.component'


describe('[Tag] component', () => {
  it('should render component', () => {
    const container = render(<Tag />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
