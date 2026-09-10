import Modal from './Modal.component'

describe('[Modal] component', () => {
  it('should render component', () => {
    // copy test from stories
    const container = render(<Modal />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
