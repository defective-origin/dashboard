import Clipboard from './Clipboard.component'


describe('[Clipboard] component', () => {
  it('should render component', () => {
    const container = render(<Clipboard />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
