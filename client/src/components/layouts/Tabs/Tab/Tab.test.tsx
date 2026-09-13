import Tab from './Tab.component'


describe('[Tab] component', () => {
  it('should render component', () => {
    const container = render(<Tab />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
