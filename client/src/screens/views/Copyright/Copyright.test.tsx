import Copyright from './Copyright.component'


describe('[Copyright] component', () => {
  it('should render component', () => {
    const container = render(<Copyright />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
