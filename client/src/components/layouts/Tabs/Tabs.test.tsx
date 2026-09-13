import Tabs from './Tabs.component'


describe('[Tabs] component', () => {
  it('should render component', () => {
    const container = render(<Tabs />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
