// ---| tests |---
import { render } from 'tests'

// ---| self |---
import RadioField from './RadioField.component'

describe('[RadioField] component', () => {
  it('should render component', () => {
    const container = render(<RadioField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
