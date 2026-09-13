import Content from './Content.component'


describe('[Content] component', () => {
  it('should render component', () => {
    const container = render(<Content />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
