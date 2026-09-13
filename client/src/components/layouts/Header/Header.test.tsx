import Header from './Header.component'


describe('[Header] component', () => {
  it('should render component', () => {
    const container = render(<Header />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
