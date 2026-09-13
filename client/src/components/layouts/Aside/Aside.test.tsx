import Aside from './Aside.component'


describe('[Aside] component', () => {
  it('should render component', () => {
    const container = render(<Aside />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
