import AppLink from './AppLink.component'


describe('[AppLink] component', () => {
  it('should render component', () => {
    const container = render(<AppLink to='ROOT' />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
