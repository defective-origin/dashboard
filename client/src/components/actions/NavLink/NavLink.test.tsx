import NavLink from './NavLink.component'


describe('[NavLink] component', () => {
  it('should render component', () => {
    const container = render(<NavLink />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
