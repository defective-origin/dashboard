import Markup from './Markup.component'


describe('[Markup] component', () => {
  it('should render component', () => {
    const container = render(<Markup />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
