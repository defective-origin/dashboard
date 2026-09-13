import Popup from './Popup.component'


describe('[Popup] component', () => {
  it('should render component', () => {
    const container = render(<Popup />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
