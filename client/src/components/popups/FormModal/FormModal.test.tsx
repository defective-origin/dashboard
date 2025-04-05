// ---| tests |---
import { render } from 'tests'

// ---| self |---
import FormModal from './FormModal.component'

describe('[FormModal] component', () => {
  it('should render component', () => {
    const container = render(<FormModal />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
