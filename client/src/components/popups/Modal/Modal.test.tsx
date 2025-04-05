// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Modal from './Modal.component'

describe('[Modal] component', () => {
  it('should render component', () => {
    const container = render(<Modal />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
