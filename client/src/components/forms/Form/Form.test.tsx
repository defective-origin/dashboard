// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Form from './Form.component'

describe('[Form] component', () => {
  it('should render component', () => {
    const container = render(<Form />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
