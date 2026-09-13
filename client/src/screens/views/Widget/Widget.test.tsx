import Widget from './Widget.component'


describe('[Widget] component', () => {
  it('should render component', () => {
    const container = render(<Widget />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
