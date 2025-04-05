// ---| tests |---
import { render } from 'tests'

// ---| self |---
import ModalForm from './ModalForm.component'

describe('[ModalForm] component', () => {
  it('should render component', () => {
    const container = render(<ModalForm />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
