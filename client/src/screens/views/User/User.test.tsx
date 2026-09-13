import User from './User.component'


describe('[User] component', () => {
  it('should render component', () => {
    const container = render(<User />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
