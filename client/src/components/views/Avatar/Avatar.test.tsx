import Avatar from './Avatar.component'


describe('[Avatar] component', () => {
  it('should render component', () => {
    const container = render(<Avatar />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
