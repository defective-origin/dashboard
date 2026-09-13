import Footer from './Footer.component'


describe('[Footer] component', () => {
  it('should render component', () => {
    const container = render(<Footer />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
