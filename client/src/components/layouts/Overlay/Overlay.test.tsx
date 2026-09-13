import Overlay from './Overlay.component'


describe('[Overlay] component', () => {
  it('should render component', () => {
    const container = render(<Overlay />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
