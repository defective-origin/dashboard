// ---| tests |---
import { render } from 'tests'

// ---| self |---
import TimeField from './TimeField.component'

describe('[TimeField] component', () => {
  it('should render component', () => {
    const container = render(<TimeField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
